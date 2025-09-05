===========================
Renewable Energy Characterization
===========================

.. epigraph::

   "VerveStacks transforms global renewable resource data into spatially-resolved, economically-rational energy system models through conservative land-use adjustments, resource binning, and intelligent shape assignment."

   -- VerveStacks Methodology

Overview
========

VerveStacks implements a comprehensive three-stage renewable energy characterization process that addresses the critical challenges of spatial resource assessment, land-use conflicts, and temporal profile generation. This methodology ensures realistic renewable energy representation in energy system optimization models while maintaining computational efficiency.

**Three-Stage Renewable Characterization Process:**

1. **Land-Use Conflict Resolution**: Conservative LCOE-based overlap adjustment between solar and onshore wind
2. **Resource Binning & Potential Assignment**: Economic ranking and capacity allocation across grid cells  
3. **Shape Assignment**: Temporal profile generation with grid vs. nogrid model differentiation

Stage 1: Land-Use Conflict Resolution
====================================

**The Challenge: Avoiding Double-Counting**

REZoning datasets provide separate suitable area assessments for solar and onshore wind technologies. However, these assessments often overlap significantly, leading to potential double-counting of land resources in energy system models.

LCOE-Based Overlap Adjustment Methodology
-----------------------------------------

VerveStacks implements a sophisticated **LCOE Share Allocation** approach that resolves land-use conflicts while preserving economic rationality:

**Core Algorithm:**

.. code-block:: sql

   -- For each (ISO, grid_cell) pair with both solar and wind potential:
   
   -- 1. Calculate overlap area
   overlap_area = MIN(solar_suitable_area, wind_suitable_area)
   
   -- 2. Determine competing capacities in overlap zone
   IF solar_area <= wind_area THEN
       solar_competing = solar_capacity  -- All solar competes
       wind_competing = (overlap_area / wind_area) * wind_capacity  -- Partial wind
   ELSE
       wind_competing = wind_capacity   -- All wind competes  
       solar_competing = (overlap_area / solar_area) * solar_capacity  -- Partial solar
   
   -- 3. Calculate LCOE-based allocation shares
   lcoe_sum = solar_lcoe + wind_lcoe
   solar_share = wind_lcoe / lcoe_sum  -- Higher wind LCOE = more solar allocation
   wind_share = solar_lcoe / lcoe_sum  -- Higher solar LCOE = more wind allocation
   
   -- 4. Allocate competing resources
   solar_final = solar_competing * solar_share + solar_untouched
   wind_final = wind_competing * wind_share + wind_untouched

**Key Principles:**

- **Economic Rationality**: Cheaper technology (lower LCOE) receives larger share of contested land
- **Conservative Approach**: Reduces total renewable potential to avoid over-optimistic assessments
- **Technology Neutrality**: No arbitrary preferences - purely data-driven allocation
- **Preservation of Non-Overlapping Resources**: Full potential maintained where no conflict exists

**Global Implementation:**

The methodology processes **190+ countries** simultaneously, applying identical logic to each (ISO, grid_cell) pair:

.. csv-table:: **Land-Use Adjustment Impact (Global)**
   :file: ../_static/data/landuse_adjustment_summary.csv
   :widths: 30, 20, 20, 30
   :header-rows: 1
   :align: left
   :class: csv-table

*Note: Typical reductions of 5-15% in total renewable potential ensure conservative, realistic resource assessments.*

Stage 2: Resource Binning & GW Potential Assignment  
==================================================

**Economic Resource Ranking**

After land-use adjustment, VerveStacks creates **economically-ranked resource bins** for each technology:

Resource Selection Methodology
------------------------------

**1. LCOE-Based Ranking**

.. code-block:: python

   # Sort grid cells by economic attractiveness (LCOE ascending)
   solar_resources = solar_data.sort_values('LCOE (USD/MWh)')
   wind_resources = wind_data.sort_values('LCOE (USD/MWh)')

**2. Demand-Constrained Selection**

Rather than modeling the entire supply curve, VerveStacks uses **realistic demand constraints**:

.. code-block:: python

   # Select resources up to target generation level
   target_generation_gwh = get_annual_demand_from_ember(iso_code)
   
   cumulative_generation = resources['generation_potential_gwh'].cumsum()
   selected_resources = resources[cumulative_generation <= target_generation_gwh]

**3. Capacity Factor Weighting**

For spatial distribution within selected resources:

.. code-block:: python

   # Combined weight: 70% capacity factor, 30% resource potential  
   cf_normalized = df['Capacity Factor'] / df['Capacity Factor'].max()
   potential_normalized = df['Installed Capacity Potential (MW)'] / df['Installed Capacity Potential (MW)'].max()
   
   weight = 0.7 * cf_normalized + 0.3 * potential_normalized

**Resource Binning Strategy:**

- **15-30 LCOE-capacity factor categories** per technology
- **Cost-performance classes** enable realistic technology competition
- **Balanced relevant resource approach** prevents technology monopolization
- **Conservative potentials** with 40% (solar) and 30% (wind) reductions for land-use constraints

Stage 3: Shape Assignment - Grid vs. NoGrid Models
==================================================

VerveStacks implements **fundamentally different approaches** for temporal profile generation based on model architecture:

NoGrid Models: ISO-Level Aggregation
------------------------------------

**Single National Commodity Approach:**

For single-region models, VerveStacks creates unified national renewable profiles:

**Methodology:**

1. **Demand-Constrained Cell Selection**:
   
   .. code-block:: python
   
      # Select grid cells to meet base year generation (2022 EMBER data)
      total_generation_2022 = get_ember_generation(iso_code, year=2022)
      
      # Assume entire generation from solar OR wind (for shape calculation)
      selected_cells = select_cells_for_generation(
          target_generation=total_generation_2022,
          technology='solar'  # or 'wind'
      )

2. **Weighted Average Shape Calculation**:
   
   .. code-block:: python
   
      # Weight by generation potential in selected cells
      weights = capacity_gw * cf_atlite * 8760  # Annual generation as weight
      
      iso_shape = weighted_average(
          hourly_profiles=atlite_data[selected_cells],
          weights=weights
      )

3. **Normalization**:
   
   .. code-block:: python
   
      # Ensure hourly fractions sum to 1.0 annually
      com_fr_solar = hourly_cf / hourly_cf.sum()
      com_fr_wind = hourly_cf / hourly_cf.sum()

**Output**: Single commodity per technology (e.g., `elc_spv-USA`, `elc_win-USA`)

Grid Models: Spatial Resolution Preservation
--------------------------------------------

**Multi-Zone Spatial Modeling:**

Grid models maintain **50×50km spatial resolution** with individual profiles per renewable energy zone:

**Methodology:**

1. **Grid Cell Preservation**:
   
   .. code-block:: python
   
      # Each grid cell becomes individual commodity
      for grid_cell in selected_rez_zones:
          commodity = f"elc_spv-{iso_code}_{grid_cell:04d}"
          process = f"solar_resource_cell_{grid_cell}"

2. **Bus-Level Aggregation**:
   
   .. code-block:: python
   
      # Map grid cells to transmission buses via Voronoi clustering
      df_rez_grid_to_bus = load_zone_bus_mapping(iso_code)
      
      # Aggregate renewable potential to bus level
      bus_solar_potential = aggregate_by_bus(
          grid_cell_data=solar_rez_data,
          mapping=df_rez_grid_to_bus
      )

3. **Individual Temporal Profiles**:
   
   .. code-block:: python
   
      # Preserve individual grid cell weather patterns
      for grid_cell in rez_zones:
          hourly_profile = atlite_data[grid_cell]['hourly_cf']
          normalized_profile = hourly_profile / hourly_profile.sum()

**Output**: Multiple commodities per technology (e.g., `elc_spv-USA_0001`, `elc_spv-USA_0002`, ...)

**Grid vs. NoGrid Comparison:**

.. list-table:: **Model Architecture Differences**
   :widths: 25 35 40
   :header-rows: 1
   :class: longtable
   :align: left

   * - **Aspect**
     - **NoGrid Models**
     - **Grid Models**
   * - **Spatial Resolution**
     - Single national zone
     - 50×50km grid cells (4-400+ zones)
   * - **Renewable Commodities**
     - One per technology (`elc_spv-ISO`)
     - Multiple per technology (`elc_spv-ISO_####`)
   * - **Temporal Profiles**
     - Weighted national average
     - Individual grid cell profiles
   * - **Transmission Modeling**
     - Not applicable
     - Explicit network constraints
   * - **Use Cases**
     - Policy analysis, scenario studies
     - Grid integration, network planning
   * - **Computational Complexity**
     - Low (single zone)
     - High (multi-zone with transmission)
   * - **Profile Calculation**
     - Demand-constrained cell selection
     - All viable cells preserved
   * - **Economic Dispatch**
     - Technology-level competition
     - Location-specific optimization

Data Sources and Integration
===========================

**Primary Data Sources:**

.. list-table:: **Renewable Characterization Data Sources**
   :widths: 30 70
   :header-rows: 1
   :class: longtable
   :align: left

   * - **Data Source**
     - **Content & Application**
   * - **REZoning Database**
     - 50×50km grid cell renewable potential (LCOE, capacity factor, suitable area) for 190+ countries
   * - **Atlite Weather Data**
     - Hourly capacity factors (8760 hours) for solar PV and wind technologies by grid cell
   * - **EMBER Statistics**
     - Base year (2022) renewable generation for demand-constrained resource selection
   * - **Global Energy Monitor (GEM)**
     - Existing renewable plant locations for spatial validation and gap-filling
   * - **OpenStreetMap (OSM)**
     - Transmission network data for grid model bus-zone mapping

**Data Processing Pipeline:**

1. **Global Land-Use Adjustment**: `rezoning_landuse_processor.py`
2. **ISO-Level Shape Generation**: `atlite_data_integration.py`  
3. **Resource Binning**: `spatial_utils.py` - `calculate_rez_weights()`
4. **Grid Model Integration**: `grid_modeling.py` - `compile_solar_wind_data_grid()`
5. **Temporal Profile Processing**: `time_slice_processor.py`

Quality Assurance and Validation
================================

**Validation Framework:**

.. list-table:: **Renewable Characterization Quality Controls**
   :widths: 30 70
   :header-rows: 1
   :class: longtable
   :align: left

   * - **Validation Level**
     - **Quality Control Process**
   * - **Data Consistency**
     - Cross-validation between REZoning, Atlite, and EMBER datasets for coverage and alignment
   * - **Physical Constraints**
     - Capacity factors bounded (0-100%), annual normalization verified (±0.001 tolerance)
   * - **Economic Rationality**
     - LCOE-based ranking validated against real-world deployment patterns
   * - **Spatial Integrity**
     - Grid cell assignments verified against transmission network topology
   * - **Temporal Accuracy**
     - Seasonal patterns validated (summer solar peaks, winter wind maxima)

**Conservative Assumptions:**

- **Land-Use Reductions**: 40% (solar) and 30% (wind) for realistic land availability
- **Overlap Adjustments**: 5-15% typical reduction in total renewable potential
- **Resource Selection**: Demand-constrained rather than full supply curve modeling
- **Technology Competition**: Balanced approach prevents unrealistic monopolization

Innovation Highlights
====================

**Key Methodological Innovations:**

1. **LCOE-Based Land-Use Conflict Resolution**: First implementation of economic rationality in spatial resource allocation
2. **Dual-Architecture Shape Assignment**: Seamless switching between national and grid-aware modeling
3. **Demand-Constrained Resource Selection**: Realistic alternative to full supply curve evaluation
4. **Conservative Potential Assessment**: Addresses over-optimistic renewable resource estimates
5. **Integrated Temporal-Spatial Processing**: Unified pipeline from global data to model-ready profiles

**Impact on Energy System Modeling:**

- **Realistic Resource Assessment**: Conservative potentials improve model credibility
- **Economic Dispatch Accuracy**: LCOE-based allocation reflects real-world deployment
- **Grid Integration Analysis**: High-resolution spatial modeling enables transmission planning
- **Computational Efficiency**: Demand-constrained selection reduces model complexity
- **Technology Neutrality**: Data-driven approach eliminates modeling bias

This comprehensive renewable characterization methodology ensures that VerveStacks energy system models accurately represent the spatial, temporal, and economic dimensions of renewable energy resources while maintaining computational tractability for policy analysis and energy system planning.

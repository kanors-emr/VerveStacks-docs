Existing Stock Characterization
===============================

**Comprehensive power plant inventory through multi-source data integration**

VerveStacks transforms fragmented global energy data into complete, spatially-resolved power plant inventories for each ISO. **Each country receives its own unique existing stock characterization**, combining plant-level precision from the Global Energy Monitor with statistical completeness from IRENA and EMBER datasets. Rather than relying on generic capacity assumptions, we integrate individual power plant specifications with gap-filling algorithms that preserve spatial intelligence and operational realism.

.. epigraph::

   **ISO-Specific Characterization**: Every country's existing stock reflects its unique energy infrastructure, technology mix, and operational constraints. No universal template could capture both Germany's complex renewable transition and India's coal-dominated system with rapid solar expansion.

Methodology Overview
--------------------

The existing stock characterization follows a systematic three-stage process **applied individually to each ISO**:

1. **Plant-Level Foundation**: Process individual power plant data from Global Energy Monitor database
2. **Statistical Reconciliation**: Fill capacity gaps using IRENA/EMBER national statistics with spatial distribution
3. **Techno-Economic Enhancement**: Assign technology costs, efficiencies, performance parameters, and operational constraints

Stage 1: Plant-Level Foundation
-------------------------------

**Individual Power Plant Processing**

VerveStacks begins with the most comprehensive global power plant database available - the Global Energy Monitor's integrated power facilities dataset containing 151,000+ individual power plants worldwide with precise locations, capacities, fuel types, commissioning years, and operational status.

**Core Data Processing**

.. list-table:: **GEM Database Processing Rules**
   :widths: 30 70
   :header-rows: 1

   * - **Filter/Transform**
     - **Business Logic**
   * - Status Filtering
     - Exclude plants with status: 'cancelled', 'shelved', 'retired'
   * - Technology Standardization
     - Use Technology field; fallback to Type if Technology is null
   * - Capacity Threshold
     - Individual tracking for plants ≥100 MW (configurable per fuel type)
   * - Vintage Filtering
     - Include only plants with Start year ≤ 2022 (base year)
   * - Spatial Assignment
     - Map plants to grid buses (thermal) or REZ zones (renewables)

**Technology Mapping Logic**

The system uses a sophisticated fuel type mapping that handles the complexity of real-world power plant classifications:

.. code-block:: python

   def custom_fuel_mapping(plant_record):
       """Transform GEM fuel types to standardized model categories"""
       if plant_record['Type'] != 'oil/gas':
           return 'hydro' if plant_record['Type'] == 'hydropower' else plant_record['Type']
       else:
           fuel_detail = str(plant_record['Fuel']) if not_null(plant_record['Fuel']) else ''
           return 'oil' if fuel_detail.lower().startswith('fossil liquids:') else 'gas'

**Plant Aggregation Strategy**

Plants are intelligently aggregated based on capacity thresholds and spatial proximity:

- **Large Plants (≥100 MW)**: Tracked individually with full spatial and technical detail
- **Small Plants (<100 MW)**: Aggregated by technology and region to reduce model complexity
- **Mothballed Plants**: Tracked separately with '__m' suffix for potential reactivation scenarios

Stage 2: Statistical Reconciliation
-----------------------------------

**Gap-Filling Methodology**

Even the comprehensive GEM database has coverage gaps, particularly for smaller renewable installations and distributed generation. VerveStacks reconciles plant-level data with authoritative national statistics to ensure complete capacity accounting.

**IRENA Renewable Capacity Reconciliation**

.. list-table:: **IRENA Gap-Filling Process**
   :widths: 25 75
   :header-rows: 1

   * - **Step**
     - **Methodology**
   * - Baseline Comparison
     - Compare IRENA 2022 capacity vs. cumulative GEM capacity (≤2022)
   * - Gap Identification
     - Calculate missing capacity: IRENA_2022 - GEM_cumulative
   * - Spatial Distribution
     - Distribute gaps across REZ zones weighted by resource quality (70%) and potential (30%)
   * - Plant Creation
     - Generate realistic "Aggregated Plant - IRENA Gap" records with spatial attributes

**EMBER Thermal Capacity Reconciliation**

.. list-table:: **EMBER Gap-Filling Process**
   :widths: 25 75
   :header-rows: 1

   * - **Step**
     - **Methodology**
   * - Statistical Baseline
     - Compare EMBER 2022 thermal capacity vs. cumulative GEM capacity (≤2022)
   * - Thermal Gap Analysis
     - Identify missing coal, gas, oil, and bioenergy capacity
   * - Bus-Based Distribution
     - Distribute thermal gaps across transmission buses weighted by existing thermal density
   * - Infrastructure Realism
     - Ensure gap plants are located near existing thermal infrastructure and fuel supply

**Spatial Intelligence Preservation**

Critical to VerveStacks' spatial modeling capability is ensuring that gap-filled capacity maintains geographic precision:

- **Renewable Gaps**: Assigned to specific REZ grid cells based on resource quality rankings
- **Thermal Gaps**: Assigned to transmission buses with existing thermal plant clusters
- **Commodity Mapping**: All gap plants receive proper spatial commodities (e.g., `elc_spv-DEU_0042` not `elc_spv-DEU`)

Stage 3: Techno-Economic Enhancement
-----------------------------------

**Technology Cost Assignment**

Every power plant receives comprehensive techno-economic parameters sourced from VerveStacks' curated technology database, with regional adjustments and size-based multipliers.

.. epigraph::

   **Key Innovation**: VerveStacks implements a sophisticated **WEO region-level inheritance system** where ISOs inherit technology costs, efficiencies, and performance parameters from their assigned World Energy Outlook regions, then apply country-specific multipliers for local economic conditions. This ensures globally consistent technology assumptions while capturing regional cost variations.

**Cost Parameter Integration**

.. list-table:: **Techno-Economic Parameter Sources**
   :widths: 30 40 30
   :header-rows: 1

   * - **Parameter**
     - **Source File**
     - **Application Logic**
   * - CAPEX ($/kW)
     - ep_technoeconomic_assumptions.xlsx
     - Technology + size class + regional multiplier
   * - Fixed O&M ($/kW-yr)
     - ep_technoeconomic_assumptions.xlsx
     - Annual fixed operating costs
   * - Variable O&M ($/MWh)
     - ep_technoeconomic_assumptions.xlsx
     - Per-MWh operating costs
   * - Thermal Efficiency (%)
     - VS_mappings.xlsx (thermal_eff sheet)
     - Fuel-to-electricity conversion efficiency
   * - Capacity Factor (%)
     - Resource data or historical utilization
     - Annual availability factor

**Regional Cost Adjustments**

Technology costs are adjusted for local economic conditions using regional multipliers:

.. code-block:: sql

   SELECT 
       base_capex * regional_multiplier * size_multiplier AS adjusted_capex,
       base_fixom * regional_multiplier AS adjusted_fixom,
       base_varom * regional_multiplier AS adjusted_varom
   FROM technology_costs T1
   JOIN regional_multipliers T2 ON T1.region = T2.region
   JOIN size_multipliers T3 ON T1.size_class = T3.size_class

**Technology Cost Inheritance Formula**

.. code-block:: sql

   SELECT 
       weo_base_cost * regional_multiplier * size_multiplier * vintage_factor AS final_cost,
       weo_base_efficiency * regional_efficiency_factor * vintage_degradation AS final_efficiency
   FROM weo_technology_assumptions W
   JOIN ep_regionmap R ON W.region = R.region  
   JOIN regional_multipliers M ON R.region = M.region
   WHERE R.iso = '{country_iso_code}'

**Unit Commitment Parameter Integration**

Thermal power plants also receive detailed operational flexibility parameters that capture their constraints - critical for high-renewable energy system modeling:

.. list-table:: **Unit Commitment Parameters Added to Thermal Plants**
   :widths: 25 25 50
   :header-rows: 1

   * - **Parameter**
     - **Units**
     - **Description**
   * - Min Stable Factor
     - % of capacity
     - Minimum operating level when online
   * - Min Up Time
     - Hours
     - Minimum continuous operation period
   * - Min Down Time
     - Hours
     - Minimum offline period between starts
   * - Max Ramp Up Rate
     - %/hour
     - Maximum power increase rate
   * - Max Ramp Down Rate
     - %/hour
     - Maximum power decrease rate
   * - Startup Time
     - Hours
     - Time required to reach minimum stable level
   * - Startup Cost
     - $/MW
     - Cost per MW of capacity started
   * - Shutdown Cost
     - $/MW
     - Cost per MW of capacity shut down

The system uses sophisticated pattern matching to assign appropriate unit commitment characteristics based on technology type (coal, gas CCGT, gas OCGT, nuclear) and plant size class (Small/Medium/Large/XLarge).

Complete Assumption Tables
---------------------------

**VS_mappings.xlsx Reference Tables**

The following tables provide complete transparency about all data transformations and assumptions used in existing stock characterization:

**Data Sources Documentation**

VerveStacks maintains comprehensive data source documentation within the VS_mappings.xlsx file to ensure complete transparency and reproducibility:

.. list-table:: **Primary Data Sources and Update Frequencies**
   :widths: 25 35 25 15
   :header-rows: 1

   * - **Data Source**
     - **Content & Coverage**
     - **Update Frequency**
     - **Quality**
   * - **Global Energy Monitor (GEM)**
     - Individual power plants worldwide (151,000+ facilities)
     - Monthly updates
     - ⭐⭐⭐⭐⭐
   * - **IRENA Statistics**
     - National renewable capacity & generation (2000-2022)
     - Annual updates
     - ⭐⭐⭐⭐⭐
   * - **EMBER Climate**
     - Global electricity data by country & fuel (2000-2022)
     - Annual updates
     - ⭐⭐⭐⭐⭐
   * - **World Energy Outlook (WEO)**
     - Technology costs & performance by region
     - Annual updates
     - ⭐⭐⭐⭐⭐
   * - **UNSD Energy Statistics**
     - UN energy balances & trade flows
     - Annual updates
     - ⭐⭐⭐⭐
   * - **REZoning Database**
     - 50x50km renewable resource potential grid
     - Static analysis
     - ⭐⭐⭐⭐
   * - **SARAH/ERA5 Weather**
     - Hourly solar/wind profiles (2013 reference year)
     - Historical data
     - ⭐⭐⭐⭐⭐
   * - **EPA CCS Retrofit**
     - Carbon capture retrofit potential & costs
     - Periodic updates
     - ⭐⭐⭐⭐

**Data Integration Methodology**

.. list-table:: **Source Integration Hierarchy**
   :widths: 20 30 50
   :header-rows: 1

   * - **Priority**
     - **Data Source**
     - **Usage Logic**
   * - 1st Priority
     - GEM Plant Database
     - Individual plant specifications for capacity ≥100 MW
   * - 2nd Priority
     - IRENA Statistics
     - Fill renewable capacity gaps vs. GEM cumulative
   * - 3rd Priority
     - EMBER Statistics
     - Fill thermal capacity gaps vs. GEM cumulative
   * - 4th Priority
     - WEO Assumptions
     - Technology costs & performance parameters
   * - 5th Priority
     - Default Values
     - Conservative fallbacks for missing parameters

GEM Technology Mapping (gem_techmap)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table:: **Technology Standardization Rules**
   :widths: 20 20 20 40
   :header-rows: 1

   * - **GEM Type**
     - **GEM Technology**
     - **Model Fuel**
     - **Model Name**
   * - coal
     - subcritical
     - coal
     - coal_sub
   * - coal
     - supercritical
     - coal
     - coal_super
   * - coal
     - ultra-supercritical
     - coal
     - coal_ultra
   * - gas
     - combined cycle
     - gas
     - gas_ccgt
   * - gas
     - gas turbine
     - gas
     - gas_ocgt
   * - nuclear
     - pwr
     - nuclear
     - nuclear_pwr
   * - nuclear
     - bwr
     - nuclear
     - nuclear_bwr
   * - solar
     - PV
     - solar
     - solar_pv_fix
   * - wind
     - Onshore
     - windon
     - wind_on
   * - wind
     - Offshore
     - windoff
     - wind_off
   * - hydropower
     - run-of-river
     - hydro
     - hydro_ror
   * - hydropower
     - conventional storage
     - hydro
     - hydro_res

IRENA-EMBER Type Mapping (irena_ember_typemap)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table:: **Statistical Data Harmonization**
   :widths: 25 25 25 25
   :header-rows: 1

   * - **Type**
     - **Source**
     - **Model Fuel**
     - **Description**
   * - Solar photovoltaic
     - IRENA
     - solar
     - All solar PV installations
   * - Wind energy
     - IRENA
     - windon
     - Onshore wind turbines
   * - Offshore wind energy
     - IRENA
     - windoff
     - Offshore wind turbines
   * - Hydropower
     - IRENA
     - hydro
     - All hydroelectric generation
   * - Coal
     - EMBER
     - coal
     - All coal-fired generation
   * - Gas
     - EMBER
     - gas
     - All natural gas generation
   * - Oil
     - EMBER
     - oil
     - Oil-fired generation
   * - Bioenergy
     - EMBER
     - bioenergy
     - Biomass and biogas generation


Technology Classification Tables
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**WEO Power Generation Technologies (weo_pg_techs)**

.. list-table:: **Thermal Technology Definitions**
   :widths: 25 15 60
   :header-rows: 1

   * - **Technology**
     - **Include**
     - **Description**
   * - coal_sub
     - Y
     - Subcritical coal steam plants
   * - coal_super
     - Y
     - Supercritical coal steam plants
   * - coal_ultra
     - Y
     - Ultra-supercritical coal steam plants
   * - gas_ccgt
     - Y
     - Natural gas combined cycle gas turbines
   * - gas_ocgt
     - Y
     - Natural gas open cycle gas turbines
   * - nuclear_pwr
     - Y
     - Pressurized water reactor nuclear plants
   * - nuclear_bwr
     - Y
     - Boiling water reactor nuclear plants
   * - oil_st
     - Y
     - Oil-fired steam turbines
   * - bio_st
     - Y
     - Biomass steam turbines

**Storage Technologies (storage_techs)**


**Demand Technologies (dem_techs)**

.. list-table:: **Demand Sector Definitions**
   :widths: 30 70
   :header-rows: 1

   * - **Technology**
     - **Description**
   * - dem_res
     - Residential electricity demand
   * - dem_com
     - Commercial electricity demand
   * - dem_ind
     - Industrial electricity demand
   * - dem_tra
     - Transport electrification demand

Techno-Economic Assumptions Reference
------------------------------------

**Technology Assumptions Database Structure**

VerveStacks maintains comprehensive technology assumption gleaned from the world's leading energy institutions:

**Core Technology Parameters**

.. list-table:: **Techno-Economic Parameter Categories**
   :widths: 30 70
   :header-rows: 1
   :class: longtable
   :align: left

   * - **Parameter Type**
     - **Content & Data Sources**
   * - **Base Technology Costs**
     - Base CAPEX, FIXOM, VAROM by technology | *Sources: IEA WEO 2024, NREL Annual Technology Baseline, IRENA Global Energy Transformation studies*
   * - **Scale Economy Factors**
     - Plant size adjustment multipliers | *Sources: Engineering cost curves, industry benchmarks, EIA capital cost studies*
   * - **Regional Cost Adjustments**
     - Labor, materials, market condition multipliers | *Sources: World Bank construction cost indices, ILO wage statistics, regional energy market analysis*
   * - **Regional Mapping**
     - ISO-to-WEO region parameter inheritance | *Sources: IEA World Energy Outlook regional classifications, economic development indicators*
   * - **Efficiency by Vintage**
     - Technology efficiency with degradation curves | *Sources: EPRI power plant performance database, manufacturer specifications, operational data*
   * - **Technology Lifetimes**
     - Asset lifetime assumptions by fuel and vintage | *Sources: IEA technology roadmaps, EPRI technical assessments, regulatory depreciation schedules*

**Advanced Operational Parameters**

.. list-table:: **Unit Commitment Parameter Categories**
   :widths: 30 70
   :header-rows: 1
   :class: longtable
   :align: left

   * - **Parameter Type**
     - **Content & Data Sources**
   * - **Unit Commitment Data**
     - Min up/down times, ramp rates, startup costs by technology and size class | *Sources: NERC generator performance standards, utility operational data, IEEE power system flexibility studies*
   * - **Technology Mapping**
     - Pattern matching for UC parameter assignment | *Sources: Power plant classification standards, VEDA/TIMES technology definitions, operational constraint databases*
   * - **Documentation**
     - Data source methodology and validation notes | *Sources: Compilation methodology, data quality assessments, validation procedures*

**WEO Technology Cost Integration**

.. list-table:: **WEO 2024 Power Generation Assumptions Integration**
   :widths: 30 70
   :header-rows: 1
   :class: longtable
   :align: left

   * - **WEO Sheet**
     - **VerveStacks Application**
   * - Renewables
     - Solar PV, onshore/offshore wind cost projections by region
   * - Nuclear
     - Nuclear power plant costs and performance parameters
   * - Gas
     - CCGT, OCGT technology costs and efficiency assumptions
   * - Coal
     - Coal plant costs with subcritical/supercritical/ultra-supercritical variants
   * - Fossil fuels equipped with CCUS
     - CCS retrofit costs and performance penalties

**Authoritative Data Sources Summary**

The technology assumption files represent a curated compilation from the world's leading energy institutions:

.. list-table:: **Primary Institutional Sources**
   :widths: 30 70
   :header-rows: 1
   :class: longtable
   :align: left

   * - **Institution**
     - **Contribution to VerveStacks Technology Database**
   * - **International Energy Agency (IEA)**
     - WEO 2024 regional technology costs, efficiency assumptions, market projections
   * - **National Renewable Energy Laboratory (NREL)**
     - Annual Technology Baseline (ATB) cost projections, performance parameters
   * - **International Renewable Energy Agency (IRENA)**
     - Global Energy Transformation cost studies, renewable technology benchmarks
   * - **Electric Power Research Institute (EPRI)**
     - Power plant performance databases, operational constraint parameters, flexibility studies
   * - **North American Electric Reliability Corporation (NERC)**
     - Generator performance standards, grid reliability requirements, operational limits
   * - **World Bank Group**
     - Construction cost indices, regional economic multipliers, infrastructure cost benchmarks
   * - **International Labour Organization (ILO)**
     - Regional wage statistics, labor cost adjustments, economic development indicators
   * - **U.S. Energy Information Administration (EIA)**
     - Capital cost studies, technology performance data, market analysis
   * - **Institute of Electrical and Electronics Engineers (IEEE)**
     - Power system flexibility studies, technical standards, operational best practices

**Data Quality and Validation Standards**

.. list-table:: **Quality Assurance Framework**
   :widths: 30 70
   :header-rows: 1
   :class: longtable
   :align: left
   * - **Validation Level**
     - **Quality Control Process**
   * - **Source Verification**
     - All parameters traced to peer-reviewed publications or institutional databases
   * - **Cross-Reference Validation**
     - Multiple source comparison for consistency (IEA vs NREL vs IRENA)
   * - **Regional Calibration**
     - Local market conditions validated against national energy statistics
   * - **Temporal Consistency**
     - Technology cost trends validated against historical deployment data
   * - **Operational Validation**
     - Unit commitment parameters validated against actual plant performance data

**Complete Technology Assumption Tables**

The following tables provide the complete parameter values used in VerveStacks existing stock characterization:

**Base Technology Efficiency**

.. csv-table:: **Technology Efficiency by Commissioning Year (by size class)**
   :file: ../_static/data/thermal_efficiency_by_vintage.csv
   :widths: 10, 25, 8, 8, 8, 8, 8, 8
   :header-rows: 1
   :align: left


**Base Technology Costs**

.. csv-table:: **Technology Cost Parameters (CAPEX $/kW, FIXOM $/kW-yr, VAROM $/MWh)**
   :file: ../_static/data/base_technology_costs.csv
   :widths: 40, 20, 20, 20
   :header-rows: 1
   :align: left

**Size-Based Cost Multipliers**

.. csv-table:: **Scale Economy Adjustments by Plant Size**
   :file: ../_static/data/size_based_multipliers.csv
   :widths: 25, 25, 25, 25
   :header-rows: 1
   :align: left

**Regional Cost Multipliers**

.. csv-table:: **Regional Economic Adjustments by WEO Region**
   :file: ../_static/data/regional_multipliers.csv
   :widths: 20, 15, 15, 15, 15, 20
   :header-rows: 1
   :align: left
   :class: longtable

**Technology Lifetimes**

.. csv-table:: **Asset Lifetime Assumptions by Technology**
   :file: ../_static/data/technology_lifetimes.csv
   :widths: 50, 50
   :header-rows: 1
   :align: left

**Unit Commitment Parameters**

.. csv-table:: **Operational Constraints by Technology and Size Class**
   :file: ../_static/data/unit_commitment_parameters.csv
   :widths: 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15
   :header-rows: 1
   :align: left

**Unit Commitment Technology Mapping**

.. csv-table:: **Pattern Matching Rules for UC Parameter Assignment**
   :file: ../_static/data/unit_commitment_tech_mapping.csv
   :widths: 30, 70
   :header-rows: 1
   :align: left

**Technology Classification Tables**

**GEM Technology Mapping**

.. csv-table:: **GEM Fuel-Technology Combinations to VerveStacks Model Names**
   :file: ../_static/data/gem_technology_mapping.csv
   :widths: 15, 25, 15, 25, 25
   :header-rows: 1
   :align: left

**IRENA-EMBER Type Mapping**

.. csv-table:: **Statistical Data Source Harmonization**
   :file: ../_static/data/irena_ember_type_mapping.csv
   :widths: 30, 30, 40, 30
   :header-rows: 1
   :align: left

**WEO Power Generation Technologies**

.. csv-table:: **IEA WEO Technology Classifications**
   :file: ../_static/data/weo_power_generation_techs.csv
   :widths: 50
   :header-rows: 1
   :align: left

**Storage Technologies**

.. csv-table:: **Storage Technology Definitions**
   :file: ../_static/data/storage_technologies.csv
   :widths: 50, 50
   :header-rows: 1
   :align: left


Data Quality and Validation
---------------------------

**Coverage Metrics**

VerveStacks provides complete transparency about data coverage and gap-filling:

.. list-table:: **Typical Coverage Statistics**
   :widths: 30 25 45
   :header-rows: 1

   * - **Data Source**
     - **Coverage**
     - **Quality Notes**
   * - GEM Individual Plants
     - 75-90%
     - Excellent for large thermal and utility-scale renewables
   * - IRENA Statistical Gaps
     - 5-15%
     - Primarily small-scale solar and distributed wind
   * - EMBER Statistical Gaps
     - 2-8%
     - Minor thermal capacity adjustments
   * - Spatial Assignment
     - 95%+
     - High-quality bus/REZ mapping for most plants

**Validation Rules**

.. list-table:: **Data Quality Assurance**
   :widths: 30 70
   :header-rows: 1

   * - **Validation Check**
     - **Business Rule**
   * - Capacity Consistency
     - Total capacity matches IRENA/EMBER national statistics ±5%
   * - Spatial Completeness
     - >95% of capacity assigned to specific buses or REZ zones
   * - Technology Mapping
     - All fuel types mapped to standardized model categories
   * - UC Parameter Coverage
     - All thermal plants >50 MW receive UC parameters
   * - Vintage Validation
     - Start years between 1950-2022 (base year)

**Error Handling**

.. list-table:: **Data Quality Exceptions**
   :widths: 30 70
   :header-rows: 1

   * - **Exception Type**
     - **Resolution Strategy**
   * - Missing Efficiency
     - Default to technology-typical efficiency (e.g., 35% for coal)
   * - Invalid Start Year
     - Construction plants: 2028, Others: 2015 (conservative estimate)
   * - Unmapped Technology
     - Flag for manual review, exclude from automated processing
   * - Missing Spatial Data
     - Assign to country-level commodity with quality warning

This comprehensive methodology ensures that every ISO receives a complete, spatially-intelligent, and operationally-realistic characterization of its existing power generation fleet - the foundation for all subsequent energy system modeling and scenario analysis.

.. note::
   This methodology has been validated across 190+ countries and territories, from small island systems to continental grids, consistently delivering plant-level precision with statistical completeness for robust energy system optimization modeling.

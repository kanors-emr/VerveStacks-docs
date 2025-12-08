====================
Grid Representation
====================

**PyPSA-inspired transmission network modeling with intelligent spatial clustering**

VerveStacks creates realistic transmission network representations by extracting and processing OpenStreetMap (OSM) infrastructure data, applying intelligent clustering algorithms, and integrating renewable energy zones with transmission connectivity. This approach generates PyPSA-compatible network models that balance geographic realism with computational tractability.

Grid Modeling Philosophy
========================

VerveStacks transforms raw transmission infrastructure data into aggregated/filtered network representations suitable for energy system optimization. Rather than using simplified radial networks or generic templates, the platform processes actual transmission line and substation data to create country-specific grid models that reflect real-world topology and constraints.

**Core Principles:**

- **Geographic Realism**: Networks based on actual transmission infrastructure locations
- **Computational Efficiency**: Intelligent clustering reduces model complexity while preserving essential connectivity
- **Technology Integration**: Seamless connection of renewable energy zones to transmission buses
- **Scalable Complexity**: Adaptive clustering based on country size and infrastructure density

Data Foundation
===============

OSM Infrastructure Data
-----------------------

The grid modeling process begins with comprehensive OpenStreetMap data extraction:

**Transmission Buses (Substations):**
- High-voltage substations and switching stations
- Coordinate validation and country assignment
- Voltage level classification and filtering
- Capacity and operational status where available

**Transmission Lines:**
- High-voltage transmission corridors
- Geographic routing and distance calculation
- Voltage level and capacity specifications
- Cross-border interconnection identification

**Data Quality Assurance:**
- Coordinate bounds validation by country
- Missing data identification and logging
- Cross-dataset capacity reconciliation
- Geographic consistency verification

Multi-Resolution Clustering Framework
=====================================

VerveStacks employs a sophisticated multi-resolution approach to create transmission networks that balance detail with computational efficiency.

Bus Clustering Methodology
---------------------------

**DBSCAN Spatial Clustering:**
- **Algorithm**: Density-Based Spatial Clustering of Applications with Noise
- **Purpose**: Reduce bus count while preserving network topology
- **Parameters**: Configurable clustering distance (typically 10-50 km)
- **Advantage**: Handles irregular geographic distributions and identifies isolated nodes

**Clustering Process:**
1. **Coordinate Projection**: Transform to appropriate distance-based coordinate system (EPSG:3035)
2. **Density Analysis**: Identify bus clusters based on spatial proximity
3. **Centroid Calculation**: Compute representative locations for each cluster
4. **Capacity Aggregation**: Sum transmission capacities within clusters
5. **Connectivity Preservation**: Maintain essential network topology

Load Distribution Algorithms
-----------------------------

VerveStacks implements two complementary approaches for distributing electricity demand across transmission buses:

**Voronoi Tessellation Method:**
- **Principle**: Each bus serves the geographically closest demand centers
- **Implementation**: Voronoi cells define exclusive service territories
- **Population Weighting**: Cities influence load distribution based on population
- **Threshold**: Minimum population of 1,000,000 for major demand centers
- **Advantage**: Guarantees non-overlapping service areas

**Distance-Weighted Assignment:**
- **Principle**: Cities influence multiple buses based on inverse distance weighting
- **Decay Function**: Influence decreases with distance² (configurable exponent)
- **Maximum Range**: 100 km influence radius (configurable)
- **Population Threshold**: Minimum 10,000 population for demand centers
- **Advantage**: More realistic load sharing across nearby transmission nodes

Transmission Line Modeling
===========================

Network Topology Construction
-----------------------------

**Line Geometry Processing:**
- **Source Data**: OSM transmission line geometries or bus endpoint connections
- **Validation**: Coordinate bounds checking and topology verification
- **Simplification**: Straight-line approximations between bus clusters
- **Capacity Estimation**: Distance-based transmission capacity calculations

**Connectivity Matrix:**
- **Bus-to-Bus Connections**: Direct transmission links between clustered buses
- **Cross-Border Lines**: International interconnection modeling
- **Redundancy Analysis**: Multiple parallel line aggregation
- **Islanding Prevention**: Connectivity validation and isolated node identification

Network Transfer Capacity (NTC)
--------------------------------

**Realistic Capacity Estimation:**
- **Geographic Distance**: Line length calculation using great circle distance
- **Voltage-Based Scaling**: Capacity estimation based on voltage levels
- **Parallel Line Aggregation**: Multiple circuits between same bus pairs
- **Thermal Limits**: Conservative capacity assumptions for reliability

**NTC Calculation Methodology:**
- **Base Capacity**: Standard MW/km transmission capacity by voltage level
- **Distance Adjustment**: Linear scaling with transmission line length
- **Reliability Margin**: Conservative derating for operational security
- **Seasonal Variations**: Temperature-dependent capacity adjustments where applicable

Renewable Energy Integration
============================

RE Zone Connectivity
--------------------

**Technology-Specific Cluster Integration:**

VerveStacks implements **separate clustering for each renewable technology**, creating distinct cluster sets that connect independently to the transmission network:

- **Solar PV Clusters**: Independent clustering of solar grid cells with aggregated capacity potential
- **Wind Onshore Clusters**: Separate clustering of onshore wind grid cells with capacity-weighted profiles
- **Wind Offshore Clusters**: Dedicated offshore wind clustering (where applicable) with marine grid connectivity
- **Cluster Composition**: Each cluster represents 10-300 individual 50x50km grid cells with combined MW potential
- **Capacity Aggregation**: Total renewable potential calculated from REZoning data across constituent grid cells

**Transmission Access Analysis:**
- **Distance Calculation**: Shortest path from renewable clusters to transmission buses (≥150kV)
- **Connection Costs**: Distance-based transmission line construction costs per technology cluster
- **Capacity Constraints**: Transmission capacity limits for renewable integration by technology type
- **Grid Code Compliance**: Technical requirements for renewable energy connections

**Cluster-to-Bus Assignment Process:**
1. **Technology Separation**: Solar, wind onshore, and wind offshore processed independently
2. **Spatial Assignment**: Each cluster assigned to nearest transmission bus using great circle distance
3. **Capacity Weighted Profiles**: Hourly capacity factors aggregated using grid cell capacity as weights
4. **Economic Integration**: Distance-based connection costs (M$/GW-km) calculated per cluster
5. **Profile Integration**: Technology-specific hourly generation profiles linked to transmission nodes
6. **Curtailment Modeling**: Transmission-constrained renewable energy dispatch by technology

Technology Connection Methodology
==================================

VerveStacks implements sophisticated algorithms for connecting both existing and new generation technologies to transmission buses, ensuring realistic grid access while maintaining computational efficiency.

Renewable Energy Cluster Integration
------------------------------------

**Technology-Specific Clustering Approach:**

VerveStacks processes renewable energy resources through **independent clustering for each technology**, creating optimized spatial aggregations that preserve resource characteristics while enabling efficient grid integration:

**Cluster Formation Process:**
1. **Grid Cell Processing**: Extract 50x50km renewable energy grid cells from REZoning database
2. **Technology Filtering**: Apply capacity factor thresholds (>5% solar, >8% wind) to exclude low-quality resources
3. **Independent Clustering**: Perform hierarchical clustering separately for solar, wind onshore, and wind offshore
4. **Capacity Aggregation**: Sum installed capacity potential (MW) across grid cells within each cluster
5. **Profile Weighting**: Calculate hourly capacity factors using grid cell capacity as weights
6. **Bus Assignment**: Connect each cluster to nearest transmission bus (≥150kV) using great circle distance

**Cluster Characteristics:**
- **Dynamic Sizing**: 10-300 clusters per technology based on country size (n_clusters = n_cells^0.6)
- **Capacity Basis**: Each cluster capacity derived from REZoning grid cell potential aggregation
- **Profile Generation**: Hourly capacity factors weighted by constituent grid cell capacity (MW)
- **Geographic Representation**: Clusters maintain spatial coherence while optimizing grid connectivity
- **Technology Independence**: Solar and wind clusters formed separately to avoid cross-technology interference

**Grid Integration Outputs:**
- **Technology-Specific Commodities**: Separate VEDA commodities for solar (elc_spv), wind onshore (elc_won), wind offshore (elc_wof)
- **Cluster-Specific Profiles**: Individual hourly capacity factor profiles for each renewable cluster
- **Connection Economics**: Distance-based transmission costs and losses calculated per cluster
- **Transmission Mapping**: Each cluster assigned to specific transmission bus with capacity and profile data

Existing Power Plant Assignment
-------------------------------

**Geographic Proximity Algorithm:**
- **Nearest Bus Assignment**: Each power plant connected to geographically closest transmission bus
- **Haversine Distance Calculation**: Great circle distance using Earth's radius (6,371 km)
- **BallTree Spatial Indexing**: Efficient nearest neighbor search for large plant datasets
- **Coordinate Validation**: Automatic removal of plants with missing geographic coordinates

**Assignment Process:**
1. **Data Preparation**: Clean plant coordinates and bus locations
2. **Spatial Indexing**: Build BallTree with bus coordinates in radians
3. **Distance Calculation**: Query nearest bus for each power plant location
4. **Mapping Creation**: Generate plant-to-bus assignments with distance metrics
5. **Deduplication**: Remove duplicate plants (keeping first occurrence by GEM location ID)

**Quality Metrics:**
- **Average Connection Distance**: Typical 15-50 km depending on grid density
- **Maximum Connection Distance**: Validates reasonable grid access assumptions
- **Bus Voltage Compatibility**: Ensures plant capacity matches bus voltage level

New Technology Integration
--------------------------

**Technology-Specific Renewable Energy Connections:**
- **Cluster-to-Bus Mapping**: Technology-specific renewable clusters assigned to transmission buses
- **Solar Cluster Assignment**: Solar clusters connected to nearest transmission buses with solar-specific profiles
- **Wind Cluster Assignment**: Wind onshore and offshore clusters connected independently with wind-specific profiles
- **Spatial Join Priority**: Clusters within transmission zone boundaries get direct bus assignment
- **Nearest Bus Fallback**: Clusters outside zones connected to closest transmission node (≥150kV)
- **Capacity Aggregation**: Technology-specific renewable potential calculated per bus from assigned clusters
- **Profile Aggregation**: Capacity-weighted hourly profiles generated for each technology at each bus

**Technology-Specific Connection Cost Modeling:**
- **Cluster-Based Costs**: Transmission line construction costs calculated per renewable technology cluster
- **Distance Calculation**: Great circle distance from cluster centroid to assigned transmission bus
- **Technology Independence**: Solar, wind onshore, and wind offshore clusters costed separately
- **Grid Code Compliance**: Technical requirements applied per technology type
- **Capacity Constraints**: Transmission capacity limits assessed for each technology cluster
- **Curtailment Assessment**: Technology-specific transmission-constrained dispatch potential

**Economic Assumptions (Per Technology Cluster):**
- **Connection Cost**: **$1.1 million per MW-km** for high-voltage transmission infrastructure per cluster
- **Transmission Losses**: **0.6% per 100 km** (6% per 1,000 km) following industry standards for AC transmission
- **Cost Formula**: ``ncap_cost = 1.1 × cluster_distance_km`` (M$/GW-km per technology cluster)
- **Efficiency Formula**: ``efficiency = 1 - 0.00006 × cluster_distance_km`` (0.006% loss per km per cluster)
- **Capacity Basis**: Cluster capacity derived from aggregated REZoning grid cell potential (MW)

**Conventional Technology Siting:**
- **New Plant Placement**: Future conventional plants assigned using same nearest-bus algorithm
- **Technology-Specific Constraints**: Coal, gas, nuclear plants consider cooling water access
- **Transmission Adequacy**: Ensure sufficient transmission capacity for planned generation
- **Geographic Realism**: Respect land-use constraints and environmental restrictions

**VEDA Syntax Integration:**
VerveStacks creates "buses to attach" dataframes that specify where new technologies can be deployed:

- **Thermal Buses**: Coal, gas, nuclear plants above capacity thresholds (typically 50-100 MW)
- **Hydro Buses**: Hydro plants above technology-specific thresholds
- **Storage Buses**: All storage technologies above capacity thresholds
- **Demand Buses**: Load centers with non-zero demand allocation

These dataframes use ``~replicateinregions`` VEDA syntax to automatically replicate new technology options at specific transmission buses, enabling geographically-realistic capacity expansion planning.

Multi-Technology Bus Assignment
-------------------------------

**Clustering Integration:**
After bus clustering, all technology assignments are updated to maintain connectivity:

1. **Cluster Mapping**: Original plant-bus assignments mapped to cluster representatives
2. **Capacity Aggregation**: Multiple plants at clustered buses have combined capacity
3. **RE Cluster Integration**: Technology-specific renewable clusters assigned to transmission buses
4. **Profile Integration**: Capacity-weighted hourly generation profiles linked to transmission nodes per technology
5. **Load Balance**: Ensure generation-demand balance at each clustered bus including renewable clusters

**Assignment Validation:**
- **Connectivity Verification**: All technologies reachable through transmission paths
- **Capacity Consistency**: Plant capacity compatible with bus voltage and transmission access
- **Geographic Reasonableness**: Connection distances within realistic ranges
- **Load-Generation Balance**: Regional supply-demand consistency maintained

**Load Flow Considerations:**
- **Generation-Load Balance**: Regional supply-demand matching
- **Transmission Constraints**: Power flow limits and congestion analysis
- **Operational Flexibility**: Ramping rates and minimum generation levels
- **Ancillary Services**: Frequency regulation and voltage support capabilities

Model Output and Validation
============================

PyPSA Network Files
-------------------

**Standardized Format:**
- **Buses DataFrame**: Transmission nodes with coordinates and load assignments
- **Lines DataFrame**: Transmission connections with capacity and impedance
- **Generators DataFrame**: Power plants with technical and economic parameters
- **Loads DataFrame**: Demand time series by transmission bus

**Quality Metrics:**
- **Network Connectivity**: All buses reachable through transmission paths
- **Load-Generation Balance**: Regional supply-demand consistency
- **Transmission Adequacy**: Sufficient capacity for expected power flows
- **Geographic Realism**: Network topology consistent with actual infrastructure

Network Visualization Examples
-------------------------------

VerveStacks generates comprehensive network visualizations that demonstrate the voltage filtering and clustering methodology. These examples show how different grid definitions create models optimized for multi-period optimization with fine timeslices.

**Germany: Voltage Filtering Comparison**

The comparison between EUR and KAN grid definitions for Germany illustrates the voltage filtering approach:

.. figure:: /_static/images/grid/DEU_network_visualization_eur.svg
   :alt: Germany Network - EUR Grid (High Detail)
   :width: 100%
   :align: center

   Germany Transmission Network - EUR Grid Definition (795 buses, 1,029 lines)

.. figure:: /_static/images/grid/DEU_network_visualization_kan.svg
   :alt: Germany Network - KAN Grid (Filtered)
   :width: 100%
   :align: center

   Germany Transmission Network - KAN Grid Definition (481 buses, 671 lines)

The EUR grid captures detailed high-voltage infrastructure, while the KAN grid applies voltage filtering to create a coarser network suitable for responsive multi-period optimization. This filtering achieves a **39% reduction in buses** (795→481) and **35% reduction in lines** (1,029→671), significantly reducing model complexity while preserving essential transmission corridors and connectivity patterns.

**Additional Country Examples**

.. figure:: /_static/images/grid/ITA_network_visualization_kan.svg
   :alt: Italy Network Visualization
   :width: 100%
   :align: center

   Italy Transmission Network - Optimized for Energy System Modeling (265 buses, 365 lines)

.. figure:: /_static/images/grid/JPN_network_visualization_kan.svg
   :alt: Japan Network Visualization
   :width: 100%
   :align: center

   Japan Transmission Network - Island Grid with Inter-Regional Connections (187 buses, 237 lines)

These visualizations demonstrate how VerveStacks adapts the grid modeling approach to different geographic and infrastructure contexts:

- **Italy**: Continental network with strong north-south transmission corridors
- **Japan**: Island nation with distinct regional grids and limited interconnections

**Voltage Filtering Methodology:**

The transition from detailed (EUR) to optimized (KAN) grid representations involves:

- **Low-voltage elimination**: Removal of distribution-level infrastructure
- **Strategic clustering**: Aggregation of nearby substations while preserving topology
- **Capacity preservation**: Maintenance of total transmission capacity through parallel line aggregation
- **Connectivity validation**: Ensuring all regions remain electrically connected

This approach enables VerveStacks models to achieve computational efficiency necessary for fine timeslice resolution (up to 8760 hours) and multi-period investment optimization while maintaining geographic realism in transmission constraints.

Validation Outputs
------------------

**Connectivity Analysis**: Network topology and islanding assessment
**Capacity Utilization**: Transmission line loading and bottlenecks  
**Renewable Integration**: RE zone accessibility and grid connection costs
**Model Statistics**: Bus count, line count, and network complexity metrics

Technical Implementation
========================

Computational Efficiency
-------------------------

**Adaptive Clustering:**
- **Country-Specific Parameters**: Clustering distance based on country size and infrastructure density
- **Complexity Management**: Target bus counts for computational tractability
- **Quality Preservation**: Essential connectivity maintained through clustering process
- **Scalability**: Consistent methodology across countries from Switzerland to China

**Performance Optimization:**
- **Spatial Indexing**: Efficient geographic queries using spatial data structures
- **Parallel Processing**: Multi-threaded clustering and connectivity analysis
- **Memory Management**: Optimized data structures for large-scale networks
- **Caching**: Intermediate results stored for iterative model development

Integration with Energy System Models
=====================================

VEDA Model Integration
----------------------

**Network Parameters:**
- **Transmission Capacities**: NTC values for inter-regional power trade
- **Investment Options**: Transmission expansion possibilities and costs
- **Operational Constraints**: Power flow limits and stability requirements
- **Regional Definitions**: Transmission zones for energy system optimization

**Technology-Specific Renewable Energy Supply:**
- **Solar Cluster Mapping**: Solar PV clusters connected to transmission buses with solar-specific profiles
- **Wind Cluster Mapping**: Wind onshore and offshore clusters connected independently with wind-specific profiles
- **Cluster Capacity**: Each cluster represents aggregated MW potential from 10-300 grid cells (50x50km each)
- **Weighted Profiles**: Hourly capacity factors calculated using grid cell capacity as weights
- **Access Costs**: Grid connection expenses calculated per technology cluster based on distance to transmission
- **Technology Separation**: Independent curtailment analysis for solar, wind onshore, and wind offshore
- **Storage Integration**: Battery and pumped hydro storage siting optimization per renewable technology

Real-World Applications
=======================

Grid Planning Studies
---------------------

**Transmission Expansion:**
- **Bottleneck Identification**: Transmission constraints limiting renewable integration
- **Investment Prioritization**: Cost-effective transmission upgrade strategies
- **Cross-Border Trade**: International interconnection development
- **Grid Modernization**: Smart grid infrastructure deployment

**Renewable Integration Analysis:**
- **Hosting Capacity**: Maximum renewable energy integration by transmission zone
- **Grid Stability**: Voltage and frequency regulation with high VRE penetration
- **Storage Requirements**: Grid-scale energy storage for renewable energy balancing
- **Flexibility Services**: Demand response and sector coupling opportunities

Policy and Market Analysis
---------------------------

**Energy Security:**
- **Supply Diversity**: Geographic distribution of generation resources
- **Import Dependence**: Reliance on cross-border electricity trade
- **Critical Infrastructure**: Transmission system resilience and redundancy
- **Emergency Response**: Grid restoration and blackout prevention

**Market Design:**
- **Nodal Pricing**: Locational marginal pricing and congestion management
- **Transmission Rights**: Financial transmission rights and capacity allocation
- **Grid Services**: Ancillary services markets and system operation
- **Regulatory Framework**: Transmission access and grid code compliance

Conclusion
==========

VerveStacks grid representation methodology transforms complex transmission infrastructure data into practical network models suitable for energy system analysis. By combining geographic realism with computational efficiency, the platform enables sophisticated grid planning and renewable integration studies while maintaining model tractability.

The multi-resolution clustering approach ensures that essential network characteristics are preserved while reducing computational complexity. Integration with renewable energy zones and existing power plants creates comprehensive models that support policy analysis, investment planning, and operational studies across diverse geographic and regulatory contexts.

Through systematic processing of OpenStreetMap data and intelligent spatial clustering, VerveStacks democratizes access to professional-grade transmission network modeling, enabling users worldwide to conduct sophisticated grid analysis without requiring specialized infrastructure modeling expertise.

.. note::
   Grid modeling outputs include interactive network visualizations and comprehensive validation metrics for model verification and quality assurance.

==========================
Fuel Prices & Key Policies
==========================

**Fuel price trajectories and policy assumptions**

VerveStacks incorporates fuel prices and policy constraints from scenario datasets.

Fuel Price Sources
==================

AR6 Scenarios
-------------
- Global fuel price trajectories by scenario
- Regional price adjustments
- Carbon pricing assumptions
- Policy constraint implementation

Historical Calibration
----------------------
- Base year fuel price calibration
- Regional price differentials
- Transportation and distribution costs
- Tax and subsidy adjustments

Policy Implementation
=====================

CO2 Price Scenarios
-------------------

**Carbon pricing trajectories from IPCC AR6 climate scenarios**

VerveStacks incorporates carbon pricing trajectories extracted from IPCC AR6 Working Group III vetted scenarios, providing quantitative foundations for energy system modeling across 5 climate categories, 11 global regions, and the critical 2020-2050 transition period.

Data Source and Methodology
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* **Source**: IPCC AR6 Working Group III Scenarios Database R10 regions v1.1
* **Quality Control**: Chapter 3 vetted scenarios only (peer-reviewed model-scenario combinations)
* **Variable**: ``Price|Carbon`` (economy-wide carbon pricing)
* **Currency**: All values in constant 2015 US Dollars (USD2015) per IPCC AR6 conventions
* **Outlier Treatment**: Conservative IQR-based removal (2.5×IQR threshold) applied surgically by Category-Region-Year groups
* **Coverage**: 385 data points across 5 climate categories and 11 R10 regions

Climate Categories and Price Ranges
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The carbon price trajectories show clear hierarchical ordering reflecting economic effort required for different climate targets:

.. list-table:: 2050 Median CO2 Prices by Climate Category
   :widths: 15 45 20 20
   :header-rows: 1

   * - Category
     - Description
     - Climate Target
     - 2050 Price (USD2015/tCO2)
   * - **C1**
     - Limit warming to 1.5°C (>50%) with no/limited overshoot
     - Most Ambitious
     - $592
   * - **C2**
     - Limit warming to 1.5°C (>67%) with high overshoot
     - High Ambition
     - $289
   * - **C3**
     - Limit warming to 2°C (>67%) with higher action post-2030
     - Moderate-High
     - $210
   * - **C4**
     - Limit warming to 2°C (>50%) with immediate action
     - Moderate
     - $112
   * - **C7**
     - Likely above 3°C warming with limited mitigation
     - Minimal Action
     - $0

Temporal Evolution Patterns
^^^^^^^^^^^^^^^^^^^^^^^^^^^

All ambitious scenarios (C1-C4) show rapid price acceleration post-2025:

.. list-table:: Global Average CO2 Prices by Year (USD2015/tCO2)
   :widths: 15 15 15 15 15 15
   :header-rows: 1

   * - Year
     - C1
     - C2
     - C3
     - C4
     - C7
   * - 2020
     - $3
     - $0
     - $3
     - $1
     - $0
   * - 2025
     - $151
     - $29
     - $40
     - $14
     - $0
   * - 2030
     - $214
     - $51
     - $60
     - $27
     - $0
   * - 2040
     - $362
     - $173
     - $131
     - $75
     - $0
   * - 2050
     - $592
     - $289
     - $210
     - $112
     - $0

**Key Insights**:

* C1 scenarios exhibit the steepest trajectory, increasing 4× from 2025 to 2050
* All categories show exponential growth patterns reflecting increasing marginal abatement costs
* C7 scenarios maintain near-zero pricing throughout, reflecting limited policy intervention

Regional Variation Analysis
^^^^^^^^^^^^^^^^^^^^^^^^^^^

For the most ambitious scenarios (C1), regional median prices in 2050 range from $526-644/tCO2:

**Developed Regions** (highest prices):
  * North America: $644/tCO2
  * Europe: $635/tCO2  
  * Pacific OECD: $604/tCO2

**Emerging Economies** (moderate prices):
  * Africa: $605/tCO2
  * India+: $592/tCO2
  * China+: $582/tCO2

**Other Regions** (lower prices):
  * Latin America, Middle East, Rest of Asia: ~$582/tCO2
  * Reforming Economies: $578/tCO2
  * Rest of World: $526/tCO2

Implementation in VerveStacks Models
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Trajectory Construction**:
  * Boundary conditions start from current low/zero pricing in most regions
  * Exponential growth patterns post-2025 for ambitious scenarios  
  * Regional mapping applies R10 region medians to constituent countries
  * Uncertainty handling uses quartile ranges for sensitivity analysis

**Model Applications**:
  * Scenario differentiation through carbon pricing assumptions
  * Technology deployment economics and timing
  * Fossil fuel phase-out pathways
  * Renewable energy investment drivers

**Policy Relevance**:
  * NDC analysis with quantitative carbon pricing assumptions
  * Technology assessment for renewable energy investments  
  * Transition planning with realistic price signals

Data Quality and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Strengths**:
  * Peer-reviewed IPCC AR6 source representing global scientific consensus
  * Quality-controlled Chapter 3 vetted scenarios
  * Global coverage with regional granularity
  * 2020-2050 temporal scope covers critical transition period

**Limitations**:
  * Large uncertainty ranges reflect diverse modeling approaches
  * Assumes perfect policy implementation and enforcement
  * R10 regional aggregation may mask sub-regional variation
  * Embedded assumptions about technology costs and availability

.. note::
   All carbon pricing data processing code and extracted datasets are available in the VerveStacks repository (``scenario_drivers/ar6_exploration.ipynb``), ensuring full reproducibility of trajectory construction methodology.

Renewable Policies
------------------
- Renewable portfolio standards
- Feed-in tariff assumptions
- Grid integration requirements
- Technology-specific support mechanisms

.. note::
   Detailed fuel price and policy assumption tables to be provided.

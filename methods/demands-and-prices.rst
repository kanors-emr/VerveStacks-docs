==================
Demands and Prices
==================

**Fuel price trajectories, demand projections, and policy assumptions**

VerveStacks incorporates comprehensive demand forecasting and fuel price trajectories from global scenario datasets to create realistic economic foundations for energy system modeling.

Core Philosophy
===============

**Economic Realism Through Global Integration**

VerveStacks embeds economic signals directly from peer-reviewed global scenarios, ensuring that country-specific models reflect realistic price trajectories and demand evolution patterns. This approach provides quantitative foundations for technology deployment economics, fossil fuel phase-out pathways, and renewable energy investment drivers.

**Scenario-Driven Differentiation**

Rather than using static assumptions, VerveStacks leverages scenario-based trajectories that capture the economic dynamics of different climate and policy pathways. This enables robust analysis of technology transitions under varying economic conditions.

Fuel Price Integration
======================

AR6 Scenarios Foundation
------------------------

**Base year fuel price assumptions**

VerveStacks incorporates country-specific fuel price assumptions based on regional market conditions, transportation costs, and infrastructure constraints:

.. csv-table:: **Representative Fuel Price Ranges by Country (USD/MWh thermal)**
   :file: ../_static/data/fuel_prices_sample.csv
   :widths: 15, 12, 12, 12, 12, 12, 12, 15, 15
   :header-rows: 1
   :align: left
   :class: csv-table

*Note: Prices represent delivered cost to power plants including transportation. Ranges reflect seasonal variations, contract vs spot pricing, and peak/off-peak periods.*

**Key Data Sources:**

- **U.S. Energy Information Administration (EIA)**: Henry Hub natural gas spot prices, Central Appalachian coal prices, Short-Term Energy Outlook (August 2025), wood pellet prices
- **International Energy Agency (IEA)**: Energy Prices Database, Gas Market Report Q3-2025
- **European Commission**: Weekly Oil Bulletin, EU Energy Markets Observatory
- **CME Group/NYMEX**: Natural gas futures (Henry Hub), coal futures (Central Appalachian)
- **ICE**: TTF gas futures, API2 coal futures, Brent crude futures
- **Argus Media**: Global LNG prices, Asian spot LNG (JKM), coal price assessments, biomass pellet indices
- **S&P Global Platts**: Regional gas hubs, coal markers, oil product prices

**Regional Price Benchmarks (2025 Averages):**

- **Natural Gas**: Henry Hub $2.50-4.20/MMBtu; TTF €25-35/MWh; JKM $10-14/MMBtu
- **Coal**: Central Appalachian $70-80/ton; API2 (ARA) $90-110/ton; Newcastle $120-150/ton
- **Oil**: Brent $75-85/barrel; WTI $70-80/barrel
- **Biomass**: US pellets $180-230/ton; EU pellets €180-250/ton; Asian pellets $150-200/ton; Agricultural residues $40-80/ton


**Global fuel price trajectories by scenario**
- Regional price adjustments based on IPCC AR6 Working Group III scenarios
- Transportation and distribution cost modeling
- Tax and subsidy adjustment mechanisms

Carbon Pricing Implementation
=============================

**Carbon pricing trajectories from IPCC AR6 climate scenarios**

VerveStacks incorporates carbon pricing trajectories extracted from IPCC AR6 Working Group III vetted scenarios, providing quantitative foundations for energy system modeling across 5 climate categories, 11 global regions, and the critical 2020-2050 transition period.

Data Source and Methodology
----------------------------

* **Source**: IPCC AR6 Working Group III Scenarios Database R10 regions v1.1
* **Quality Control**: Chapter 3 vetted scenarios only (peer-reviewed model-scenario combinations)
* **Variable**: ``Price|Carbon`` (economy-wide carbon pricing)
* **Currency**: All values in constant 2015 US Dollars (USD2015) per IPCC AR6 conventions
* **Outlier Treatment**: Conservative IQR-based removal (2.5×IQR threshold) applied surgically by Category-Region-Year groups
* **Coverage**: 385 data points across 5 climate categories and 11 R10 regions

Climate Categories and Price Ranges
------------------------------------

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
---------------------------

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


Regional Price Differentiation
-------------------------------

For the most ambitious scenarios (C1), regional median prices in 2050 range from $526-644/tCO2:

**Developed Regions** (highest carbon prices):
  * North America: $644/tCO2
  * Europe: $635/tCO2  
  * Pacific OECD: $604/tCO2

**Emerging Economies** (moderate carbon prices):
  * Africa: $605/tCO2
  * India+: $592/tCO2
  * China+: $582/tCO2

**Other Regions** (lower carbon prices):
  * Latin America, Middle East, Rest of Asia: ~$582/tCO2
  * Reforming Economies: $578/tCO2
  * Rest of World: $526/tCO2

Demand Projection Framework
===========================

**Energy Demand Evolution**

VerveStacks integrates demand projections that reflect:
- Economic growth trajectories aligned with scenario assumptions
- Sectoral demand evolution (residential, commercial, industrial, transport)
- Efficiency improvement pathways
- Electrification trends across sectors

.. note::
   All carbon pricing trajectories and fuel price assumptions are derived from peer-reviewed IPCC AR6 scenarios with full methodological transparency and reproducibility.

.. seealso::
   
   :doc:`renewable-characterization`
      Renewable resource assessment and technology cost assumptions
   
   :doc:`existing-stock-characterization`
      Existing power plant economics and retirement assumptions
   
   :doc:`stress-timeslices`
      Temporal modeling of price volatility and system stress periods

# Existing Stock Characterization

**Every power unit in the country, with its own numbers, at its place on the grid**

<figure class="vs-film" markdown="0">
  <video controls preload="none" playsinline poster="../../_static/films/deu_power_fleet.jpg">
    <source src="../../_static/films/deu_power_fleet.mp4" type="video/mp4">
  </video>
  <figcaption><strong>Watch first: Germany's Power Fleet</strong> (1:48, narrated). Generated from a real build of the German model; every number on screen traces to a file. The sections below follow the film in the same order, with the rules and file names behind each step. Also: <a href="../../films/v/plants_DEU.html">interactive version</a> · <a href="../../films/v/plants_IND.html">India</a> · <a href="../../films/">all films</a>.</figcaption>
</figure>

Each country model starts from an inventory of the power units that exist. The inventory is built from unit-level data, completed with national statistics where the unit data falls short, and checked against independent statistics. Doing this once, in the open, replaces work that many teams otherwise repeat separately.

## The method in six steps

1.  **Units.** Take every unit in the country from Global Energy Monitor.
2.  **Status.** Decide what counts as the existing fleet.
3.  **Characterise.** Give each unit a fuel, a technology and its own cost and performance numbers.
4.  **Group.** Keep large units individually; pool small ones.
5.  **Fill the gaps.** Add the capacity the unit data misses, from IRENA and Ember.
6.  **Check.** Compare the fleet with independent statistics.

|                                 | Germany | India |
|---------------------------------|---------|-------|
| Units in Global Energy Monitor  | 12,088  | 8,286 |
| Kept as individual units        | 248     | 924   |
| Pooled small units              | 10,342  | 5,513 |
| Carbon-capture retrofit options | 85      | 320   |

***The two example countries***

## Step 1: Units

The starting point is Global Energy Monitor's Global Integrated Power data (release of March 2026): one record per unit, with location, capacity, fuel, technology, start year, retirement year and status.

## Step 2: Status

| Status                      | Treatment                                                                                                                                                                          |
|----------------------|--------------------------------------------------|
| Operating                   | In the fleet                                                                                                                                                                       |
| Retired                     | Removed, unless the unit retired in or after the base year (2022). Those ran in the base year and stay, with their retirement date. Germany's last three reactors are the example. |
| Mothballed                  | Kept as a separate group (prefix `ep_m_`) that can be brought back                                                                                                                 |
| Under construction          | In the fleet, with its future start year                                                                                                                                           |
| Announced, pre-construction | Not in the fleet. Offered to the model as an option to build.                                                                                                                      |
| Cancelled, shelved          | Removed. Hydro is the exception: cancelled and shelved hydro projects are kept as options, because the site still exists.                                                          |

***What happens to each status***

In India this step removes 869 units, of which 759 are coal units totalling 584 GW: more coal than the country operates.

## Step 3: Fuel, technology and numbers

Each unit gets a model fuel and technology from its Global Energy Monitor type, technology and fuel fields (tables below). Oil and gas units are split by their fuel detail.

Each unit then gets its own numbers: efficiency by technology, size and age; costs adjusted for size and world region; lifetime; and, for thermal units, the limits on flexible operation. See *Costs and performance* below.

**Heat.** Units that also supply heat are flagged from Global Energy Monitor's combined heat and power field, with a correction layer where that field is known to be wrong. A flagged unit gets a heat-to-power ratio by fuel and prime mover:

| Unit type                | Maximum heat-to-power ratio | Mode                  |
|------------------------------------|-------------------|-------------------|
| Coal, steam              | 1.2                         | Extraction            |
| Bioenergy, steam         | 2.3                         | Extraction            |
| Gas combined cycle       | 0.5                         | Extraction            |
| Gas or oil steam turbine | 1.0                         | Extraction            |
| Gas turbine, engine      | 1.0                         | Fixed (back-pressure) |

About three quarters of Germany's coal and gas capacity supplies heat. Heat demand is placed at the nodes where these units stand.

## Step 4: Large units individually, small units pooled

-   **Above the threshold** for its fuel, a unit keeps its identity: its own process in the model, at its grid node.
-   **Below the threshold**, units are pooled by fuel, technology, location and age. Thermal units pool at their grid node; solar and wind at their resource cluster.
-   **Nuclear** units are always individual.

**Size thresholds**

The size above which a unit is kept individually depends on the country and the fuel. A large system has a high threshold and a small system a low one, so every country ends up with a workable number of individual units.

| **Fuel Group**                | **Threshold Logic**                     | **Rationale**                                                              |
|-------------------|-------------------|------------------------------------|
| Fossil Fuels (Coal, Gas, Oil) | Combined threshold targeting ≤200 units | Fossil plants create \~3x more model variables due to CCS retrofit options |
| Nuclear                       | Always 0.0 (track all)                  | Critical infrastructure requiring individual modeling                      |
| Hydro + Geothermal            | Combined threshold targeting ≤100 units | Grid flexibility and storage characteristics                               |
| Solar/Wind                    | Individual thresholds, minimum 200 MW   | Utility-scale focus with economic viability considerations                 |
| Other Renewables              | Default 50 MW threshold                 | Standard renewable technology handling                                     |

***Threshold Strategy by Fuel Type***

**System-Scale Examples:**

| **Country**      | **Fossil (MW)** | **Hydro (MW)** | **Solar (MW)** | **Wind (MW)** |
|---------------|---------------|---------------|---------------|---------------|
| China (Large)    | 1000            | 1000           | 500            | 360           |
| USA (Large)      | 860             | 190            | 200            | 260           |
| Germany (Medium) | 110             | 10             | 200            | 200           |
| Small Countries  | 10              | 10             | 200            | 200           |

***Threshold Variations by Country Scale***

**Configuration Source:**

Thresholds are generated from the Global Energy Monitor data by `Miscellaneous/count_power_plants_by_iso.py`: for each fuel group, the threshold is the size of the Nth largest unit, where N is the target count, rounded to 10 MW.

!!! note

    The complete threshold configuration is stored in `assumptions/iso_fuel_capacity_thresholds.csv` with metadata in `assumptions/iso_fuel_capacity_thresholds_metadata.yaml`.

**Carbon-capture retrofits.** Individual coal units of 300 MW or more, and gas and oil units of 400 MW or more, get a retrofit option (process name ending `_rf`). Pooled units do not. Retrofit cost and the penalties on efficiency and output come from the US Environmental Protection Agency's retrofit data.

## Step 5: Fill the gaps

Unit data misses small and distributed capacity. Global Energy Monitor sees 19 GW of German solar in 2022; IRENA reports 61 GW. The pipeline adds the difference.

**Renewables, from IRENA, year by year.**

``` text
base year:    gap = IRENA capacity(2022) − unit capacity started by 2022
later years:  gap = IRENA increase in the year − unit capacity started that year
```

So the fleet follows IRENA's path through the latest statistical year, not only its base-year level.

| Country | Fuel      | Year               | Gap              |
|---------|-----------|--------------------|------------------|
| Germany | Solar     | 2022 / 2023 / 2024 | 41.8 / 9.3 / 8.4 |
| India   | Wind      | 2022               | 8.6              |
| India   | Bioenergy | 2022               | 7.9              |
| India   | Hydro     | 2022               | 4.0              |
| India   | Solar     | 2023 / 2024        | 4.2 / 9.1        |

***Gaps filled (GW)***

**Thermal, from Ember, in the base year.** Where Ember reports more coal or gas capacity than the unit data holds, the difference is added.

**Where the added capacity goes.**

| Fuel             | Placement                                                                         |
|-------------------|-----------------------------------------------------|
| Solar            | By population. The missing solar is mostly rooftop, so it goes where people live. |
| Wind             | To resource clusters, by resource quality and existing wind capacity              |
| Bioenergy, hydro | To grid nodes                                                                     |
| Coal, gas        | To grid nodes, by existing thermal capacity                                       |

Added capacity carries the same node or cluster commodities as real units, for example `elc_spv_DEU_017`.

## Step 6: Check

The finished fleet is compared with three independent sources. The comparison is written to the `Calibration` sheet of each model's workbook.

| Quantity   | Compared with                                       | Fuels   |
|------------|-----------------------------------------------------|---------|
| Capacity   | IRENA and Ember                                     | All     |
| Generation | IRENA and Ember (capacity × reported utilisation)   | All     |
| Fuel use   | UN energy statistics (generation ÷ unit efficiency) | Thermal |

The check is a report, not a forced match. Differences that remain are visible. Known ones include definitions that differ between sources (pumped storage in hydro) and a mapping problem for oil capacity.

## Costs and performance

**Technology Cost Assignment**

Every unit receives cost and performance parameters from `ep_technoeconomic_assumptions.xlsx`, adjusted for region and size.

**Cost Parameter Integration**

| **Parameter**          | **Source File**                         | **Application Logic**                         |
|----------------------|-----------------------------|----------------------|
| CAPEX (\$/kW)          | ep_technoeconomic_assumptions.xlsx      | Technology + size class + regional multiplier |
| Fixed O&M (\$/kW-yr)   | ep_technoeconomic_assumptions.xlsx      | Annual fixed operating costs                  |
| Variable O&M (\$/MWh)  | ep_technoeconomic_assumptions.xlsx      | Per-MWh operating costs                       |
| Thermal Efficiency (%) | VS_mappings.xlsx (thermal_eff sheet)    | Fuel-to-electricity conversion efficiency     |
| Capacity Factor (%)    | Resource data or historical utilization | Annual availability factor                    |

***Techno-Economic Parameter Sources***

**Regional Cost Adjustments**

Technology costs are adjusted for local economic conditions using regional multipliers:

``` sql
SELECT 
    base_capex * regional_multiplier * size_multiplier AS adjusted_capex,
    base_fixom * regional_multiplier AS adjusted_fixom,
    base_varom * regional_multiplier AS adjusted_varom
FROM technology_costs T1
JOIN regional_multipliers T2 ON T1.region = T2.region
JOIN size_multipliers T3 ON T1.size_class = T3.size_class
```

**Technology Cost Inheritance Formula**

``` sql
SELECT 
    weo_base_cost * regional_multiplier * size_multiplier * vintage_factor AS final_cost,
    weo_base_efficiency * regional_efficiency_factor * vintage_degradation AS final_efficiency
FROM weo_technology_assumptions W
JOIN ep_regionmap R ON W.region = R.region  
JOIN regional_multipliers M ON R.region = M.region
WHERE R.iso = '{country_iso_code}'
```

**Life Extension Cost Integration**

VerveStacks includes life extension costs, which capture the economic reality of aging thermal infrastructure. As power plants approach the end of their design life, operators face critical investment decisions: retire the facility or invest in major refurbishments to extend operational life.

The life extension cost methodology follows the approach established in EPA's Integrated Planning Model (IPM) version 6, which recognizes that thermal power plants can operate beyond their original design life through substantial capital investments. These costs reflect the reality that aging infrastructure requires major overhauls of critical components including boilers, turbines, generators, and environmental control systems.

| **Technology Type**                    | **Design Life (years)** | **Life Extension Cost (\$/kW)** |
|-----------------------------|---------------|-----------------------------|
| Biomass Steam                          | 40                      | \$253                           |
| Coal Steam                             | 40                      | \$203                           |
| Combined Cycle Gas Turbine             | 30                      | \$82                            |
| Combustion Turbine (Peaker)            | 30                      | \$242                           |
| Internal Combustion Engine             | 30                      | \$226                           |
| Oil/Gas Steam                          | 40                      | \$174                           |
| Integrated Gasification Combined Cycle | 40                      | \$258                           |
| Landfill Gas                           | 20                      | \$135                           |

***Life Extension Cost Assumptions (IPM v6 Methodology)***

**Economic Logic and Implementation**

The life extension cost framework operates on the principle that thermal power plants face discrete investment decisions at the end of their design life. Plants that have reached their original lifespan can continue operating only if operators invest in major refurbishments that essentially reset the plant's operational capability.

Key characteristics of the life extension cost methodology:

-   **Threshold-Based Application**: Life extension costs are triggered only when plants operate beyond their technology-specific design life
-   **Technology-Specific Costs**: Reflect the varying complexity and capital intensity of different thermal technologies
-   **One-Time Investment**: Life extension costs represent a discrete capital investment, not ongoing maintenance
-   **Operational Realism**: Captures the actual decision-making process utilities face with aging assets

**Technology-Specific Considerations**

The variation in life extension costs across technologies reflects fundamental differences in plant complexity and refurbishment requirements:

-   **Combined Cycle Gas Turbines** (\$82/kW): Lower costs reflect modular design and standardized components
-   **Coal Steam Plants** (\$203/kW): Moderate costs for mature technology with established refurbishment practices
-   **IGCC Plants** (\$258/kW): Highest costs due to complex gasification systems and limited operational experience
-   **Combustion Turbines** (\$242/kW): High costs despite simple design due to intensive operational duty cycles

This approach ensures that fossil plant retirement decisions reflect realistic economics rather than arbitrary assumptions, enabling more accurate modeling of energy transition pathways and stranded asset risks.

**Unit Commitment Parameter Integration**

Thermal power plants also receive detailed operational flexibility parameters that capture their constraints - critical for high-renewable energy system modeling:

| **Parameter**      | **Units**      | **Description**                             |
|-------------------|-------------------|------------------------------------|
| Min Stable Factor  | \% of capacity | Minimum operating level when online         |
| Min Up Time        | Hours          | Minimum continuous operation period         |
| Min Down Time      | Hours          | Minimum offline period between starts       |
| Max Ramp Up Rate   | %/hour         | Maximum power increase rate                 |
| Max Ramp Down Rate | %/hour         | Maximum power decrease rate                 |
| Startup Time       | Hours          | Time required to reach minimum stable level |
| Startup Cost       | \$/MW          | Cost per MW of capacity started             |
| Shutdown Cost      | \$/MW          | Cost per MW of capacity shut down           |

***Unit Commitment Parameters Added to Thermal Plants***

The system uses pattern matching to assign appropriate unit commitment characteristics based on technology type (coal, gas CCGT, gas OCGT, nuclear) and plant size class (Small/Medium/Large/XLarge).

## Complete Assumption Tables

**VS_mappings.xlsx Reference Tables**

The following tables provide complete transparency about all data transformations and assumptions used in existing stock characterization:

**Data Sources Documentation**

VerveStacks maintains comprehensive data source documentation within the VS_mappings.xlsx file to ensure complete transparency and reproducibility:

| **Data Source**                 | **Content & Coverage**                                                      | **Update Frequency** | **Quality** |
|------------------|-------------------------|------------------|------------|
| **Global Energy Monitor (GEM)** | Individual power units worldwide (March 2026 release)                       | Monthly updates      | ⭐⭐⭐⭐⭐  |
| **IRENA Statistics**            | National renewable capacity & generation, annual                            | Annual updates       | ⭐⭐⭐⭐⭐  |
| **EMBER Climate**               | Electricity generation and capacity by country and fuel, annual and monthly | Annual updates       | ⭐⭐⭐⭐⭐  |
| **World Energy Outlook (WEO)**  | Technology costs & performance by region                                    | Annual updates       | ⭐⭐⭐⭐⭐  |
| **UNSD Energy Statistics**      | UN energy balances & trade flows                                            | Annual updates       | ⭐⭐⭐⭐    |
| **REZoning Database**           | 50x50km renewable resource potential grid                                   | Static analysis      | ⭐⭐⭐⭐    |
| **ERA5 Weather**                | Hourly solar and wind profiles (default weather year 2013)                  | Historical data      | ⭐⭐⭐⭐⭐  |
| **EPA CCS Retrofit**            | Carbon capture retrofit potential & costs                                   | Periodic updates     | ⭐⭐⭐⭐    |

***Primary Data Sources and Update Frequencies***

**Data Integration Methodology**

| **Priority** | **Data Source**    | **Usage Logic**                                                            |
|---------------|----------------------|------------------------------------|
| 1st Priority | GEM Plant Database | Individual unit specifications above the country's fuel-specific threshold |
| 2nd Priority | IRENA Statistics   | Fill renewable capacity gaps year by year                                  |
| 3rd Priority | EMBER Statistics   | Fill coal and gas capacity gaps in the base year                           |
| 4th Priority | WEO Assumptions    | Technology costs & performance parameters                                  |
| 5th Priority | Default Values     | Conservative fallbacks for missing parameters                              |

***Source Integration Hierarchy***

### GEM Technology Mapping (gem_techmap)

| **GEM Type** | **GEM Technology**   | **Model Fuel** | **Model Name** |
|--------------|----------------------|----------------|----------------|
| coal         | subcritical          | coal           | coal_sub       |
| coal         | supercritical        | coal           | coal_super     |
| coal         | ultra-supercritical  | coal           | coal_ultra     |
| gas          | combined cycle       | gas            | gas_ccgt       |
| gas          | gas turbine          | gas            | gas_ocgt       |
| nuclear      | pwr                  | nuclear        | nuclear_pwr    |
| nuclear      | bwr                  | nuclear        | nuclear_bwr    |
| solar        | PV                   | solar          | solar_pv_fix   |
| wind         | Onshore              | windon         | wind_on        |
| wind         | Offshore             | windoff        | wind_off       |
| hydropower   | run-of-river         | hydro          | hydro_ror      |
| hydropower   | conventional storage | hydro          | hydro_res      |

***Technology Standardization Rules***

### IRENA-EMBER Type Mapping (irena_ember_typemap)

| **Type**             | **Source** | **Model Fuel** | **Description**               |
|------------------|------------------|------------------|------------------|
| Solar photovoltaic   | IRENA      | solar          | All solar PV installations    |
| Wind energy          | IRENA      | windon         | Onshore wind turbines         |
| Offshore wind energy | IRENA      | windoff        | Offshore wind turbines        |
| Hydropower           | IRENA      | hydro          | All hydroelectric generation  |
| Coal                 | EMBER      | coal           | All coal-fired generation     |
| Gas                  | EMBER      | gas            | All natural gas generation    |
| Oil                  | EMBER      | oil            | Oil-fired generation          |
| Bioenergy            | IRENA      | bioenergy      | Biomass and biogas generation |
| Geothermal           | IRENA      | geothermal     | Geothermal energy generation  |

***Statistical Data Harmonization***

### Technology Classification Tables

**WEO Power Generation Technologies (weo_pg_techs)**

| **Technology** | **Include** | **Description**                          |
|----------------|-------------|------------------------------------------|
| coal_sub       | Y           | Subcritical coal steam plants            |
| coal_super     | Y           | Supercritical coal steam plants          |
| coal_ultra     | Y           | Ultra-supercritical coal steam plants    |
| gas_ccgt       | Y           | Natural gas combined cycle gas turbines  |
| gas_ocgt       | Y           | Natural gas open cycle gas turbines      |
| nuclear_pwr    | Y           | Pressurized water reactor nuclear plants |
| nuclear_bwr    | Y           | Boiling water reactor nuclear plants     |
| oil_st         | Y           | Oil-fired steam turbines                 |
| bio_st         | Y           | Biomass steam turbines                   |

***Thermal Technology Definitions***

**Storage Technologies (storage_techs)**

**Demand Technologies (dem_techs)**

| **Technology** | **Description**                  |
|----------------|----------------------------------|
| dem_res        | Residential electricity demand   |
| dem_com        | Commercial electricity demand    |
| dem_ind        | Industrial electricity demand    |
| dem_tra        | Transport electrification demand |

***Demand Sector Definitions***

## Techno-Economic Assumptions Reference

**Technology Assumptions Database Structure**

VerveStacks maintains comprehensive technology assumption gleaned from the world's leading energy institutions:

**Core Technology Parameters**

| **Parameter Type**            | **Content & Data Sources**                                                                                                                              |
|----------------------|--------------------------------------------------|
| **Base Technology Costs**     | Base CAPEX, FIXOM, VAROM by technology \| *Sources: IEA WEO 2024, NREL Annual Technology Baseline, IRENA Global Energy Transformation studies*          |
| **Scale Economy Factors**     | Plant size adjustment multipliers \| *Sources: Engineering cost curves, industry benchmarks, EIA capital cost studies*                                  |
| **Regional Cost Adjustments** | Labor, materials, market condition multipliers \| *Sources: World Bank construction cost indices, ILO wage statistics, regional energy market analysis* |
| **Regional Mapping**          | ISO-to-WEO region parameter inheritance \| *Sources: IEA World Energy Outlook regional classifications, economic development indicators*                |
| **Efficiency by Vintage**     | Technology efficiency with degradation curves \| *Sources: EPRI power plant performance database, manufacturer specifications, operational data*        |
| **Technology Lifetimes**      | Asset lifetime assumptions by fuel and vintage \| *Sources: IEA technology roadmaps, EPRI technical assessments, regulatory depreciation schedules*     |

***Techno-Economic Parameter Categories***

**Advanced Operational Parameters**

| **Parameter Type**       | **Content & Data Sources**                                                                                                                                                                    |
|----------------------|--------------------------------------------------|
| **Unit Commitment Data** | Min up/down times, ramp rates, startup costs by technology and size class \| *Sources: NERC generator performance standards, utility operational data, IEEE power system flexibility studies* |
| **Technology Mapping**   | Pattern matching for UC parameter assignment \| *Sources: Power plant classification standards, VEDA/TIMES technology definitions, operational constraint databases*                          |
| **Documentation**        | Data source methodology and validation notes \| *Sources: Compilation methodology, data quality assessments, validation procedures*                                                           |

***Unit Commitment Parameter Categories***

**WEO Technology Cost Integration**

| **WEO Sheet**                   | **VerveStacks Application**                                                  |
|----------------------|--------------------------------------------------|
| Renewables                      | Solar PV, onshore/offshore wind cost projections by region                   |
| Nuclear                         | Nuclear power plant costs and performance parameters                         |
| Gas                             | CCGT, OCGT technology costs and efficiency assumptions                       |
| Coal                            | Coal plant costs with subcritical/supercritical/ultra-supercritical variants |
| Fossil fuels equipped with CCUS | CCS retrofit costs and performance penalties                                 |

***WEO 2024 Power Generation Assumptions Integration***

**Authoritative Data Sources Summary**

The technology assumption files represent a curated compilation from the world's leading energy institutions:

| **Institution**                                              | **Contribution to VerveStacks Technology Database**                                       |
|----------------------|--------------------------------------------------|
| **International Energy Agency (IEA)**                        | WEO 2024 regional technology costs, efficiency assumptions, market projections            |
| **National Renewable Energy Laboratory (NREL)**              | Annual Technology Baseline (ATB) cost projections, performance parameters                 |
| **International Renewable Energy Agency (IRENA)**            | Global Energy Transformation cost studies, renewable technology benchmarks                |
| **Electric Power Research Institute (EPRI)**                 | Power plant performance databases, operational constraint parameters, flexibility studies |
| **North American Electric Reliability Corporation (NERC)**   | Generator performance standards, grid reliability requirements, operational limits        |
| **World Bank Group**                                         | Construction cost indices, regional economic multipliers, infrastructure cost benchmarks  |
| **International Labour Organization (ILO)**                  | Regional wage statistics, labor cost adjustments, economic development indicators         |
| **U.S. Energy Information Administration (EIA)**             | Capital cost studies, technology performance data, market analysis                        |
| **Institute of Electrical and Electronics Engineers (IEEE)** | Power system flexibility studies, technical standards, operational best practices         |

***Primary Institutional Sources***

**Data Quality and Validation Standards**

| **Validation Level**           | **Quality Control Process**                                                    |
|----------------------|--------------------------------------------------|
| **Source Verification**        | All parameters traced to peer-reviewed publications or institutional databases |
| **Cross-Reference Validation** | Multiple source comparison for consistency (IEA vs NREL vs IRENA)              |
| **Regional Calibration**       | Local market conditions validated against national energy statistics           |
| **Temporal Consistency**       | Technology cost trends validated against historical deployment data            |
| **Operational Validation**     | Unit commitment parameters validated against actual plant performance data     |

***Quality Assurance Framework***

**Complete Technology Assumption Tables**

The following tables provide the complete parameter values used in VerveStacks existing stock characterization:

**Base Technology Efficiency**

**Technology Efficiency by Commissioning Year (by size class)**

{{ read_csv('_static/data/thermal_efficiency_by_vintage.csv', keep_default_na=False, dtype='str') }}

**Base Technology Costs**

**Technology Cost Parameters (CAPEX $/kW, FIXOM $/kW-yr, VAROM $/MWh)**

{{ read_csv('_static/data/base_technology_costs.csv', keep_default_na=False, dtype='str') }}

**Size-Based Cost Multipliers**

**Scale Economy Adjustments by Plant Size**

{{ read_csv('_static/data/size_based_multipliers.csv', keep_default_na=False, dtype='str') }}

**Regional Cost Multipliers**

**Regional Economic Adjustments by WEO Region**

{{ read_csv('_static/data/regional_multipliers.csv', keep_default_na=False, dtype='str') }}

**Technology Lifetimes**

**Asset Lifetime Assumptions by Technology**

{{ read_csv('_static/data/technology_lifetimes.csv', keep_default_na=False, dtype='str') }}

**How Plant Lifetimes Are Assigned**

Each existing plant is assigned a lifetime using a two-priority rule:

1.  **Known retirement date (highest priority).** When the source data records a specific retirement year for an individually-tracked plant, the lifetime is set to exactly that span — commissioning year to retirement year. This reflects scheduled closures, regulatory mandates, or operator decisions already captured in the underlying plant database.
2.  **No known retirement date (default).** The lifetime is set to whichever is longer: the technology design life from the table above, or the number of years remaining between the plant's commissioning year and 2055. The 2055 floor is a deliberate modeling convention — it ensures that no existing plant drops out of the model before the end of the planning horizon, avoiding artificial capacity cliffs in mid-period years.

The practical effect of the 2055 floor is most visible for legacy plants commissioned in the 1960s and 1970s: a coal unit from 1971 would have exhausted its 50-year design life well before 2055, so it receives a lifetime of 84 years (2055 − 1971) instead. Modern plants commissioned after 2005 are typically governed by the design life rather than the floor.

| **Plant**                        | **COD** | **Design life** | **2055 − COD** | **Assigned lifetime**          |
|-------------------------|---------|-----------|-----------|------------------|
| Medupi U6 (supercritical coal)   | 2015    | 50 yrs          | 40 yrs         | 50 yrs *(design life)*         |
| Kusile U3 (supercritical coal)   | 2021    | 50 yrs          | 34 yrs         | 50 yrs *(design life)*         |
| Legacy subcritical unit          | 1971    | 50 yrs          | 84 yrs         | 84 yrs *(2055 floor)*          |
| Plant with known closure in 2035 | 2000    | —               | —              | 35 yrs *(explicit retirement)* |

***Illustrative Lifetime Outcomes***

!!! note

    If a coal phase-out policy or early retirement scenario is being modeled, the correct mechanism is to record a retirement year against the affected plants in the source database. This takes priority over both the design life and the 2055 floor, and is the only way to force retirement before the horizon ends.

**CCS Retrofit Lifetime**

Carbon capture retrofit options are treated as discrete 20-year investments, regardless of the age or technology type of the host plant. This follows the approach used in the EPA Integrated Planning Model (IPM v6), which frames post-combustion capture additions as a bounded capital commitment rather than a permanent life extension of the underlying asset.

**Unit Commitment Parameters**

**Operational Constraints by Technology and Size Class**

{{ read_csv('_static/data/unit_commitment_parameters.csv', keep_default_na=False, dtype='str') }}

**Unit Commitment Technology Mapping**

**Pattern Matching Rules for UC Parameter Assignment**

{{ read_csv('_static/data/unit_commitment_tech_mapping.csv', keep_default_na=False, dtype='str') }}

**Technology Classification Tables**

**GEM Technology Mapping**

**GEM Fuel-Technology Combinations to VerveStacks Model Names**

{{ read_csv('_static/data/gem_technology_mapping.csv', keep_default_na=False, dtype='str') }}

**IRENA-EMBER Type Mapping**

**Statistical Data Source Harmonization**

{{ read_csv('_static/data/irena_ember_type_mapping.csv', keep_default_na=False, dtype='str') }}

**WEO Power Generation Technologies**

**IEA WEO Technology Classifications**

{{ read_csv('_static/data/weo_power_generation_techs.csv', keep_default_na=False, dtype='str') }}

**Storage Technologies**

**Storage Technology Definitions**

{{ read_csv('_static/data/storage_technologies.csv', keep_default_na=False, dtype='str') }}

## Data Quality and Validation

**How much the gap-fill adds varies widely.** It is small for large thermal fleets and large for distributed renewables.

| Example                | Share of capacity that comes from the gap-fill |
|------------------------|------------------------------------------------|
| Germany, solar, 2022   | About two thirds                               |
| India, bioenergy, 2022 | About three quarters                           |

**Defaults when a field is missing.**

| Missing    | Default                                            |
|------------|----------------------------------------------------|
| Efficiency | The typical value for the technology and vintage   |
| Start year | 2028 for units under construction; 2015 otherwise  |
| Location   | The unit is attached at country level and reported |

**Lifetime.** Units that would retire before 2055 on their technical lifetime are kept available to 2055, with the cost of life extension.

The comparison with IRENA, Ember and UN statistics is described in *Step 6* above.

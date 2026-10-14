# Source Datasets

**Global datasets used in VerveStacks model generation**

Every dataset below is read by the model generation pipeline. Sources are grouped by the stage that consumes them, so it is clear what each one actually determines in a finished model.

Two sectoral modules — [steel](sources.md#optional-steel) and [CO2 capture, transport and storage](sources.md#optional-ccs) — are **optional additions** and are documented separately at the end of this page. Everything before that section is part of a standard build.

!!! note
    Data is held in its native form and transformed at build time, so a new vintage of any source can be dropped in without reworking the model. Vintages quoted here are those currently in the pipeline; see [Data Lineage](data-lineage.md) for how a given model parameter traces back to its source.

## Energy Balances and Statistics

### IEA World Energy Balances

- **Content**: Energy production, transformation and final consumption by country, product and flow
- **Coverage**: Global, all sectors, annual
- **Usage**: Base year calibration of demand and supply; sectoral and sub-sectoral disaggregation of industry; combined heat and power heat-to-power ratios by country
- **Update frequency**: Annual

### UNSD Energy Statistics

- **Content**: UN Statistics Division energy balances
- **Coverage**: Country-level, including countries with thin IEA coverage
- **Usage**: Gap-filling and cross-checking of IEA balances
- **Update frequency**: Annual

### Ember

- **Content**: Historical electricity generation and capacity by fuel, annual and monthly
- **Coverage**: Country-level
- **Usage**: Base year electricity calibration and validation; monthly series supply the seasonal shape used in hydro availability scenarios
- **Update frequency**: Annual full release with monthly updates

!!! note
    A small set of documented corrections is applied to Ember before use, where the published series conflicts with national statistics. Corrections are versioned and carry a stated rationale.

## Existing Power Plant Stock

### GEM Global Integrated Power

- **Content**: Unit-level power plant database — capacity, fuel, technology, status, start year, coordinates
- **Coverage**: Operating, construction and announced units worldwide
- **Usage**: Existing capacity by vintage, technology mapping, and assignment of plants to network buses in grid models
- **Update frequency**: Quarterly

### IRENA Statistics

- **Content**: Installed renewable electricity capacity and generation by technology
- **Coverage**: Country-level
- **Usage**: Gap-filling where GEM unit coverage is incomplete, and validation of renewable capacity totals
- **Update frequency**: Annual

### Plant-Specific Efficiencies

- **Content**: Unit-level thermal efficiency estimates keyed to GEM plant identifiers
- **Coverage**: Thermal fleet
- **Usage**: Vintage-specific efficiency for existing thermal units, in place of technology-average values
- **Update frequency**: Compiled alongside the GEM power tracker

### Hydropower Potential Beyond GEM

- **Content**: Named frontier and long-term hydro projects that the GEM pipeline does not capture — Tibetan mega-complexes, full-scale Grand Inga, frontier Amazon cascades and small hydro below the tracker threshold — each with coordinates, indicative capacity, cost tier, capacity factor and development timeframe
- **Coverage**: The twelve countries holding the bulk of undeveloped potential
- **Usage**: Upper bounds on new hydro capacity, and where that capacity can be sited, on top of the GEM pipeline
- **Update frequency**: Curated; revised as projects advance

!!! note
    This is a curated compilation drawn from proposed projects and basin studies rather than a published dataset, with cost tiers anchored on documented outturns for comparable schemes. It is the least standardised input on this page, and worth reviewing directly in any study where hydro expansion is material.

## Renewable Resource Assessment

### REZoning Dataset

- **Content**: Renewable energy technical potential by grid cell, with land availability after exclusions, terrain factors and grid connection distance
- **Coverage**: Global solar PV, onshore wind and offshore wind at 50x50 km resolution
- **Usage**: Renewable supply curves, per-cluster capacity bounds, and connection cost estimates
- **Update frequency**: Static dataset with periodic updates
- **Origin**: World Bank ESMAP REZoning, extended by KanORS-EMR

### Atlite (ERA5 and SARAH reanalysis)

- **Content**: Weather-dependent renewable generation time series, converted from ERA5 reanalysis (wind) and CM SAF SARAH satellite irradiance (solar) using the `atlite` library
- **Coverage**: Hourly capacity factors (8760 values) per 50x50 km grid cell, for solar PV, onshore wind and offshore wind
- **Weather years**: 2010, 2013, 2016 and 2019, spaced to sample distinct circulation conditions. 2013 is the default where a single year is required
- **Usage**: Technology-specific capacity factors and profiles, aggregated to clusters and timeslices
- **Update frequency**: Historical weather data
- **Conversion method**: [Weather to Capacity Factors](../methods/weather-to-capacity-factors.md)

!!! note
    Profiles for other weather years exist to support research and sensitivity work. They are not part of standard model builds and should not be assumed interchangeable with the four years above.

### GEM Solar and Wind Power Trackers

- **Content**: Unit-level existing and planned solar PV, onshore wind and offshore wind installations with coordinates, capacity and status
- **Coverage**: Global
- **Usage**: Each unit is mapped to a renewable resource grid cell, which places existing renewable capacity in the correct cluster and deducts it from that cell's remaining greenfield potential
- **Update frequency**: Quarterly

## Network Topology and Spatial Allocation

### OpenStreetMap

- **Content**: Transmission substations and lines, with voltage, circuits and geometry
- **Coverage**: Global, extracted per country
- **Usage**: The network in grid models — buses, lines, thermal ratings and line lengths. Substation names are recovered from OSM so model nodes carry the operator's own naming
- **Update frequency**: Continuous upstream; extracted per build

### Natural Earth

- **Content**: Country boundaries and coastlines with lakes
- **Coverage**: Global, 1:10m
- **Usage**: Land masks for renewable cluster validation, onshore/offshore separation, and country clipping of spatial data
- **Update frequency**: Periodic

### World Cities

- **Content**: Coordinates and population of cities worldwide
- **Coverage**: Global
- **Usage**: Population-weighted allocation of demand to buses, connection distances from resource clusters to demand centres, and fallback naming of network nodes
- **Update frequency**: Periodic

### Hotmaps Industrial Database

- **Content**: Site-level industrial facilities with subsector, production and fuel demand
- **Coverage**: European Union
- **Usage**: Distribution of industrial electricity demand across buses in European models
- **Update frequency**: Static, community-maintained

### GEM Industry Trackers

- **Content**: Facility coordinates and capacities from the Global Iron and Steel Tracker, Global Chemicals Inventory, Global Iron Ore Mines Tracker and Global Coal Mine Tracker
- **Coverage**: Global
- **Usage**: Outside Europe, these facilities carry the spatial distribution of industrial electricity demand across buses. IEA sub-sector magnitudes are placed on facility locations; the residual falls back to the population key
- **Update frequency**: Quarterly to semi-annual

### PeeringDB

- **Content**: Geolocated interconnection facilities
- **Coverage**: Global; density varies by region
- **Usage**: Scoring of candidate buses for data-centre siting. Grid models only
- **Update frequency**: Live API, snapshotted per build
- **Licence**: CC-BY 4.0

## Technology Costs and Finance

### IEA Global Energy and Climate Model and World Energy Outlook

- **Content**: Regionally differentiated overnight capital costs, fixed O&M, efficiencies and construction times for power generation technologies; scenario projections
- **Coverage**: Major world regions, multiple time points
- **Usage**: Regional absolute cost levels for the reference technology dataset, and scenario benchmarking
- **Update frequency**: Annual

### NREL Annual Technology Baseline

- **Content**: Technology cost projections under Conservative, Moderate and Advanced trajectories
- **Coverage**: United States, annual to 2050
- **Usage**: High and low cost spreads applied as multipliers to regional cost levels; sole source for utility-scale battery storage costs
- **Update frequency**: Annual

### IRENA Renewable Power Generation Costs

- **Content**: Observed installed costs and LCOE for renewable technologies
- **Coverage**: Global, by technology and region
- **Usage**: Cross-check and calibration of renewable cost assumptions against outturn data
- **Update frequency**: Annual

### Damodaran Country Risk Premia

- **Content**: Equity risk premia and cost of capital components by country
- **Coverage**: Global
- **Usage**: Country-specific weighted average cost of capital, so financing conditions vary across the model library rather than being assumed uniform
- **Update frequency**: Annual

## Scenario Drivers

### IPCC AR6 Scenario Database

- **Content**: Harmonised scenario pathways for energy demand, supply and emissions
- **Coverage**: Country (ISO3) and ten-region (R10) resolutions
- **Usage**: Demand trajectories, activity drivers and carbon price pathways for future periods
- **Update frequency**: Periodic, with IPCC assessment cycles

### NGFS Scenarios

- **Content**: Network for Greening the Financial System climate scenario pathways
- **Coverage**: Global and regional
- **Usage**: Alternative scenario framing alongside AR6
- **Update frequency**: Periodic

## Hourly Profiles and Timeslices

### ERA5-Derived Electricity Load

- **Content**: Modelled hourly electricity load driven by reanalysis temperature
- **Coverage**: Global, country-level, 8760 hours
- **Usage**: Primary demand shape where measured data is unavailable, and the basis for timeslice construction
- **Update frequency**: Available for multiple weather years

### ENTSO-E Transparency Platform

- **Content**: Measured hourly load and cross-border flows
- **Coverage**: European countries and bidding zones
- **Usage**: Validation of modelled load shapes and European demand profiles
- **Update frequency**: Continuous, with historical archives

### China Provincial Load Data

- **Content**: Measured hourly electricity load by province
- **Coverage**: China, 31 provinces
- **Usage**: Replaces the modelled profile for China, where measured data materially improves the demand shape
- **Update frequency**: Static historical series

### Country Time Zones

- **Content**: Time zone offsets by country
- **Coverage**: Global
- **Usage**: Alignment of UTC-timestamped reanalysis demand with local-time supply profiles, so demand and generation peaks are correctly phased
- **Update frequency**: Static

## Optional Modules { #optional-modules }

The two modules below are **not part of a standard VerveStacks build**. Each is enabled explicitly, brings its own data dependencies, and adds processes and commodities to the model only when requested.

### Steel { #optional-steel }

!!! note "Important"
    **Optional addition.** The steel module is opt-in and is not included unless the build is run with steel enabled. Standard models represent iron and steel through aggregate industrial energy demand rather than route-resolved production.

**Global Iron and Steel Tracker (GEM)**

:   Plant-level and unit-level steel capacity by production route (BF-BOF, EAF, DRI) with coordinates, status and start year. Gives the existing steel plant stock by route and vintage, and its spatial placement.

    *Coverage: global. Update frequency: semi-annual*

**Iron Unit and Met Coal / Iron Ore Consumption Data (GEM)**

:   Iron unit flows and consumption of metallurgical coal and iron ore by the steel industry. Closes the material balances for the production routes.

    *Coverage: global. Update frequency: semi-annual*

**Steel market projections**

:   Historical and projected steel demand by country and region. Supplies the steel service demand trajectories.

### CO2 Capture, Transport and Storage { #optional-ccs }

!!! note "Important"
    **Optional addition.** The CCS module is opt-in. It makes CO2 a grid-routed commodity — emitters capture at network buses, pipelines carry CO2 to geological sinks, and sinks inject under capacity and build-rate limits. None of this appears in a standard build, and the module requires a curated grid.

#### Storage capacity and injection rates

**OGCI CO2 Storage Resource Catalogue (Cycle 5)**

:   Site-level global storage capacity assessments with coordinates, formation type, basin and discovery status. The capacity spine of the dataset.

**Gidden et al. (2025), Prudent Planetary Limit for Geologic Carbon Storage**

:   Country-level technical, suitability-screened and infrastructure-overlapped potential, on and offshore, with a global raster of sedimentary basin footprints. Used for quality tiering, capacity gap-fill and sink geometry.

**Smith, Hampson and Krevor (2024), Pressure-Limited Global Storage Analysis**

:   Global basin skeleton and published physical maxima, used as a calibration anchor and for validation. Proprietary basin parameters are re-derived from open sources.

**CO2BLOCK (De Simone and Krevor, 2021)**

:   Analytical basin-scale pressure-buildup model, run with open parameters to derive pressure-limited injection-rate ceilings per basin.

**Fan et al. (2025), China Fine-Grid Storage Dataset**

:   Gridded storage potential and explicit injection-rate capacity for China. Used as an explicit override.

**CO2StoP (EU JRC), NETL NatCarb, OGIM**

:   European storage-unit reservoir properties; United States saline formation polygons and grids as a cross-check; global oil and gas field geometries for depleted-field proxies and basin areas.

#### Deployment ceilings

**IEA CCUS Projects Database**

:   Announced and operating CCUS projects with capacity, status and operation year. Anchors the near-term point of per-country deployment ceilings.

**Zhang, Jackson and Krevor (2024), CCS Deployment Growth Model**

:   Monte Carlo logistic-growth fits of storage deployment by country and scenario, calibrating the build-rate ramp.

**Kazlou, Cherp and Jewell (2024), CCS Feasibility and Growth Analogs**

:   Historical CCS project attrition and technology-analog growth ladders, setting the growth phase of deployment ceilings.

**Gütschow et al. (2021), Country-Resolved SSP Emission Pathways**

:   Downscaled SSP scenarios for all countries, projecting the capturable-emissions asymptotes of the deployment ceilings.

#### Emitters and transport

**GEM Steel, Cement and Power Plant Trackers**

:   Plant coordinates and capacities for the capturable-emitter side of source-sink matching, with route-resolved emission factors.

**Transport and storage cost literature**

:   Pipeline engineering economics, diameter tiers and regional cost factors; storage unit costs; and shipping chains where pipelines are not viable. A pessimistic cost variant additionally accounts for active pressure management and first-of-a-kind cost overruns.

**Marine Regions EEZ and Natural Earth coastline**

:   Offshore jurisdiction and coastline geometry for routing and onshore/offshore classification.

!!! note
    Detailed data vintage information and update schedules are maintained in model metadata.

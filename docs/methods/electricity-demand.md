# Electricity Demand

**How much electricity, when, and where**

<figure class="vs-film" markdown="0">
  <video controls preload="none" playsinline poster="../../_static/films/deu_electricity_demand.jpg">
    <source src="../../_static/films/deu_electricity_demand.mp4" type="video/mp4">
  </video>
  <figcaption><strong>Watch first: Germany's Electricity Demand</strong> (1:55, narrated). Generated from a real build of the German model; every number on screen traces to a file. The sections below follow the film in the same order, with the rules and file names behind each step. Also: <a href="../../films/v/demand_DEU.html">interactive version</a> · <a href="../../films/v/demand_IND.html">India</a> · <a href="../../films/">all films</a>.</figcaption>
</figure>

Demand in a VerveStacks model is built in five steps:

1.  **Level**: what the country used in the base year.
2.  **Growth**: where that goes by 2050, along published scenario pathways.
3.  **Sectors**: the total split into industry, buildings and transport.
4.  **Shape**: an hourly profile for each sector.
5.  **Place**: each sector's demand put on grid nodes.

The result is demand for every sector, at every node, in every time slice, to 2050.

## 1. Level

The starting point is the country's electricity demand in the base year, 2022, from Ember's open electricity data.

| Country | Demand in 2022 (TWh) |
|---------|----------------------|
| Germany | 540                  |
| India   | 1,803                |

## 2. Growth

Growth follows the scenario database of the IPCC Sixth Assessment Report (AR6, Working Group III), using the ten-region (R10) results. For each region and each climate category, VerveStacks takes the **median across vetted scenarios** of electricity demand relative to 2020, in five-year steps to 2050, and applies that index to the country's own base-year level.

Five categories are carried, each as a ready-made scenario:

| Category | Meaning                                               | Role        |
|----------|------------------------------------------------|---------------|
| C1       | Warming limited to 1.5°C with no or limited overshoot | High demand |
| C2       | Warming limited to 1.5°C after a high overshoot       |             |
| C3       | Warming limited to 2°C (above 67% likelihood)         |             |
| C4       | Warming limited to 2°C (above 50% likelihood)         | Base        |
| C7       | Warming likely above 3°C                              |             |

More ambitious pathways electrify more, so demand is higher in C1 than in C4.

| Country                  | 2022  | 2050, base (C4) | 2050, high (C1) |
|--------------------------|-------|-----------------|-----------------|
| Germany (region: Europe) | 540   | 934             | 1,042           |
| India (region: India+)   | 1,803 | 5,156           | 9,483           |

*Demand in 2050 (TWh)*

A country inherits the growth rate of its region. Germany grows like Europe as a whole; a user with a national projection can replace the index in the scenario file.

## 3. Sectors

The same scenario database gives the share of electricity used by industry, by residential and commercial buildings, and by transport, for each region, category and year. The model carries four electricity demands:

| Model commodity     | Content                                                        |
|----------------------|--------------------------------------------------|
| `elc_industry`      | Industry                                                       |
| `elc_buildings`     | Residential and commercial buildings                           |
| `elc_transport`     | Transport other than road, held at its base-year level         |
| `elc_roadtransport` | Road vehicles. All growth in transport electricity lands here. |

**Hydrogen** is taken separately. The scenarios give electricity used for hydrogen as a share of total electricity; that amount is added as its own demand.

**Heat** from combined heat and power plants is a demand of its own, placed at the nodes where those plants stand, and grows with the scenarios' heat index.

## 4. Shape

### The hourly curve

Each country has one national hourly load curve for a full year. The default is a curve built from ERA5 weather data, which exists for every country. Where a better national source is available it replaces the default.

### Taking the curve apart

Sector-level hourly data does not exist for most countries, so the national curve is split by rule. Every hour of the curve is written as four parts:

```text
load(hour) = annual average
           + seasonal swing   (monthly average − annual average)
           + daily swing      (daily average − monthly average)
           + hourly swing     (hour − daily average)
```

| Sector      | What it takes                                                                                                                                                                       |
|-----------------|-------------------------------------------------------|
| Industry    | Its share of the annual average, and little of the swings: 1% of its share of the seasonal swing, and 10% of its share of the daily and hourly swings. Industry runs close to flat. |
| Commercial  | Its share of the average and of what is left of each swing, raised through the working day: the factor climbs from 1.0 at 06:00 to 1.5 at 14:00 and back to 1.0 at 22:00.           |
| Residential | The remainder. Residential load therefore carries the evening and winter peaks.                                                                                                     |
| Buildings   | Commercial plus residential. This is the shape the model uses for `elc_buildings`.                                                                                                  |

The three shapes add back to the national curve in every hour.

### Road transport

Road vehicles get a fixed daily profile with morning and evening commuter peaks (sheet `loadshape_roadtransport` in `VS_mappings.xlsx`). As road transport grows, the national shape shifts toward this profile.

### Into time slices

The model does not run on 8,760 hours. Each sector's hourly shape is averaged into the model's time slices; see [Stress-Based Timeslice Design](stress-timeslices.md).

## 5. Place

National demand is put on grid nodes with two keys:

-   **Buildings and transport follow population.** Cities are assigned to nearby nodes.
-   **Industry follows industrial sites.** Steel, cement and chemical plants and mines are assigned to their nearest nodes; the rest of industry follows population.

| Node                | Share of industry | Share of population | Design  |
|---------------------|-------------------|---------------------|---------|
| Düsseldorf, Germany | 21%               | 6%                  | `kan20` |
| Jharsuguda, India   | 4.2%              | 0.6%                | `kan50` |

*Where the two keys differ most*

The method is described in [demand allocation to grid nodes](grid-representation.md#demand-allocation-to-grid-nodes).

## Where it lives

| File                                               | Role                                                                      |
|--------------------------------|----------------------------------------|
| `scenario_drivers/ar6_r10_scenario_drivers.csv`    | Regional medians: growth index, sector shares, hydrogen share, heat index |
| `create_ar6_r10_scenario.py`                       | Builds the scenario file for a country                                    |
| `Scen_Par-AR6_R10.xlsx`                            | The scenario file in the model                                            |
| `time_slice_processor.py`                          | Splits the hourly curve by sector and averages into time slices           |
| `1_grids/industry_load_key.py`, `grid_modeling.py` | Place demand on nodes                                                     |

## Limits to know about

-   **Regional growth.** A country grows at its region's median rate. This is a starting point, not a national forecast.
-   **Sector shares are separate medians.** The shares of industry, buildings and transport each come from their own median and need not sum to one. The difference is assigned to road transport.
-   **Rule-based shapes.** The sector split of the hourly curve is a rule, not a measurement. Countries with large electric heating or cooling loads will have more seasonal swing in buildings than the rule can distinguish from industry.
-   **One weather year.** The default hourly curve reflects the weather of its year.

!!! info "See also"

    [Grid Representation](grid-representation.md)

    :   How demand is placed on nodes

    [Stress-Based Timeslice Design](stress-timeslices.md)

    :   How hourly shapes become time slices

    [Demands and Prices](demands-and-prices.md)

    :   Fuel and carbon price pathways from the same scenario database


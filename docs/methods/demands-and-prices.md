# Fuel and Carbon Prices

**Fuel and carbon price pathways**

!!! note

    Electricity demand now has its own page: [Electricity Demand](electricity-demand.md). This page covers the prices that come from the same scenario database.

A VerveStacks model needs two kinds of price: what fuels cost at the power plant, and what it costs to emit carbon dioxide. Both have a base-year level and a pathway to 2050. The pathways come from the scenario database of the IPCC Sixth Assessment Report (AR6, Working Group III), as medians across vetted scenarios for each of ten world regions (R10) and five climate categories.

## Fuel prices

### Base-year level

Each country has a low and a high price for gas, coal, oil and bioenergy, as delivered to power plants. The table is a VerveStacks assumption set, kept in the `fuel_prices` sheet of `Assumptions/VS_mappings.xlsx`. Each row carries a note on the market it reflects, for example "TTF gas hub, imported coal via ARA" for Germany. It is not a licensed price series.

**Base-year fuel price ranges by country (USD per MWh of fuel)**

{{ read_csv('_static/data/fuel_prices_sample.csv', keep_default_na=False, dtype='str') }}

### Pathway

Gas, oil, coal and biomass prices move along the AR6 regional medians for the chosen climate category (attributes `Gas price`, `Oil price`, `Coal price` and `Biomass price` in `scenario_drivers/ar6_r10_scenario_drivers.csv`).

## Carbon prices

### Source and treatment

-   **Source**: IPCC AR6 Working Group III scenarios database, R10 regions, v1.1
-   **Scenarios**: vetted model-scenario combinations only
-   **Variable**: `Price|Carbon`
-   **Currency**: constant 2015 US dollars per tonne of CO2
-   **Outliers**: values beyond 2.5 times the interquartile range are removed within each category, region and year
-   **Statistic used**: the median

### Categories

| Category | Meaning                                               | 2050 price            |
|------------|------------------------------------------|-------------------|
| **C1**   | Warming limited to 1.5°C with no or limited overshoot | 526 to 644, by region |
| **C2**   | Warming limited to 1.5°C after a high overshoot       | 285                   |
| **C3**   | Warming limited to 2°C (above 67% likelihood)         | 209                   |
| **C4**   | Warming limited to 2°C (above 50% likelihood)         | 112                   |
| **C7**   | Warming likely above 3°C                              | 0                     |

*2050 median carbon price by category, most regions (USD2015 per tCO2)*

### Over time

| Year | C1  | C2  | C3  | C4  | C7  |
|------|-----|-----|-----|-----|-----|
| 2020 | 7   | 0   | 8   | 0   | 0   |
| 2025 | 182 | 45  | 43  | 22  | 0   |
| 2030 | 242 | 63  | 71  | 44  | 0   |
| 2035 | 339 | 155 | 104 | 52  | 0   |
| 2040 | 410 | 172 | 135 | 76  | 0   |
| 2045 | 494 | 254 | 178 | 95  | 0   |
| 2050 | 635 | 285 | 209 | 112 | 0   |

*Median carbon price, Europe region (USD2015 per tCO2)*

### By region

Regional medians differ mainly in the most ambitious category.

| Region                                           | 2050 price |
|--------------------------------------------------|------------|
| North America                                    | 644        |
| Europe                                           | 635        |
| Africa                                           | 605        |
| Pacific OECD                                     | 604        |
| India+                                           | 592        |
| China+, Latin America, Middle East, Rest of Asia | 582        |
| Reforming Economies                              | 578        |
| Rest of World                                    | 526        |

*2050 median carbon price, category C1 (USD2015 per tCO2)*

A country takes the pathway of its region. The values are in `scenario_drivers/ar6_r10_scenario_drivers.csv` and are written to the model's scenario file by `create_ar6_r10_scenario.py`.

!!! info "See also"

    [Electricity Demand](electricity-demand.md)

    :   Demand level, growth, sectors, shape and placement

    [New Technology Characterization](new-technologies.md)

    :   Technology cost assumptions


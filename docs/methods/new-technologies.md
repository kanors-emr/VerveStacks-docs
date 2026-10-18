# New Technology Characterization

**What the model may build, what it costs, and where it can go**

<figure class="vs-film" markdown="0">
  <video controls preload="none" playsinline poster="../../_static/films/deu_new_technology_costs.jpg">
    <source src="../../_static/films/deu_new_technology_costs.mp4" type="video/mp4">
  </video>
  <figcaption><strong>Watch first: New Technology Costs</strong> (2:08, narrated). Generated from a real build of the German model; every number on screen traces to a file. The sections below follow the film in the same order, with the rules and file names behind each step. Also: <a href="../../films/v/newtech_DEU.html">interactive version</a> · <a href="../../films/v/newtech_IND.html">India</a> · <a href="../../films/">all films</a>.</figcaption>
</figure>

Existing-stock characterization tells the model what is on the ground today. This page covers what can be built tomorrow: the list of options, their cost from now to 2050, the cost of the money to build them, and the nodes where they are offered.

The numbers come from one module, `4technology_characterization/`, which is shared by VerveStacks and the KiNESYS global model.

!!! note

    **Status, October 2026.** The cost table holds everything described here. The country builds read the central reference path from it. The high, low and learning paths, and the country cost of capital, are emitted today for the KiNESYS models and are being brought into the country builds.

## 1. The menu

A country model is offered these new plant types (`CONV_TECH_CATALOG` in `excel_manager.py`):

| Group          | Technologies                                                                                                                                                                                          |
|-----------------|-------------------------------------------------------|
| Power only     | Gas combined cycle, gas turbine, gas with carbon capture; coal subcritical, supercritical, ultra-supercritical and gasification; nuclear, small modular reactor; biomass, biomass with carbon capture |
| Heat and power | Gas combined cycle (extraction), biomass chips (extraction); gas with carbon capture, biomass pellets with carbon capture                                                                             |
| Heat only      | Gas boiler, biomass boiler, electric boiler, large air-source heat pump                                                                                                                               |
| Storage        | Lithium-ion battery, 4-hour and 8-hour                                                                                                                                                                |

Three kinds of new capacity are handled elsewhere:

-   **Solar and wind** are built in resource clusters with their own profiles and connection costs. See [Renewable Energy Characterization](renewable-characterization.md). Their capital costs come from the same cost table.
-   **Hydro** is limited by sites, not by a flat cost. See [Hydro Availability Scenarios](hydro-availability-scenarios.md).
-   **Carbon-capture retrofits** of existing units are created with the existing stock. See [Existing Stock Characterization](existing-stock-characterization.md).

## 2. Many sources, one table

No single source covers every technology, region and year. The module reads each source into a standard table, converts everything to one currency, and assembles one long file, `unified_reference_costs.csv`: 63 technologies, 9 regions, about 19,400 rows.

| Source                                                      | Role                                                                                                                                          |
|-------------------------|-----------------------------------------------|
| IEA World Energy Outlook 2025, power generation assumptions | Regional cost levels, fixed operating cost, efficiency and capacity factor for power-only technologies, in 9 regions                          |
| NREL Annual Technology Baseline 2024 v3                     | The high and low spread around the central path; batteries; small modular reactors; technical lifetimes                                       |
| Danish Energy Agency technology catalogues                  | Combined heat and power, heat-only plants, heat pumps, storage, and carbon capture (June 2026 datasheet for electricity and district heating) |
| IRENA Renewable Power Generation Costs                      | Observed installed costs: the anchors and history for the learning paths                                                                      |
| US EIA Annual Energy Outlook, Lazard                        | Variable operating cost where the main sources give none                                                                                      |
| Damodaran (NYU Stern), World Bank indicators                | Cost of capital (section 5)                                                                                                                   |

***Sources and what each supplies***

**One currency.** Sources report in different price years and currencies. Every value is converted to US dollars of 2022, using the US GDP deflator and, for the Danish catalogues, the European Central Bank's annual euro–dollar rates.

**Every number keeps its source.** `source_versions.csv` records, for each input, the publisher, version, file hash and extraction date. A value in the cost table can be traced to the file it came from.

**Costs are overnight.** Interest during construction is not included; construction time is carried as its own parameter.

## 3. Not one future

Nobody knows what a plant will cost in 2050, so each technology carries a range. There are two families of paths.

**The reference family** (`capex_mid`, `capex_hi`, `capex_lo`) follows institutional projections. The central path is the IEA regional value. High and low come from the ratio of NREL's Conservative and Advanced cases to its Moderate case:

``` text
capex_hi(region, year) = capex_mid(region, year) × ATB Conservative / ATB Moderate
capex_lo(region, year) = capex_mid(region, year) × ATB Advanced     / ATB Moderate
```

Technologies with no NREL counterpart have a central path only.

**The learning family** (`capex_l0`, `capex_l1`, `capex_l2`) exists for solar, onshore wind, offshore wind and batteries. Cost falls by a fixed percentage with every doubling of what the world has built (Wright's law). The three paths are slow, central and fast learning, anchored on observed costs. Regions sit at a premium above a global frontier.

| Technology and family | Low / fast | Central | High / slow |
|-----------------------|------------|---------|-------------|
| Nuclear, reference    | 2,401      | 4,234   | 7,770       |
| Solar, learning       | 303        | 467     | 616         |

***Examples, European Union, capital cost in 2050 (USD 2022 per kW)***

Learning is an input, not a result. The model does not lower costs because it builds more: learning depends on world deployment, which one country's model does not decide.

## 4. Same plant, different place

Costs come in the nine regions of the IEA dataset: United States, European Union, Japan, Russia, China, India, Middle East, Africa and Brazil.

| Region               | Capital cost |
|----------------------|--------------|
| China                | 496          |
| India                | 620          |
| European Union       | 885          |
| United States, Japan | 974          |

***Gas combined cycle built in 2030, central path (USD 2022 per kW)***

Each country takes the costs of its region, through the `ep_regionmap` sheet. The labels are the IEA's and are broader than they sound: "United States" also serves Canada, Mexico and Australia; "Brazil" serves Latin America.

Technologies from the Danish catalogues are priced for Denmark. They are moved to other regions with the regional ratio of a comparable IEA technology. In the reference family, battery costs are the same in every region.

## 5. The cost of money

A plant is paid for over decades, so the rate at which money is borrowed matters as much as the price. The module builds a cost of capital for each country and technology (`source_tables/std_wacc.csv`):

``` text
cost of capital = cost for the industry, worldwide   (Damodaran, global industry file)
                + premium for the country            (Damodaran, country risk premiums)
```

Rates are real: the nominal rate less 2.3 points of inflation.

| Country | Gas plant | Coal plant |
|---------|-----------|------------|
| Germany | 3.5%      | 6.2%       |
| India   | 5.4%      | 9.5%       |

***Real cost of capital***

Coal plants carry the rate of the coal industry, not of power generation, on the view that the risk being priced is exposure to the fuel. This is an interpretation, and it adds 2.7 to 4.1 points over gas depending on the country.

An alternative file takes renewable rates from IRENA's survey of financing costs.

The rate enters the model as a technology-specific discount rate, separate from the capital cost.

## 6. Where it can go

A new thermal plant is not offered everywhere. It is offered at every node that already hosts a coal, gas or nuclear unit above the country's size threshold for that fuel: places where fuel supply, cooling and grid connection exist.

| Design          | Nodes open to new thermal plants | Of  |
|-----------------|----------------------------------|-----|
| Germany `kan20` | 27                               | 45  |
| India `kan50`   | 40                               | 50  |

The rule is not fuel-specific. A node that qualifies is offered every thermal option. Batteries are offered at every node that hosts a unit of any fuel above its threshold. See [Grid Representation](grid-representation.md).

## Lifetime and construction time

These are constants by technology.

| Technology                      | Lifetime (years) | Construction (years) |
|---------------------------------|------------------|----------------------|
| Gas combined cycle              | 30               | 3                    |
| Gas turbine                     | 30               | 2                    |
| Gas with carbon capture         | 30               | 4                    |
| Coal, all types                 | 40               | 4                    |
| Nuclear                         | 60               | 7                    |
| Small modular reactor           | 40               | 3                    |
| Biomass                         | 45               | 3                    |
| Biomass with carbon capture     | 30               | 3                    |
| Heat and power plants           | 25               | 2 to 5               |
| Heat-only plants and heat pumps | 20 to 25         | 1 to 3               |
| Batteries                       | 20               | 1                    |

## The cost table

`unified_reference_costs.csv` has one row per technology, region, year and parameter.

| Column          | Description                                                                                                                                                                                                                               |
|---------------|---------------------------------------------------------|
| `variable`      | Technology, for example `en_gas_ccgt`, `en_battery_4h`                                                                                                                                                                                    |
| `region`        | One of nine, for example `ieapg_european_union`                                                                                                                                                                                           |
| `year`          | The source's own years between 2020 and 2050. Values are not interpolated; the model interpolates between its own milestone years.                                                                                                        |
| `parameter`     | Capital cost paths (`capex_mid`, `_hi`, `_lo`, `_l0`, `_l1`, `_l2`), `fixed_om`, `variable_om`, `efficiency`, `heat_efficiency`, the heat-and-power coefficients, `capture_rate`, `roundtrip_efficiency`, `lifetime`, `construction_time` |
| `value`, `unit` | The number and its unit, for example `USD2022/kW`                                                                                                                                                                                         |

***Columns***

| File                           | Role                                                                     |
|--------------------------------|----------------------------------------|
| `extractors/`                  | One reader per source, each writing a standard table to `source_tables/` |
| `compile_unified_reference.py` | Assembles the cost table from the standard tables                        |
| `learning_curves.py`           | Builds the learning family                                               |
| `source_versions.csv`          | Version, hash and extraction date of every input                         |
| `source_tables/std_wacc.csv`   | Cost of capital by country and technology                                |
| `excel_manager.py`             | Reads the cost table into each country model                             |

***Files***

## Limits to know about

-   **The country builds use the central reference path.** Scenario files for the other paths exist for the KiNESYS models and are being connected to the country builds.
-   **Cost of capital is not yet read by the country builds.**
-   **Region labels are coarse.** Nine regions cover the world.
-   **Source terms.** The cost table is derived from published sources, some of which restrict redistribution of their data. The table is used inside the models; it is not offered as a dataset.

!!! info "See also"

    [Existing Stock Characterization](existing-stock-characterization.md)

    :   Costs and performance of plants that already exist

    [Grid Representation](grid-representation.md)

    :   Nodes, and where new plants are offered


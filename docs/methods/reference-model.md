# The Reference Model

**What one VerveStacks country model contains, and what drives it to 2050**

Every country in the library is built to the same template. This page is the map of that template: the reference energy system (what flows from where to where), and the drivers that move it through time. The pages that follow under *Under the Hood* describe how each part is built.

## Reference energy system

A VerveStacks model is a power-sector TIMES model with a base year of 2022 and a horizon to 2050. In the grid version, everything below is repeated at each grid node; in the single-region version there is one node.

<div class="vs-flow vs-res" markdown="0">
  <div class="vs-flow__col">
    <div class="vs-flow__head">Primary supply</div>
    <ul>
      <li>Gas, coal, oil, bioenergy: price paths by country</li>
      <li>Nuclear</li>
      <li>Wind and solar: one resource per cluster, with its own profile and potential</li>
      <li>Hydro: availability by season, with dry and wet years</li>
      <li>Imports and exports at border nodes, given</li>
    </ul>
  </div>
  <div class="vs-flow__arrow" aria-hidden="true">→</div>
  <div class="vs-flow__col">
    <div class="vs-flow__head">Generation and storage</div>
    <ul>
      <li>Existing plants: large units one by one, the rest pooled by fuel, size and node</li>
      <li>Combined heat and power units, with heat-to-power ratios</li>
      <li>Carbon-capture retrofits on large coal and gas units</li>
      <li>New plants: gas, coal, nuclear and biomass types, with and without capture, offered at nodes that already host large thermal units</li>
      <li>New wind and solar in each cluster, with connection cost and losses to its node</li>
      <li>Batteries</li>
    </ul>
  </div>
  <div class="vs-flow__arrow" aria-hidden="true">→</div>
  <div class="vs-flow__col vs-flow__col--accent">
    <div class="vs-flow__head">Grid</div>
    <ul>
      <li>Electricity at each node: <code>e_&lt;node&gt;</code></li>
      <li>Corridors between nodes: <code>g_&lt;node&gt;-&lt;node&gt;</code>, with capacity, length and losses</li>
      <li>Cross-border links at border nodes</li>
    </ul>
  </div>
  <div class="vs-flow__arrow" aria-hidden="true">→</div>
  <div class="vs-flow__col">
    <div class="vs-flow__head">Demand at each node</div>
    <ul>
      <li><code>elc_industry</code></li>
      <li><code>elc_buildings</code></li>
      <li><code>elc_transport</code></li>
      <li><code>elc_roadtransport</code></li>
      <li>Electricity for hydrogen</li>
      <li>Heat from combined heat and power, at the nodes where those plants stand</li>
    </ul>
  </div>
</div>

<div class="vs-res__band" markdown="0">
  <strong>CO₂.</strong> Every fossil process emits. In the optional carbon-capture module, captured CO₂ is piped from its node to the storage sites listed with the grid design, each with a capacity and a cost; see <a href="../../data-assumptions/sources/#optional-ccs">CO₂ capture, transport and storage</a>.
</div>

Every flow is in time slices, built from each country's own hourly data as described in [Stress-Based Timeslice Design](stress-timeslices.md), with several resolutions shipped per country.

| Part | Built on | Page |
|---|---|---|
| Existing plants | Global Energy Monitor, filled to IRENA and Ember | [Existing Stock Characterization](existing-stock-characterization.md) |
| Demand | Ember, IPCC AR6 | [Electricity Demand](electricity-demand.md) |
| Wind and solar | REZoning, ERA5 via Atlite | [Weather to Capacity Factors](weather-to-capacity-factors.md), [Renewable Characterization](renewable-characterization.md) |
| Grid | OpenStreetMap | [Grid Representation](grid-representation.md) |
| New plants and storage | IEA WEO, NREL ATB, Danish Energy Agency and others | [New Technologies](new-technologies.md) |
| Hydro availability | Ember monthly generation | [Hydro Availability Scenarios](hydro-availability-scenarios.md) |
| Fuel and carbon prices | VerveStacks assumption set, IPCC AR6 | [Fuel and Carbon Prices](demands-and-prices.md) |

## Drivers and projections

The reference model moves to 2050 along a small set of exogenous drivers. Each one has a published source, sits in a scenario file a user can open, and can be replaced.

| Driver | Default | Source | Where to change it |
|---|---|---|---|
| Electricity demand level | Reported base-year demand (Germany: 540 TWh in 2022) | Ember | Scenario file |
| Demand growth to 2050 | Median of vetted AR6 scenarios for the country's region, in the chosen climate category (Germany 2050: 934 TWh in C4, 1,042 TWh in C1) | IPCC AR6, R10 regions | `Scen_Par-AR6_R10.xlsx` |
| Sector shares | Industry, buildings and transport shares from the same medians; the remainder to road transport | IPCC AR6 | `Scen_Par-AR6_R10.xlsx` |
| Hydrogen | Electricity for hydrogen as a share of total electricity | IPCC AR6 | `Scen_Par-AR6_R10.xlsx` |
| Heat from combined heat and power | Base-year heat grown with the scenario heat index | IEA balances, IPCC AR6 | `Scen_Par-AR6_R10.xlsx` |
| Fuel prices | Country low and high base-year price, moved along AR6 regional medians | VerveStacks assumption set, IPCC AR6 | `fuel_prices` in `VS_mappings.xlsx`; scenario file |
| Carbon price | AR6 regional median for the chosen category (Europe 2050: 635 in C1, 112 in C4, USD2015/t) | IPCC AR6 | `Scen_Par-AR6_R10.xlsx` |
| Technology costs | Reference path; high, low and learning paths in the cost table | IEA WEO, NREL ATB, others | [New Technologies](new-technologies.md) |
| Hydro availability | Median year; dry (P10) and wet (P90) variants | Ember monthly | Time-slice scenario file |
| Cross-border trade | Given at each border node | | Scenario file |
| National renewable targets | Carried as a reference table, not imposed | Ember targets compilation | `re_targets` sheet in `Scen_Base_VS.xlsx` |

Five AR6 climate categories are carried in the scenario file: C1 and C2 (1.5°C), C3 and C4 (2°C) and C7 (above 3°C). Choosing one, in a single input cell, moves demand growth, sector shares, fuel prices and the carbon price together, so the drivers stay internally consistent.

A country inherits its region's growth rate. That is a starting point, not a national forecast; a user with a national projection replaces the index in the scenario file and keeps everything else.

## What the reference model is not

- **Power sector only.** Industry, buildings and transport appear as electricity demands, not as their own technology choices. Multi-sector models are in development.
- **Trade is given, not optimised**, in a single-country model. Multi-country models join the national grids, so trade between them is modelled.
- **A planning model.** It chooses capacity and operation over time slices, not hour by hour; see [Limitations & Known Gaps](../data-assumptions/limitations.md).

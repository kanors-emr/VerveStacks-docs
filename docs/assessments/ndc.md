# NDCs and National Targets

**Testing a country's climate pledge and renewable targets in its own power system**

## What is in the model today

**The country's published renewable targets.** Every build carries a table of the country's renewable targets, from Ember's compilation of national targets: target year, technology, metric (capacity, generation or share), value, and the source document with its publisher, date and link. It is in the `re_targets` sheet of `SuppXLS/Scen_Base_VS.xlsx`. For Germany it includes:

| Target year | Technology | Target | Source |
|---|---|---|---|
| 2030 | Solar | 215 GW | Easter Package (in law), 2022 |
| 2030 | Onshore wind | 115 GW | Easter Package (in law), 2022 |
| 2030 | Offshore wind | 30 GW | Updated NECP, 2024 (30.5 GW in the Easter Package) |
| 2030 | Renewables | 80% of consumption | Easter Package (in law), 2022 |

The table is a reference, not a constraint: the reference model is free to fall short of the targets or exceed them, which is what lets an assessment measure the gap.

**Carbon-price pathways.** Five IPCC AR6 climate categories are carried in the scenario file, from 1.5°C (C1) to above 3°C (C7), each with its regional carbon-price path and consistent demand growth; one input cell chooses between them. See [Fuel and Carbon Prices](../methods/demands-and-prices.md).

**A base year tied to statistics.** Base-year capacity matches official statistics by construction, and fuel use is checked against UN statistics, so base-year emissions start from the right place. See [Calibration & Checks](../data-assumptions/calibration.md).

**Plants by name.** Large units are in the model one by one, with their location and age, so a commitment about specific plants (a coal phase-out date, a nuclear life extension) can be applied to those plants.

## What the user sets

- **Which targets to impose, and how.** Capacity targets become bounds on installed capacity by year (`CAP_BND`); share targets become a user constraint on generation shares. Unconditional and conditional NDC targets are naturally two scenarios.
- **The power sector's share of an economy-wide pledge.** Most NDCs are economy-wide. The power sector's part of the target is a judgement; once made, it becomes a cap on power-sector CO₂ by year (`COM_BNDNET` on the emission commodity).
- **Plant-specific commitments**, such as retirement dates for named units.

## What it can show

- The cost of meeting the targets, against the reference.
- Whether capacity targets fit the country's land, weather and grid: where new wind and solar would go, which corridors would be loaded, and which nodes would carry the burden.
- The carbon price implied by an emissions cap (its shadow price), to compare with the AR6 pathways.
- Whether meeting the renewable targets is enough to meet the emissions target, or the other way round.

## Not built yet

- NDC emission targets are not imported automatically; the user enters them.
- The models cover the power sector. Pledges that rely on other sectors need multi-sector models, which are in development.

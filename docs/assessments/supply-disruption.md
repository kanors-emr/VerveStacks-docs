# Supply Disruption

**A fuel becomes scarce or expensive, a plant goes offline, or the rains fail**

A disruption such as a conflict that closes a major shipping route shows up in a power model in a few distinct ways. Each has a natural lever in a VerveStacks model.

## What is in the model today

| Disruption | Lever already in the model |
|---|---|
| Fuel price shock (gas, oil, coal) | Base-year low and high prices for each fuel by country, and AR6 price pathways to 2050, in the scenario files. See [Fuel and Carbon Prices](../methods/demands-and-prices.md). |
| Loss of specific plants | Large units are in the model one by one, by name, location and age, so a named plant can be taken out from a given year. |
| Drought | Hydro availability options include a median year and dry (P10) and wet (P90) variants. See [Hydro Availability Scenarios](../methods/hydro-availability-scenarios.md). |
| Loss of imports | Cross-border trade is given at each border node in a country model, so it can be cut or reduced at the border where it happens. |
| Loss of a grid corridor | Each corridor between nodes is its own process, with its own capacity. |

## What the user sets

- **The size and timing of the shock**: a price multiplier for one fuel in a year or a run of years; a cap on how much of a fuel can be used (`ACT_BND` or a bound on the fuel commodity); the plants or corridors that go offline and when.
- **Whether the shock is expected.** A shock written into a scenario from the start is one the model plans for. To see the cost of being surprised, fix the reference model's investments and re-run with the shock.

## What it can show

- Which plants and fuels take up the slack, and at which nodes.
- The cost of the disruption, and how much of it a different mix (more storage, more interconnection, more renewables) would have avoided.
- How a disruption interacts with a climate scenario: a gas shock under a C4 carbon price is a different event from the same shock under C1.

## Not built yet

- The reference model is a planning model over time slices. It shows how plans and costs change, not how the system behaves hour by hour in the first days of a crisis.
- Fuel supply chains (LNG terminals, pipelines, refineries) are not represented in the power-sector models; a fuel shock enters as a price or a quantity at the power plant.

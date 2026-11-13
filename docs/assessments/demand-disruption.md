# Demand Disruption

**A large new load arrives: data centres as the example**

## What is in the model today

**Candidate nodes for data centres.** In grid models, every demand-carrying node is scored for how likely it is to attract data centres. The score uses PeeringDB, a public registry of interconnection facilities, as a spatial prior: each facility is snapped to its nearest demand node, and a node's score is the sum of the facilities' interconnection counts. The five highest-scoring nodes are pre-selected; the rest are listed so a user can swap them in. Where PeeringDB coverage is thin, the remaining slots are filled from the nodes with the largest demand share. The table is written to `SubRES_Data_Centers_Trans.xlsx` in each grid build.

**Demand placed where it is.** Existing demand is already on the grid by population and by industrial site (see [Electricity Demand](../methods/electricity-demand.md)), so a new load lands on a network that already carries a realistic pattern.

**Demand variants.** The AR6 climate categories in the scenario file carry different demand growth (Germany 2050: 934 TWh in C4, 1,042 TWh in C1), which bracket the background growth a new load is added to.

## What the user sets

- **How much, and how fast.** The national data-centre load, in GW by year, is a user input. The pipeline ranks places; it does not forecast the industry.
- **Where.** Accept the pre-selected nodes or swap in others from the ranked list (the `include` column).
- **How it runs.** Hours of operation and any flexibility the load offers.

## What it can show

- Which corridors and nodes come under strain.
- Whether the load is met by new local generation, by imports along existing corridors, or by keeping older plants running longer.
- The cost and emissions of the extra demand, against the reference.
- How the answer changes with location: the same gigawatts at a well-connected node and at a weak one.

## Not built yet

- No national data-centre growth path is supplied by default.
- The PeeringDB score ranks nodes; it is not an inventory of existing data centres, and coverage varies by country.
- The scoring is in grid models only.

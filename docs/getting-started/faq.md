# FAQ

**Frequently asked questions about VerveStacks**

## General Questions

**What is VerveStacks?**

:   VerveStacks is a global library of ready-to-use, fully calibrated national energy system models for more than 100 countries, to make advanced energy transition analysis accessible to everyone. Each VerveStacks model incorporates detailed representations the existing energy fleet, large-scale renewables, hydrogen, EV adoption, and sector electrification—capturing both hourly and regional variations. Unlike empty model frameworks, VerveStacks provides multiple pre-built structural variants per country, available in model-agnostic and Veda-TIMES formats, with results for scenarios aligned to climate targets. Researchers, policymakers, and students can immediately explore policy-relevant questions and compare modeling structures without investing months in model development.

**Why is the development pipeline closed?**

:   The proprietary VerveStacks model-generation pipeline is not publicly available to ensure the project’s sustainability and to create a new class of model users, rather than just model builders. The pipeline represents years of unfunded, expert development, and releasing it would risk returning modeling practice to its old cycle—where most effort is spent rebuilding models from scratch, rather than using and learning from them. By keeping the pipeline closed but releasing curated sets of high-quality model variants for open use, VerveStacks shifts focus to wide, impactful usage and transparency while protecting the resources needed to grow and maintain the project. This approach aims to establish “model usage” as the new norm for energy system analysis—similar to how operating systems made computers widely accessible and useful.

**Do models I build on VerveStacks have to stay open?**

:   No. VerveStacks models are free to use and open to inspect, but what you do with one is yours. A model you modify or extend, the scenarios you add and the results you produce belong to you and can stay private. If you publish results, cite VerveStacks and the model version; if you redistribute a model, document your changes. Permitted uses and the conditions on commercial redistribution are on the License page. See the [License](../reference/license.md) page.

<a id="faq-name-origin"></a>

**Where does the name "VerveStacks" come from?**

:   *Verve* captures the vigor, energy, and passion of modeling done well — a deliberate pun for an energy platform, and the human, exploratory side of the work rather than equations and solver logs. *Stacks* refers to the layered scenario-assumption sets (data, technology, policy, demand, grid, and temporal layers) that get assembled into a model fit for the question. The word came first; the backronym *Versatile Engine for Regional and Varied Energy scenarios* was fitted later. See the [glossary](../reference/glossary.md) for the canonical definition.

**Which countries are supported?**

:   Models can be generated for 100+ countries with sufficient data coverage.

**What data sources are used?**

:   IRENA, EMBER, GEM, REZoning, Atlite, AR6 scenarios, and other global energy datasets.

## Technical Questions

**What modeling framework is used?**

:   Models are generated in VEDA-TIMES format with Excel-based templates.

**How are regions defined?**

:   VerveStacks represents each country as a set of **grid nodes**: real high-voltage substations taken from OpenStreetMap transmission data, not administrative divisions. Power plants, wind and solar clusters, and demand are all attached to these nodes. See [Grid Representation](../methods/grid-representation.md).

**Why does my state / prefecture / province have no electricity demand?**

:   This is by design. Demand is placed on the physical transmission network, at grid nodes, using population and industrial sites as keys. Consequences:

    -   An administrative region whose load is served by a substation just across its border will appear at that substation.
    -   A region with no node of its own has its load carried by the nearest nodes, which may lie outside the region.
    -   How many nodes a country has is a design choice. A coarser design has fewer, larger nodes.

    See [the design intent](../methods/grid-representation.md#demand-allocation-design-intent) and [the method](../methods/grid-representation.md#demand-allocation-pipeline).

**What time resolution is available?**

:   From 1 to 600+ timeslices based on stress-period analysis of hourly data.

**Can I modify the models?**

:   Yes, all model files can be downloaded and customized using standard VEDA tools.

!!! note

    More detailed FAQ entries will be added based on user feedback.


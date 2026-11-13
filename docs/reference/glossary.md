# Glossary

**Key terms and acronyms used in VerveStacks**

## Technical Terms

**Bus (grid node)**

:   A real high-voltage substation kept as a point in the model's network, where generation and demand are attached. Documentation uses *node*; code and file names use *bus*. In the TIMES model the electricity commodity at a node is `e_<node>`. See [Grid Representation](../methods/grid-representation.md).

**Cluster**

:   A group of wind or solar cells around one grid node, treated as one investment option with its own hourly profile. See [Renewable Energy Characterization](../methods/renewable-characterization.md).

**Corridor**

:   All the transmission lines between two nodes, taken together.

**FLO_MARK**

:   A VEDA/TIMES parameter that bounds the share of a commodity's flow that a given process must supply. VerveStacks uses `FLO_MARK~lo = load_share × 0.98` on demand-technology processes so that each node serves its share of demand; see [how demand enters the model](../methods/grid-representation.md#demand-allocation-times-translation).

**LCOE**

:   Levelized Cost of Electricity - the average cost per unit of electricity generated over the lifetime of a technology.

<a id="glossary-load-share"></a>

**Load share**

:   The fraction of national electricity demand attributed to one node. There are two: a population share, used for buildings and transport, and an industry share. See [demand placement](../methods/grid-representation.md#demand-allocation-pipeline).

**NTC**

:   Net Transfer Capacity - the maximum transmission capacity between regions.

**REZ**

:   Renewable Energy Zone - areas with high renewable resource potential.

**Stress Period**

:   Time periods when the energy system experiences operational challenges due to supply-demand imbalances.

**Timeslice**

:   Representative time periods used to aggregate 8760 hourly data into manageable segments for optimization.

**VerveStacks**

:   *Verve* (vigor, energy, passion) + *Stacks* (the layered scenario-assumption sets that an analysis explores — data, technology, policy, demand, grid, and temporal layers). The name came first; the backronym below was fitted afterward. The intent: a stack-based environment that preserves the energy and momentum of modeling while hiding unnecessary complexity — closer in spirit to creative tools than to a solver. See also the FAQ: [Technical Questions](../getting-started/faq.md#faq-name-origin).

## Acronyms

**AR6**

:   IPCC Sixth Assessment Report climate scenarios

**DBSCAN**

:   Density-Based Spatial Clustering of Applications with Noise

**EMBER**

:   Energy and climate think tank providing electricity data

**GEM**

:   Global Energy Monitor - power plant database

**IRENA**

:   International Renewable Energy Agency

**TIMES**

:   The Integrated MARKAL-EFOM System energy modeling framework

**VEDA**

:   Versatile Energy Data Analyst - interface for TIMES models

**VerveStacks (backronym)**

:   Versatile Engine for Regional and Varied Energy scenarios - a post-hoc expansion of "Verve." The acronym explains the letters; the name conveys the philosophy.

!!! note

    Additional terms and definitions to be added as needed.


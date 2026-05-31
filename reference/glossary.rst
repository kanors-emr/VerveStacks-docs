========
Glossary
========

**Key terms and acronyms used in VerveStacks**

Technical Terms
===============

**Bus (grid node)**
  A clustered high-voltage substation that serves as an injection point for generation and demand in the transmission representation. Naming convention in the TIMES model: ``e_<bus_id>`` for the electricity commodity at that node.

**Clustering**
  Spatial aggregation of geographic points into regions using algorithms like Voronoi tessellation or DBSCAN.

**Composite score**
  The ranking metric used by :ref:`the sparsification step <demand-allocation-sparsification>` to decide which buses to retain as demand nodes. Defined per bus as ``load_share × voltage_weight ^ voltage_priority_factor × connectivity_weight ^ connectivity_priority_factor``. Biases selection toward electrically meshed, high-voltage substations rather than purely toward population weight.

**Coverage target**
  The fraction of national electricity demand that the sparsification step is required to retain on kept buses (default ``0.80``). Buses are accepted in descending composite-score order until the cumulative raw **load share** of kept buses crosses this threshold, subject to ``min_nodes`` and ``max_nodes`` guardrails. See :ref:`the sparsification step <demand-allocation-sparsification>`.

**FLO_MARK**
  A VEDA/TIMES parameter that bounds the share of a commodity's flow that a given process must supply. VerveStacks uses ``FLO_MARK~lo = load_share × 0.98`` on demand-technology processes to force each kept bus to serve its designated fraction of the end-use electricity demands; see :ref:`demand-allocation-times-translation`.

**LCOE**
  Levelized Cost of Electricity - the average cost per unit of electricity generated over the lifetime of a technology.

.. _glossary-load-share:

**Load share**
  The fraction of national electricity demand attributed to a single transmission bus. Produced by :ref:`demand-allocation-pipeline`, stored in ``{ISO}_bus_load_share_voronoi.csv`` (or its distance-weighted / synthetic variants), and consumed by ``grid_modeling.py`` to generate TIMES demand artefacts. After sparsification, load shares across kept buses always sum to 1.

**NTC**
  Net Transfer Capacity - the maximum transmission capacity between regions.

**REZ**
  Renewable Energy Zone - areas with high renewable resource potential.

**Sparsification**
  The step that compresses the dense bus-level load-share distribution onto a small, electrically meaningful subset of transmission nodes. Combines a composite importance score (ranking) with a raw demand **coverage target** (stopping rule), then zeros the dropped buses and renormalises the survivors. See :ref:`the sparsification step <demand-allocation-sparsification>`.

**Stress Period**
  Time periods when the energy system experiences operational challenges due to supply-demand imbalances.

**Timeslice**
  Representative time periods used to aggregate 8760 hourly data into manageable segments for optimization.

**VerveStacks**
  *Verve* (vigor, energy, passion) + *Stacks* (the layered scenario-assumption sets that an analysis explores — data, technology, policy, demand, grid, and temporal layers). The name came first; the backronym below was fitted afterward. The intent: a stack-based environment that preserves the energy and momentum of modeling while hiding unnecessary complexity — closer in spirit to creative tools than to a solver. See also the FAQ: :ref:`faq-name-origin`.

**Voltage weight**
  A capacity-based multiplier assigned to each transmission bus from its voltage level (e.g. 380 kV → 10.0, 220 kV → 5.0, 110 kV → 1.0). Used both to weight population during Voronoi allocation and as a factor in the **composite score**. See the table in :ref:`demand-allocation-pipeline`.

Acronyms
========

**AR6**
  IPCC Sixth Assessment Report climate scenarios

**DBSCAN**
  Density-Based Spatial Clustering of Applications with Noise

**EMBER**
  Energy and climate think tank providing electricity data

**GEM**
  Global Energy Monitor - power plant database

**IRENA**
  International Renewable Energy Agency

**TIMES**
  The Integrated MARKAL-EFOM System energy modeling framework

**VEDA**
  Versatile Energy Data Analyst - interface for TIMES models

**VerveStacks (backronym)**
  Versatile Engine for Regional and Varied Energy scenarios - a post-hoc expansion of "Verve." The acronym explains the letters; the name conveys the philosophy.

.. note::
   Additional terms and definitions to be added as needed.

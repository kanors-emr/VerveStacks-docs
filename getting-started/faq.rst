===
FAQ
===

**Frequently asked questions about VerveStacks**

General Questions
=================


**What is VerveStacks?**
  VerveStacks is a global library of ready-to-use, fully calibrated national energy system models for more than 100 countries,  to make advanced energy transition analysis accessible to everyone. Each VerveStacks model incorporates detailed representations the existing energy fleet, large-scale renewables, hydrogen, EV adoption, and sector electrification—capturing both hourly and regional variations. Unlike empty model frameworks, VerveStacks provides multiple pre-built structural variants per country, available in model-agnostic and Veda-TIMES formats, with results for scenarios aligned to climate targets. Researchers, policymakers, and students can immediately explore policy-relevant questions and compare modeling structures without investing months in model development.

**Why is the development pipeline closed?**
  The proprietary VerveStacks model-generation pipeline is not publicly available to ensure the project’s sustainability and to create a new class of model users, rather than just model builders. The pipeline represents years of unfunded, expert development, and releasing it would risk returning modeling practice to its old cycle—where most effort is spent rebuilding models from scratch, rather than using and learning from them. By keeping the pipeline closed but releasing curated sets of high-quality model variants for open use, VerveStacks shifts focus to wide, impactful usage and transparency while protecting the resources needed to grow and maintain the project. This approach aims to establish “model usage” as the new norm for energy system analysis—similar to how operating systems made computers widely accessible and useful.

.. _faq-name-origin:

**Where does the name "VerveStacks" come from?**
  *Verve* captures the vigor, energy, and passion of modeling done well — a deliberate pun for an energy platform, and the human, exploratory side of the work rather than equations and solver logs. *Stacks* refers to the layered scenario-assumption sets (data, technology, policy, demand, grid, and temporal layers) that get assembled into a model fit for the question. The word came first; the backronym *Versatile Engine for Regional and Varied Energy scenarios* was fitted later. See the :doc:`glossary </reference/glossary>` for the canonical definition.

**Which countries are supported?**
  Models can be generated for 100+ countries with sufficient data coverage.

**What data sources are used?**
  IRENA, EMBER, GEM, REZoning, Atlite, AR6 scenarios, and other global energy datasets.

Technical Questions
===================

**What modeling framework is used?**
  Models are generated in VEDA-TIMES format with Excel-based templates.

**How are regions defined?**
  VerveStacks represents each country as a set of **high-voltage substation clusters** derived from OpenStreetMap transmission infrastructure, not as administrative divisions. Power plants, renewable-energy zones, and demand are all attached to these clusters. See :ref:`demand-allocation-to-grid-nodes` for the full allocation methodology.

**Why does my state / prefecture / province have no electricity demand?**
  This is usually by design, not a bug. VerveStacks allocates demand to the physical transmission network — specifically, to high-voltage (≥ 110 kV by default) substation clusters — and then sparsifies the result so that only the buses which collectively cover ~80 % of national demand are retained. Consequences:

  - An administrative region whose load is physically served by a substation just across its border will appear at that neighbouring substation.
  - An administrative region with no transmission-level infrastructure at all will have its load absorbed by the nearest eligible bus, which may lie outside the region.
  - A long tail of small-share buses is intentionally discarded to keep the TIMES model tractable.

  This is a deliberate trade-off toward physical realism over administrative completeness. See :ref:`demand-allocation-design-intent` for the rationale, :ref:`the sparsification step <demand-allocation-sparsification>` for how the long tail is dropped, and :ref:`demand-allocation-tuning` for the knobs (``coverage_target``, ``min_voltage_kv``, ``pop_min``) if you need to retain more regions.

**What time resolution is available?**
  From 1 to 600+ timeslices based on stress-period analysis of hourly data.

**Can I modify the models?**
  Yes, all model files can be downloaded and customized using standard VEDA tools.

.. note::
   More detailed FAQ entries will be added based on user feedback.

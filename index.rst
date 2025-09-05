.. title:: VerveStacks — Open‑Use Energy Modeling

=============================================
VerveStacks — Open‑Use Energy Modeling
=============================================

**Energy system modeling — reimagined for use.**

Most modeling projects begin by building the model. VerveStacks begins where others stop — with **ready‑to‑use, decision‑grade power‑sector models** you can explore immediately. We call this **open‑use**: models and assumptions are open to *use, inspect, and question*; pipelines may remain managed so quality can scale. The emphasis is on **results and interpretation**, not on forcing every user to become a model builder.

Open‑Use Vision
---------------

- **Lower the skill barrier to entry.** Proprietary tools have licensing barriers and open-source tools have high skill barriers. Open-use aims to lower both barriers by making the full modeling value chain available to all. Lowering the skill barrier is a pre-requisite for making any system truly impactful.
- **Liberate the models.** We separate the craft of building pipelines and models from the skill of using models. The latter is where decisions live. VerveStacks exists to create a **new class of modelers — expert users** who ask better questions, run scenarios fast, and interpret results with confidence - **all without having to build the model**. Model builders do not have the best context for the application of the model. They have been monopolizing model interpretation only because models have been designed for self-use.
- **Liberate the user.** Many domain experts are *too deep in reality* to spend months building infrastructure just to test a question. VerveStacks brings them in — policymakers, consultants, researchers, analysts, and teachers who want trustworthy, transparent models they can run today.
- **Managed complexity.** Proprietary tools hide complexity; open‑source can expose it raw. VerveStacks makes complexity *usable* — transparent data, explicit methods, and practical defaults that travel well across contexts. Any part of the model can be modified or enhanced without having to build the **whole system** from scratch.

By the Numbers
--------------

- **100+ countries**: Ready-to-use models available immediately
- **5 minutes**: From country selection to running scenarios  
- **8760 hours**: Native hourly resolution with intelligent aggregation
- **50×50km**: Spatial resolution for renewable resource modeling
- **6+ datasets**: Integrated global energy data (IRENA, EMBER, GEM, REZoning, Atlite, AR6)
- **Free access**: Complete modeling value chain at no cost

What you get (the offering)
---------------------------

- **Model Library**: high‑resolution, per‑ISO power‑sector models with transparent assumptions, versioned
  model cards, and known‑gap notes.
- **Immediate exploration in Veda Online (VO)**: run scenarios, compare results, and share insight without
  setup.
- **Scenario templates**: sensible defaults for common analyses (policy toggles, cost sensitivities,
  demand variants, climate categories).
- **Interoperable exports**: artifacts for TIMES, OSeMOSYS, PyPSA, LEAP; plus CSV/Excel for audit and
  reporting.
- **Methods & data transparency**: clear documentation of time‑slice design, renewable gap‑filling,
  storage/adequacy treatment, retrofit logic, transmission/REZ mapping, data sources, and calibration.

Technical Excellence
--------------------

- **Stress-based timeslice design**: Automated identification of critical operational periods
- **Multi-resolution spatial clustering**: Demand regions, generation clusters, renewable zones
- **Geographic realism**: Transmission connections based on actual spatial overlaps
- **Conservative resource assessment**: Land-use constraints applied to renewable potentials
- **Complete data lineage**: Every parameter traceable to source with transformation logic

Expectations & ethos
--------------------

- **A new class of modelers**: We expect many users who never touched ESOMs to become *model users* —
  "story‑builders" who shape scenarios and interpret trade‑offs without becoming pipeline engineers.
- **Versioned, decision‑grade artifacts**: every release is pinned, cited, and never overwritten.
- **Open improvement loop**: challenge our assumptions; propose better ones; we'll regenerate and version
  results. *Quality grows through use.*

Experience the Revolution
-------------------------

- **Try it now**: :doc:`Browse available countries </model-library/coverage-map>` and run your first scenario in 5 minutes
- **See the science**: :doc:`Explore the methodology </methods/stress-timeslices>` behind automated model generation  
- **Join the movement**: :doc:`Learn about Open-Use </community/open-use-movement>` energy modeling
- **Real impact**: :doc:`Read success stories </community/success-stories>` from users worldwide

.. toctree::
   :maxdepth: 2
   :caption: Get Started (5 minutes)

   getting-started/quickstart
   getting-started/first-scenario
   getting-started/understanding-results
   getting-started/customization-basics
   getting-started/faq

.. toctree::
   :maxdepth: 2  
   :caption: Explore Models

   model-library/coverage-map
   model-library/iso-template
   model-library/model-validation
   model-library/version-history
   case-studies/japan-fossil-transition
   case-studies/developing-country-access
   case-studies/academic-research
   case-studies/policy-analysis

.. toctree::
   :maxdepth: 2
   :caption: Understand the Science

   methods/stress-timeslices
   methods/spatial-clustering
   methods/transmission-modeling
   methods/rez-gapfilling
   methods/storage-adequacy
   methods/retrofit-ccs
   architecture/data-pipeline
   architecture/clustering-algorithms
   architecture/quality-assurance
   data-assumptions/index
   data-assumptions/sources
   data-assumptions/data-lineage
   data-assumptions/validation-metrics

.. toctree::
   :maxdepth: 2
   :caption: Platform & Integration

   platform/veda-online
   platform/queue-management
   platform/github-integration
   platform/customization
   integration/times
   integration/osemosys
   integration/formats

.. toctree::
   :maxdepth: 2
   :caption: Advanced Usage

   tutorials/beginner
   tutorials/intermediate
   tutorials/advanced
   tutorials/policy-bundles

.. toctree::
   :maxdepth: 1
   :caption: Community & Support

   community/open-use-movement
   community/success-stories
   community/academic-network
   community/developer-ecosystem
   community/roadmap
   community/partners
   community/support

.. toctree::
   :maxdepth: 1
   :caption: Reference

   reference/glossary
   reference/parameters
   reference/changelog
   reference/license
   reference/citation

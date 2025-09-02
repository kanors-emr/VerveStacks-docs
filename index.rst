VerveStacks Documentation
=========================

**VerveStacks** is a comprehensive energy systems modeling platform that automates the creation of country-specific VEDA/TIMES energy models. Built on 30+ years of energy modeling expertise, VerveStacks transforms months of manual model building into minutes of automated generation.

.. note::
   VerveStacks represents the evolution of energy modeling from artisanal craftsmanship to automated excellence, democratizing access to world-class energy system analysis.

Key Features
------------

* **Automated Model Generation**: Create complete VEDA/TIMES models for 190+ countries in minutes
* **Comprehensive Data Integration**: Seamlessly integrates IRENA, EMBER, GEM, REZoning, Atlite, and NGFS datasets
* **Grid Modeling**: Advanced PyPSA-based network modeling with renewable energy zones
* **Professional Outputs**: Automated Excel workbooks with comprehensive documentation
* **Version Control**: Built-in Git integration for model versioning and collaboration

Quick Start
-----------

.. code-block:: bash

   # Install VerveStacks
   pip install -r requirements.txt
   
   # Generate a model for Germany
   python main.py --iso DEU --tsopt ts12_clu
   
   # Generate with grid modeling
   python main.py --iso DEU --grid-modeling

.. toctree::
   :maxdepth: 2
   :caption: Getting Started
   
   getting-started/prerequisites
   getting-started/installation
   getting-started/quick-start
   getting-started/tutorials

.. toctree::
   :maxdepth: 2
   :caption: Data Processing & Integration
   
   data-processing/overview
   data-processing/existing-stock
   data-processing/vre-integration
   data-processing/demand-anchoring
   data-processing/grid-modeling
   data-processing/spatial-gap-filling

.. toctree::
   :maxdepth: 2
   :caption: Mathematical Specification
   
   mathematical/times-formulation
   mathematical/parameter-definitions
   mathematical/optimization-workflow
   mathematical/timeslice-aggregation

.. toctree::
   :maxdepth: 2
   :caption: Methodology & Validation
   
   methodology/data-lineage
   methodology/quality-assurance
   methodology/validation-approaches
   methodology/assumptions-documentation

.. toctree::
   :maxdepth: 2
   :caption: User Guides
   
   guides/batch-processing
   guides/customization
   guides/troubleshooting
   guides/best-practices

.. toctree::
   :maxdepth: 2
   :caption: API Reference
   
   api/core-modules
   api/data-processors
   api/model-creators
   api/utilities

.. toctree::
   :maxdepth: 1
   :caption: Development & Community
   
   development/contributing
   development/changelog
   development/roadmap
   community/support
   community/publications

About VerveStacks
-----------------

VerveStacks is developed by `KanORS-EMR <https://kanors.com>`_, building on decades of experience in energy systems modeling. The platform represents the culmination of expertise gained from co-creating the TIMES framework, developing VEDA interfaces, and building large-scale energy models for governments and organizations worldwide.

The Journey
~~~~~~~~~~~

* **1994-2000**: Mathematical foundations with MARKAL and TIMES co-creation
* **2000-2015**: 15 years of artisanal model building excellence  
* **2015-2022**: Systematic automation with IEMM and KiNESYS platforms
* **2025**: Democratic revolution with VerveStacks automated generation

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`

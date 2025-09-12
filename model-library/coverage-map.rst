=============
Coverage Map
=============

**Available country models and generation status**

.. epigraph::

   **Real models, ready to use.** Every country listed below has a complete, validated energy system model available for immediate download and analysis.

Current Model Library
=====================

All available models are hosted in the public repository: `VerveStacks Models <https://github.com/akanudia/vervestacks_models>`_

**Access Method**
  Browse country-specific branches in the repository for immediate model download.

**Model Format**  
  Complete VEDA-TIMES compatible Excel templates with full documentation.

**Update Status**
  Models are regenerated as source datasets are updated, ensuring current data.

Available Countries
===================

.. note::
   
   **Live Coverage**: The current list of available models is maintained automatically from the repository. Visit the `GitHub repository <https://github.com/akanudia/vervestacks_models>`_ for the most up-to-date model availability.

**Current Status**: Models are being generated and added to the repository on an ongoing basis as the platform develops.

Data Coverage Requirements
==========================

For a country model to be generated, sufficient data must be available across key datasets:

**Essential Data Sources**
- **Power Plants**: Operational capacity and technology mix from Global Energy Monitor (GEM)
- **Renewable Potential**: Grid-cell level solar and wind resources from REZoning dataset
- **Historical Generation**: Monthly electricity generation patterns from EMBER statistics  
- **Demand Patterns**: Population distribution for spatial demand modeling

**Quality Thresholds**
- Minimum 70% of installed capacity covered in GEM database
- At least 12 months of historical generation data from EMBER
- Renewable potential data covering >80% of country territory
- Population data sufficient for meaningful spatial clustering

Model Specifications
====================

**Temporal Resolution**
  Native hourly modeling with intelligent timeslice aggregation for computational efficiency.

**Spatial Resolution**  
  Country-level models with optional grid modeling for transmission-constrained analysis.

**Technology Coverage**
  Complete existing fleet characterization plus renewable expansion potential.

**Time Horizon**
  2022 base year with projections through 2050 in 5-year intervals.

Requesting New Models
=====================

**Data Availability Check**
  Countries not yet available may have insufficient source data coverage or be in the generation queue.

**Priority Requests**
  Contact the development team for priority generation of specific country models needed for urgent analysis.

**Custom Requirements**
  Special modeling requirements (enhanced spatial resolution, extended time horizon) available through collaboration.

Quality Assurance
==================

**Validation Process**
  All models undergo systematic validation against historical data and cross-dataset consistency checks.

**Documentation Standards**
  Every model includes complete data lineage, methodology documentation, and known limitations.

**Version Control**
  All models are versioned with clear change documentation for reproducible analysis.

**Peer Review**
  Model methodology and validation results are available for community review and validation.

Future Enhancements
===================

**Interactive Dashboard**
  Web-based coverage map with real-time model status and download links.

**Automated Updates**
  Continuous integration pipeline for automatic model regeneration when source data updates.

**Regional Aggregations**
  Multi-country regional models for cross-border analysis and trade modeling.

**Enhanced Metadata**
  Detailed model cards with validation metrics, data vintage, and application guidance.

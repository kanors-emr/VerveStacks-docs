=============================
Model Card Template
=============================

**Standard format for country model documentation**

Each VerveStacks model includes the following information:

Model Specifications
====================

- **Country/Region**: ISO code and full name
- **Spatial resolution**: Number of demand/generation/renewable clusters
- **Temporal resolution**: Number of timeslices and stress periods
- **Technology coverage**: Included generation technologies
- **Data vintage**: Source data update dates

Data Sources
============

- **Power plants**: GEM database coverage and completeness
- **Renewables**: REZoning potential data availability
- **Demand**: EMBER historical generation for calibration
- **Scenarios**: AR6 pathway mapping

Model Validation
================

- **Base year calibration**: Historical generation matching
- **Capacity reconciliation**: Cross-dataset validation results
- **Geographic validation**: Coordinate and boundary checks

Known Limitations
=================

- Data gaps and assumptions made
- Geographic or technology coverage limitations
- Recommended use cases and cautions

.. note::
   Specific model cards will be generated automatically from model metadata.

=============
Data Pipeline
=============

**Global datasets to country models transformation**

VerveStacks processes multiple global datasets through automated pipelines to create country-specific models.

Pipeline Overview
=================

Data Sources
------------
- **GEM**: Global power plant database
- **IRENA**: Renewable capacity statistics  
- **EMBER**: Historical generation data
- **REZoning**: Renewable potential at 50x50km resolution
- **Atlite**: Weather-dependent renewable profiles
- **AR6**: Climate scenario pathways

Processing Steps
================

1. **Data Loading**: Cached dataframes for efficient processing
2. **Country Filtering**: Extract country-specific data
3. **Validation**: Coordinate and data quality checks
4. **Clustering**: Spatial region creation
5. **Integration**: Combine datasets into model parameters
6. **Export**: Generate VEDA-compatible Excel templates

Implementation
==============

The pipeline is implemented in Python with pandas, using modular processing functions for different data sources.

.. note::
   Detailed pipeline architecture diagrams to be added.

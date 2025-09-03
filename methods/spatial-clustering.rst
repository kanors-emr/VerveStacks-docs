==================
Spatial Clustering
==================

**Multi-resolution clustering for energy system regions**

VerveStacks uses three-layer spatial clustering to create energy system regions.

Clustering Layers
=================

Demand Regions
--------------
- **Input**: Population data from worldcities database
- **Method**: Voronoi clustering with population weighting
- **Threshold**: Cities > 10,000 population
- **Output**: Non-overlapping demand regions

Generation Clusters  
-------------------
- **Input**: Power plant data from GEM database
- **Method**: Voronoi clustering with capacity weighting
- **Threshold**: Plants > 10 MW capacity
- **Output**: Non-overlapping generation clusters

Renewable Zones
---------------
- **Input**: REZoning solar/wind potential data
- **Method**: DBSCAN clustering with generation weighting
- **Threshold**: Generation > 100 GWh potential
- **Output**: Renewable resource clusters

Implementation
==============

Clustering algorithms are implemented in the multi-region analysis scripts, with configurable parameters for different country sizes.

.. note::
   Detailed clustering parameters and validation metrics to be documented.

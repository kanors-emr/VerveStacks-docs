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
- **Threshold**: Fuel-specific capacity thresholds (10-1000+ MW)
- **Output**: Non-overlapping generation clusters

Renewable Zones
---------------
- **Input**: REZoning solar/wind potential data
- **Method**: DBSCAN clustering with generation weighting
- **Threshold**: Generation > 100 GWh potential
- **Output**: Renewable resource clusters

Fuel-Specific Thresholds
=========================

Generation clustering uses dynamic, fuel-specific capacity thresholds to optimize model complexity:

- **Fossil fuels** (coal/gas/oil): Higher thresholds (50-1000+ MW) to limit retrofit variables
- **Nuclear**: Always included (0 MW threshold) for policy tracking
- **Hydro/Geothermal**: Moderate thresholds (10-200 MW) based on regional density
- **Solar/Wind**: Technology-specific thresholds (200+ MW) with regional optimization

Thresholds are pre-calculated per ISO to target ~200 fossil units maximum while maintaining model fidelity.

Implementation
==============

Clustering algorithms are implemented in the multi-region analysis scripts, with configurable parameters for different country sizes. Fuel-specific thresholds are stored in ``assumptions/iso_fuel_capacity_thresholds.csv``.

.. note::
   Detailed clustering parameters and validation metrics to be documented.

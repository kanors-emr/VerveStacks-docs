===================
Clustering Algorithms
===================

**Spatial clustering implementation details**

VerveStacks uses multiple clustering algorithms for different spatial layers.

Algorithm Selection
===================

Voronoi Clustering
------------------
- **Used for**: Demand regions and generation clusters
- **Advantage**: Guarantees non-overlapping regions
- **Implementation**: KMeans for centers, Voronoi for assignment
- **Libraries**: scipy.spatial.Voronoi

DBSCAN Clustering
-----------------
- **Used for**: Renewable zones
- **Advantage**: Handles irregular shapes and densities
- **Parameters**: Configurable eps and min_samples
- **Libraries**: sklearn.cluster.DBSCAN

Implementation Details
======================

- Coordinate validation and bounds checking
- Configurable cluster numbers by country size
- Population and capacity weighting
- Geographic overlap detection using Shapely

.. note::
   Algorithm parameter tuning and validation results to be documented.

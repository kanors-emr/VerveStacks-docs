========================================
Renewables: REZ Mapping & Gap‑Filling
========================================

**Renewable resource characterization and gap-filling methodology**

VerveStacks processes REZoning data to create renewable supply curves with conservative adjustments.

REZ Processing
==============

Data Sources
------------
- REZoning global dataset for solar and wind potential
- 50x50km grid cell resolution
- LCOE and capacity factor data

Land Use Adjustments
--------------------
- Solar potential reduced by ~40% for land use constraints
- Wind potential reduced by ~30% for land use constraints
- Conservative approach to avoid overestimating potential

Gap-Filling Approach
====================

Missing Data Handling
----------------------
- Statistical methods for incomplete grid cells
- Cross-validation with other renewable datasets
- Documentation of assumptions and limitations

Supply Curve Creation
---------------------
- Aggregation into 15-30 cost-capacity classes per technology
- Regional clustering of similar resources
- Integration with Atlite weather profiles

.. note::
   Detailed gap-filling algorithms and validation results to be documented.

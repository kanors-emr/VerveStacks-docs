=================
Model Validation
=================

**How VerveStacks models are validated**

Validation Process
==================

Base Year Calibration
----------------------
- Historical generation data from EMBER used for capacity factor validation
- Cross-dataset capacity reconciliation between GEM, IRENA, and EMBER
- Geographic coordinate validation for power plant locations

Data Quality Checks
--------------------
- Coordinate bounds validation by country
- Technology mapping consistency checks
- Capacity and generation data reconciliation
- Missing data identification and gap-filling documentation

Spatial Validation
-------------------
- Voronoi clustering ensures non-overlapping regions
- Geographic overlap detection for transmission connections
- Population and capacity weighting validation

Temporal Validation
-------------------
- Stress period identification from hourly analysis
- Timeslice aggregation preserves annual energy totals
- Coverage analysis validation against demand patterns

.. note::
   Detailed validation reports are generated automatically for each model.

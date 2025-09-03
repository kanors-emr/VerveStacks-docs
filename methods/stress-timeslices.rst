=====================================
Time‑Slice Design & Stress Selection
=====================================

**How VerveStacks creates timeslices from hourly data**

VerveStacks uses stress-based analysis to select representative time periods from 8760 hourly data.

Methodology
===========

Coverage Analysis
-----------------
- Hourly renewable supply vs demand comparison
- Identification of scarcity, surplus, and volatile periods
- Ranking of days and weeks by operational stress

Stress Categories
-----------------
- **Scarcity periods**: Renewable supply < demand
- **Surplus periods**: Renewable supply > demand  
- **Volatile periods**: High supply variability

Timeslice Selection
-------------------
- Statistical ranking of stress intensity
- Configurable aggregation from 1 to 600+ timeslices
- Representative period weighting

Implementation
==============

The stress analysis is implemented in the time slice processor module, using hourly profiles from ERA5 and REZoning data.

.. note::
   Detailed mathematical formulation and validation results to be documented.

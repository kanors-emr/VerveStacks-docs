===============
Source Datasets
===============

**Global datasets used in VerveStacks model generation**

Primary Data Sources
====================

GEM (Global Energy Monitor)
----------------------------
- **Content**: Global power plant database
- **Coverage**: Operational and planned power plants worldwide
- **Usage**: Existing capacity, technology mapping, geographic locations
- **Update frequency**: Quarterly updates

IRENA Statistics
----------------
- **Content**: Renewable energy capacity statistics
- **Coverage**: Country-level renewable capacity by technology
- **Usage**: Gap-filling for missing GEM capacity data
- **Update frequency**: Annual updates

EMBER Data
-----------
- **Content**: Historical electricity generation and capacity
- **Coverage**: Country-level generation by fuel type
- **Usage**: Base year calibration and validation
- **Update frequency**: Annual updates

REZoning Dataset
----------------
- **Content**: Renewable energy potential at 50x50km resolution
- **Coverage**: Global solar and wind resource assessment
- **Usage**: Renewable supply curves and capacity factors
- **Update frequency**: Static dataset with periodic updates

Atlite (ERA5 reanalysis)
------------------------
- **Content**: Weather-dependent renewable energy time series, converted from ERA5
  reanalysis using the ``atlite`` library
- **Coverage**: Hourly capacity factors (8760 values) per 50x50km grid cell, for solar PV,
  onshore wind and offshore wind
- **Weather years**: 2010, 2013, 2016 and 2019, spaced to sample distinct circulation
  conditions. 2013 is the default where a single year is required
- **Usage**: Technology-specific capacity factors and profiles, aggregated to clusters and
  timeslices
- **Update frequency**: Historical weather data
- **Conversion method**: :doc:`/methods/weather-to-capacity-factors`

.. note::
   Profiles for other weather years exist to support research and sensitivity work. They are
   not part of standard model builds and should not be assumed interchangeable with the four
   years above.

AR6 Scenarios
-------------
- **Content**: IPCC AR6 climate scenario pathways
- **Coverage**: Global and regional energy demand/supply projections
- **Usage**: Future scenario assumptions and carbon pricing
- **Update frequency**: Periodic IPCC assessment updates

.. note::
   Detailed data vintage information and update schedules maintained in model metadata.

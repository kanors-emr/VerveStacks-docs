===================
Transmission Modeling
===================

**Geographic overlap-based transmission connections**

VerveStacks creates realistic transmission connections based on spatial overlap of energy system regions.

Connection Methodology
======================

Overlap Detection
-----------------
- Convex hull creation for each cluster
- Geographic intersection calculation using Shapely
- Connection only where clusters physically overlap

Capacity Calculation
--------------------
- Based on overlap area and distance
- Weighted by generation/demand capacity
- Realistic NTC (Net Transfer Capacity) estimation

Connection Types
================

- **Generation → Demand**: Power plants to overlapping demand regions
- **Renewable → Demand**: Renewable zones to overlapping demand regions
- **Renewable → Generation**: Renewable zones to overlapping power plants

Implementation
==============

Transmission modeling is implemented in the NTC calculation scripts, producing connection matrices for VEDA model integration.

.. note::
   Mathematical formulation and validation against real transmission data to be documented.

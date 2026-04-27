New Technology Characterization
===============================

**Regionally differentiated, uncertainty-aware cost assumptions for new power generation and storage technologies**

VerveStacks provides a single, consistent set of techno-economic assumptions for the **27 new-build power generation and storage technologies** that drive long-term capacity expansion in every ISO model. Rather than copying numbers from one study or letting each user assemble their own inputs, this module compiles a unified reference from two authoritative public sources — the IEA Global Energy and Climate (GEC) Model dataset (World Energy Outlook 2023) and the NREL Annual Technology Baseline (ATB 2024 v3) — and then maps the 9 native IEA world regions onto the specific region system of each VerveStacks model via GDP-weighted dominance.

.. epigraph::

   **Separation of concerns.** Existing-stock characterization tells the model *what is on the ground today*. New-technology characterization tells it *what can be built tomorrow, at what cost, and how that cost evolves through 2050*.

Methodology Overview
--------------------

The new-technology characterization follows a four-stage process, producing a single long-format reference file (``unified_reference_costs.csv``) that all downstream model-building scripts consume:

1. **Level from IEA GEC**: regional absolute cost levels and operating parameters (O&M, efficiency, capacity factor, construction time) for 9 world regions at 2022 / 2030 / 2050.
2. **Spread from NREL ATB**: Conservative / Moderate / Advanced trajectories are converted into hi / mid / lo multipliers applied to IEA regional costs, preserving regional differentiation while importing ATB's richer uncertainty characterization.
3. **Storage and SMR gap-fill**: technologies not covered by IEA GEC (utility-scale batteries, small modular reactors) are sourced directly from ATB, with regional scaling applied where appropriate.
4. **Region mapping**: the 9 IEA regions are projected onto each model's native region system using a GDP-weighted dominance rule computed from the KiNESYS ``TIAM_RegionMap``.

Data Sources
------------

**IEA GEC Model (WEO 2023) — regional cost levels**

The IEA GEC power-generation technology cost dataset accompanies the *World Energy Outlook 2023* and provides regionally differentiated techno-economic parameters for major generation technologies under the Stated Policies (STEPS) scenario.

- **Coverage**: 9 regions — European Union, United States, Japan, Russia, China, India, Middle East, Africa, Brazil
- **Time points**: 2022, 2030, 2050
- **Parameters extracted**:

  - Overnight capital cost (USD 2022/kW)
  - Annual fixed O&M cost (USD 2022/kW-yr)
  - Gross efficiency on LHV basis (thermal plants)
  - Capacity factor (renewable plants)
  - Construction time in years (renewables only)

- **Sheets parsed**: Gas, Coal, Fossil fuels equipped with CCUS, Nuclear, Renewables
- **Role in the unified dataset**: primary source for **regional absolute cost levels** and all operating parameters.

**NREL ATB 2024 v3 — cost-trajectory uncertainty**

The ATB provides US-specific cost projections under three scenarios that reflect different rates of technological progress.

- **Scenarios**: Conservative, Moderate, Advanced
- **Time points**: annual from 2022 to 2050
- **Sheets used**: ``Summary_CAPEX``, ``Summary_FOM`` (battery storage), ``Financial and CRP Inputs`` (technology lifetimes)
- **Role in the unified dataset**:

  - **Hi / lo cost spread multipliers** for generation technologies (ratio of Conservative and Advanced to Moderate, applied to IEA regional costs)
  - **Absolute cost levels** for battery storage (no IEA GEC data available for storage)
  - **Absolute cost levels** for Nuclear SMR (not covered by IEA GEC)
  - **Technology lifetimes** from the TechLife CRP table

Compilation Strategy
--------------------

**Generation technologies (24 types)**

For each technology and region, the **mid** scenario capital cost equals the IEA GEC STEPS value directly. The **hi** and **lo** scenarios are derived by multiplying the mid value by spread multipliers computed from the ATB:

.. code-block:: text

   capex_hi(region, year) = capex_mid(region, year) x [ATB Conservative / ATB Moderate](year)
   capex_lo(region, year) = capex_mid(region, year) x [ATB Advanced     / ATB Moderate](year)

This preserves IEA's regional cost differentiation while importing ATB's technology-learning uncertainty range. Technologies without an ATB match (e.g. ``coal_subcritical``, ``coal_ultrasupercritical``, ``biomass_cofiring``, ``gas_chp``, ``gas_fuelcell``) receive hi / lo multipliers of 1.0 — only the mid trajectory is reported. When the ATB spread is available at years that do not exactly match the IEA data points (2022 / 2030 / 2050), the closest available ATB year is used.

.. list-table:: **ATB to VerveStacks technology mapping for spread computation**
   :widths: 30 25 45
   :header-rows: 1
   :class: longtable
   :align: left

   * - ATB Technology
     - ATB TechDetail
     - Mapped to
   * - UtilityPV
     - Class5
     - ``solar_pv``
   * - CSP
     - Class2
     - ``solar_csp``
   * - LandbasedWind
     - Class4
     - ``wind_onshore``
   * - OffShoreWind
     - Class3
     - ``wind_offshore``
   * - Geothermal
     - HydroFlash
     - ``geothermal``
   * - Hydropower
     - NPD4
     - ``hydro_large``
   * - Nuclear
     - Nuclear
     - ``nuclear``
   * - Biopower
     - Dedicated
     - ``biomass``
   * - NaturalGas_FE
     - CCAvgCF
     - ``gas_ccgt``
   * - NaturalGas_FE
     - CCCCSAvgCF
     - ``gas_ccs``
   * - NaturalGas_FE
     - CTAvgCF
     - ``gas_turbine``
   * - Coal_FE
     - newAvgCF
     - ``coal_supercritical``
   * - Coal_FE
     - CCS95AvgCF
     - ``coal_ccs``

**Battery storage (2 types)**

Battery storage has no IEA GEC entry. Costs come entirely from ATB for 4-hour and 8-hour utility-scale Li-ion systems:

- Capital cost and fixed O&M are taken from the ATB ``Summary_CAPEX`` and ``Summary_FOM`` sheets for Utility-Scale Battery Storage.
- ATB Moderate becomes ``capex_mid``, Conservative becomes ``capex_hi``, Advanced becomes ``capex_lo``.
- The same US-based cost is applied uniformly across all 9 regions, reflecting that Li-ion cells are a globally traded commodity with limited regional differentiation today.
- Native ATB time points are preserved: 2022, 2025, 2030, 2035, 2040, 2045, 2050.
- Roundtrip efficiency is 0.86 (ATB reference value).

**Nuclear Small Modular Reactors (1 type)**

IEA GEC does not break out SMRs. Costs come from ATB (``Nuclear`` technology, ``NuclearSMR`` TechDetail) and are regionally differentiated using the IEA large-nuclear cost ratio:

.. code-block:: text

   capex_smr(region, year) = capex_smr_us(year) x [IEA nuclear(region) / IEA nuclear(US)](year)

This assumes SMR regional cost drivers — labour, regulation, site preparation — correlate with large-nuclear cost drivers. The same scaling is applied to fixed O&M. ATB projects SMR capex crossing below large-nuclear capex by roughly 2040 in the Moderate scenario, reflecting expected learning from modular factory fabrication. SMR uses native ATB time points 2030, 2035, 2040, 2045, 2050 (no 2022 point), a 40-year lifetime (shorter design-certification horizon than large reactors), and a 3-year construction time (factory fabrication plus on-site assembly versus 7 years for large nuclear).

Lifetime and Construction Time
------------------------------

Lifetime and construction time are treated as time-invariant, technology-specific constants.

**Lifetime (years)**

- *From ATB TechLife CRP* — Solar PV / CSP (30), Wind onshore / offshore (30), Geothermal (30), Hydro large (100), Nuclear large (60), Biopower (45).
- *Standard assumptions* — Hydro small (60), Biomass cofiring (40), Biomass CHP (25), Biomass CCS (30), Gas CCGT / turbine / CCS (30), Gas CHP (25), Gas fuel cell (20), all coal variants (40), Battery 4h / 8h (20), Nuclear SMR (40).

**Construction time (years)**

- *From IEA GEC Renewables sheet* — Solar PV (1.5), Wind onshore (1.5), Wind offshore (3), Hydro large / small (4), Biomass large (3), Biomass cofiring (2), Biomass CHP (2), Biomass CCS (3), CSP (3), Geothermal (4).
- *Standard assumptions* — Nuclear large (7), Nuclear SMR (3), Gas CCGT / CHP (3), Gas turbine / fuel cell (2), Gas CCS (4), Coal sub / super / ultra / IGCC (4), Coal CCS variants (5), Battery 4h / 8h (1).

Technology Coverage
-------------------

27 technologies across six families, each carrying the ``en_`` prefix used in the TIMES commodity and process naming conventions:

.. list-table:: **Technology families**
   :widths: 25 75
   :header-rows: 1
   :class: longtable
   :align: left

   * - Family
     - Technologies
   * - Thermal — Gas
     - ``en_gas_ccgt``, ``en_gas_turbine``, ``en_gas_chp``, ``en_gas_fuelcell``, ``en_gas_ccs``
   * - Thermal — Coal
     - ``en_coal_subcritical``, ``en_coal_supercritical``, ``en_coal_ultrasupercritical``, ``en_coal_igcc``, ``en_coal_ccs``, ``en_coal_oxyfuel_ccs``, ``en_coal_igcc_ccs``
   * - Nuclear
     - ``en_nuclear``, ``en_nuclear_smr``
   * - Renewables
     - ``en_solar_pv``, ``en_solar_csp``, ``en_wind_onshore``, ``en_wind_offshore``, ``en_hydro_large``, ``en_hydro_small``, ``en_geothermal``
   * - Bioenergy
     - ``en_biomass``, ``en_biomass_cofiring``, ``en_biomass_chp``, ``en_biomass_ccs``
   * - Storage
     - ``en_battery_4h``, ``en_battery_8h``

Regional Coverage and Model-Region Mapping
------------------------------------------

**Native IEA regions (9)**

The unified reference file keeps costs at the native IEA granularity — no pre-aggregation to R10 or other schemes — so downstream users can choose their own mapping:

1. United States
2. European Union
3. Japan
4. China
5. India
6. Russia
7. Middle East
8. Africa
9. Brazil

**GDP-weighted dominance mapping**

To drop these 9 cost regions onto an arbitrary VerveStacks model region system (country-level, AR6 R10, KiNESYS ``S100D``, etc.), each model region is mapped to the IEA region with the largest **GDP share** among the countries it contains. The GDP totals come from the ``WEO_PG_assumptions`` and ``GDP`` columns of the shared KiNESYS ``TIAM_RegionMap`` workbook. For each model region:

.. code-block:: text

   ieapg(model_region) = argmax_{ieapg_r}  sum_{c in model_region, c in ieapg_r} GDP(c)

A ``gdp_share`` value of 1.0 indicates a clean, single-region match; values below 1.0 indicate a heterogeneous model region where the dominant IEA region is used but a minority share of the GDP belongs to a different cost region. Typical examples:

.. list-table:: **Example region mappings (selected rows)**
   :widths: 30 30 20 20
   :header-rows: 1
   :class: longtable
   :align: left

   * - Model region system
     - Model region
     - IEA region
     - GDP share
   * - KiNESYS S100D (country)
     - ``USA``
     - ``ieapg_united_states``
     - 1.00
   * - KiNESYS S100D (country)
     - ``Australia``
     - ``ieapg_united_states``
     - 1.00
   * - KiNESYS S100D (country)
     - ``Turkey``
     - ``ieapg_european_union``
     - 1.00
   * - KiNESYS DTC (demand-region)
     - ``East_Europe``
     - ``R10REF_ECON``
     - 0.81
   * - KiNESYS DTC (demand-region)
     - ``Other_AsiaEm_d``
     - ``R10CHINA+``
     - 0.40

The mapping is computed by ``map_ieapg_regions.py`` and ``map_ar6r10_regions.py`` and stored as lightweight CSV files (``mapping.csv``, ``mapping_KiNESYS_S100D.csv``, ``mapping_KiNESYS_DTC_AR6R10.csv``, ``mapping_S100D_AR6R10.csv``) so that the same unified reference can feed multiple model variants without rerunning the underlying cost compilation.

Output Format
-------------

The compiled output (``unified_reference_costs.csv``) is in long format with one row per (technology, region, year, parameter) combination:

.. list-table:: **Unified reference schema**
   :widths: 20 80
   :header-rows: 1
   :class: longtable
   :align: left

   * - Column
     - Description
   * - ``variable``
     - Technology identifier (e.g. ``solar_pv``, ``gas_ccgt``, ``battery_4h``)
   * - ``region``
     - IEA native region name (e.g. ``United States``, ``European Union``)
   * - ``year``
     - Data year — native to source: 2022 / 2030 / 2050 for IEA; 2022–2050 at 5-year steps for ATB batteries
   * - ``parameter``
     - One of: ``capex_mid``, ``capex_hi``, ``capex_lo``, ``fixed_om``, ``efficiency``, ``capacity_factor``, ``lifetime``, ``construction_time``, ``roundtrip_efficiency``
   * - ``value``
     - Numeric value
   * - ``unit``
     - Unit string (e.g. ``USD2022/kW``, ``fraction_LHV``, ``years``)

No interpolation is performed — data points are kept at the native years provided by each source. TIMES performs its own internal interpolation between milestone years.

Key Design Decisions
--------------------

1. **IEA for levels, ATB for spread.** IEA GEC provides the best available regionally differentiated cost estimates from a single consistent modelling framework. ATB provides richer uncertainty characterization (Conservative / Moderate / Advanced) but only for the US. Combining both gives regional differentiation with cost uncertainty — something no single source provides on its own.
2. **No AR6 scenario-database costs used.** An earlier approach attempted to use IPCC AR6 scenario-database costs, but these were found to be unreliable for absolute cost levels due to model heterogeneity, missing technologies, and implausible entries (particularly for offshore wind). They remain useful for cross-validation and are not discarded — simply not used as a primary input.
3. **Battery costs are not regionally differentiated.** IEA GEC does not cover storage. ATB US costs are applied uniformly across regions. This is a defensible first approximation because Li-ion battery cells are a globally traded commodity; users who need regional differentiation can introduce it in a scenario overlay.
4. **All costs are overnight.** Neither source includes interest during construction or other financing costs. Construction time is carried as a separate parameter so that models which compute IDC endogenously can do so consistently.
5. **Currency year is USD 2022.** Both IEA GEC (WEO 2023) and ATB 2024 v3 report in 2022 US dollars. No currency conversion is needed at compile time.
6. **Nuclear SMR uses ATB absolute costs with IEA regional scaling.** IEA GEC does not include SMR. ATB provides US SMR costs directly; these are scaled to other regions using the IEA large-nuclear cost ratio (region / US). This preserves the regional cost pattern while sourcing the SMR-specific learning trajectory from ATB.
7. **Model-region mapping is GDP-weighted.** Cost levels are assumed to track the economic weight of countries within each model region, not simple geographic membership. This keeps cost assignments stable when model-region boundaries change, and the ``gdp_share`` column surfaces cases where the dominant assignment hides significant heterogeneity.

Reproducibility
---------------

Every artefact in this module can be regenerated from public sources:

.. list-table:: **Artefacts and scripts**
   :widths: 45 55
   :header-rows: 1
   :class: longtable
   :align: left

   * - File
     - Produced by
   * - ``unified_reference_costs.csv``
     - ``compile_unified_reference.py``
   * - ``technology_descriptions.csv``
     - Emitted alongside the compilation step
   * - ``mapping_KiNESYS_S100D.csv``
     - ``map_ieapg_regions.py --region-col KiNESYS_S100D``
   * - ``mapping_KiNESYS_DTC_AR6R10.csv``
     - ``map_ar6r10_regions.py --region-col KiNESYS_DTC``
   * - ``mapping_S100D_AR6R10.csv``
     - ``map_ar6r10_regions.py --region-col KiNESYS_S100D``

The input files (``GEC Model power generation technology costs dataset.xlsb``, ``ATB_2024_v3_Workbook.xlsx``, ``TIAM_RegionMap.xlsx``) are openly published by the IEA, NREL, and the KiNESYS framework respectively. Every number in every VerveStacks model is therefore traceable end-to-end — from the public source workbook, through a documented transformation, to the ``~FI_T`` row in the VEDA input tables.

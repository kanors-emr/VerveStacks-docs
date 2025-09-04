===================
Open-Use Movement
===================

.. epigraph::

   **From build-first to use-first.**
   Models are not fixed assets; they are **living environments** that hold resource and behavioral knowledge—and should be used to **enhance thinking**.

Why this movement?
==================

Fossil fleet phase-out and retrofits. Large-scale wind/solar build-out. Hydrogen from curtailed power.
EV charging and V2G and their impact on supply and transmission. Electrifying industry and buildings and the
knock-on effects on seasonal and diurnal peaks.

These are the questions practitioners bring to energy system models. To answer them credibly, a model must
see both the **WHEN** and the **WHERE** of system stress while remaining solvable fast enough to support active exploration.

What a useful model needs (to be useful)
=========================================

* **Existing fleet, precisely**: unit/cohort detail for retire/retrofit choices.
* **High-resolution VRE & storage**: hourly shapes (at least for stress periods) to capture the **when**.
* **Multi-region / grid representation**: to capture the **where**.
* **Hydrogen & flexibility**: regional routing, curtailed-power utilization.
* **Demand blocks + load profiles**: industry, buildings, EVs; charging policies and V2G.
* **Flexible time & horizon**: annual near term, longer periods later; **adaptive timeslices**.
* **Solvability**: all that granularity—and **solutions in hours**—so you can truly explore.

What's broken in the current "open" story
==========================================

* **Reproducibility ≠ Reusability.** Recreating a colleague’s workflow is not the same as **using** their insight.
  Rebuilding consumes months; **building on** should take minutes.
* **Blank slates everywhere.** New users inherit bare frameworks rather than usable environments.
* **Complexity unmanaged.** Rich detail overwhelms unless the environment is designed to **manage** it.

.. epigraph::

   **Managed complexity enlightens; unmanaged complexity overwhelms.**

   — The Veda ethos

What "Open Use" means
=====================

**Open Use** is the commitment to publish **decision-grade, pre-solved, shareable models** that anyone can open,
explore, and extend **today**—before they ever decide to rebuild anything.

With **VerveStacks (VS)** this looks like:

* **Freely available, ISO-level country models** (100+ target countries).

* **Dual delivery**:

  1. a model-agnostic, documented data dump, and
  2. a fully functional **Veda–TIMES** bundle.

* **Pre-solved online** in **Veda Online (VO)**—no install, no solver management.

* **Assumption layers (“stacks”)** you can toggle: WEO / NREL / NGFS, AR6 R10 climate categories, and more.

* **Stress-based timeslices**: scarcity/surplus/volatility & “worst weeks” to keep physics while reducing size.

* **“Microscope mode”**: import a capacity mix from any model and diagnose operational gaps (non-VRE flexibility needs)
  by slice and season.

**Open Use** doesn’t replace open source. It **precedes** it with a credible starting point, so openness is measured in
**time-to-insight**, not just code availability.

Principles
==========

1. **Use first, then build.** Start from a solved, credible environment. Rebuild only where value accrues.
2. **Enumerated & layered assumptions.** Multiple truths can coexist—choose stacks, don’t overwrite them.
3. **Adaptive time.** Let the model see the hours that matter, not all hours equally.
4. **Transparent provenance.** Every figure is traceable to source and transformation.
5. **Living, not frozen.** When EMBER, GEM, NGFS, or ATB update, VS regenerates **in hours, not months**.
6. **Managed complexity.** Veda makes layers, switches, and scenario families navigable and teachable.

What you can do today
====================

* **Open a solved country model** in VO, compare AR6 category scenarios, and share links with stakeholders.
* **Toggle assumption layers** (e.g., WEO ↔ NREL ↔ NGFS) and re-run.
* **Use Microscope Mode**: import an external capacity mix, get dispatchability & residual-gap diagnostics.
* **Fork inputs** to add local knowledge; VS will regenerate the model cleanly on the next data refresh.

Positioning vs frameworks
=========================

* **TIMES + Veda**: full multi-period structure, rich operations via stress-aware slices, and **managed complexity** for scenario families.
* **OSeMOSYS / PyPSA**: VS provides model-agnostic data artifacts and can interoperate; use VS as the **starting point**
  or the **microscope** for external plans.

FAQ
===

**Is this open source?**
We publish **open, documented artifacts** (data + solved models) and the full **assumption stacks**.
Pipelines will be modularized progressively; the ethos remains **Open Use**: your time-to-insight is the first product.

**Why TIMES/Veda?**
Because when fed real structure, TIMES approaches specialist power-sector capability while retaining full multi-period depth.
Veda turns that depth into **navigable layers**.

**Is this only about power?**
VS starts with the power sector and extends to hydrogen, transport (EV/V2G), buildings, and industry—grounded in the same
**layered, regenerable** philosophy.

Call to action
==============

* **Practitioners**: Open a model, ask a real question, share a link.
* **Contributors**: Add datasets, improve mappings, extend modules—without breaking solvability.
* **Institutions & funders**: Keep funding open models—and also fund **open-use infrastructure** that runs advanced frameworks and makes them free to use.
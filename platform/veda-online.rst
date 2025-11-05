=============
Veda Online
=============

**Cloud-based Environment for Using Energy Models**

Veda Online (VO) is the **execution and collaboration layer** for VEDA/TIMES energy models.

While tools like VerveStacks automate model *generation*, VO makes those models *usable*—providing the infrastructure for configuration, optimization, result exploration, and collaborative interpretation without requiring users to manage software installations, databases, or solver licenses.

VO is more than a hosting service for models — it's the **scaffolding of use** that makes complex modeling practical, collaborative, and insightful.

Traditional setups focus on *solving* models; VO focuses on *using* them.

It provides a consistent, cloud-based workspace where users can configure, run, compare, and interpret models without worrying about installations, versions, or dependencies.

Trying to use sophisticated models without such an environment is like attempting to solve a large optimization problem with pencil and paper — possible in theory, but impossible in practice.

VO removes this friction so that effort can flow into *interpretation*, not *mechanics*.

Platform Features
=================

Model Management
----------------

* Centralized upload and management of VEDA model files
* Built-in version control and secure model sharing
* Scenario configuration and management through an intuitive web interface

Analysis and Collaboration Tools
----------------------------------

* Model execution and optimization in a consistent online environment
* Interactive result visualization, comparison, and linking to specific views
* Data export, reporting, and audit-ready run tracking for reproducibility
* Direct sharing of model views and results for real-time collaboration and discussion

Integration with VerveStacks
=============================

VerveStacks models are designed for seamless compatibility with Veda Online.

Each VerveStacks build automatically generates **VEDA-compatible Excel templates** that can be uploaded directly to VO.

**The typical workflow:**

1. VerveStacks generates VEDA-compatible Excel templates for your ISO
2. Templates are committed to a GitHub repository (public or private)
3. VO connects to your GitHub repo and syncs the Excel files into its database
4. From that point, configuration, runs, and results live in VO's cloud environment
5. Model updates flow through GitHub → VO sync → updated runs

This integration delivers a **continuous workflow** — from automated model generation to online configuration, execution, and exploration.

Users can move from *model creation* to *insight generation* in a single, fluid environment.

The Veda Online Workspace
==========================

Once your VerveStacks model is uploaded, VO provides an integrated workspace:

**Navigator**
   Manages model synchronization from GitHub. VO reads your Excel templates into a PostgreSQL database, tracking file status and maintaining version history. The Navigator shows which files have been modified, imported, or require attention—keeping the model state transparent and manageable.

**Browse**
   Explore model input data through dynamic pivot tables (cubes). View all parameters for any process or commodity across all Excel files in one place—essential because declarations are often spread across multiple files. Filter by scenarios, regions, processes, commodities, and attributes to understand exactly what the model sees.

**Run Manager**
   Configure and submit optimization runs. Define cases by selecting scenario groups, region groups, and solver options. Submit runs to cloud infrastructure (GAMS Engine) or academic NEOS servers, and track solve status through an integrated dashboard. Configure TIMES switches and parametric analysis without manual file editing.

**Results**
   Analyze optimization results through interactive pivot tables. Results are stored with the model and available to all authorized users. Export to Excel or CSV for further analysis, or save custom views for repeated use.

**Reports**
   Create custom reporting variables with meaningful names and dimensions for stakeholder communication. Transform granular TIMES output into "Electricity Generation by Region, Fuel, Technology, and CCS Status" views that domain experts can interpret directly. Include historical data for calibration checking and trend visualization.

Getting Started
===============

1. **Export your VerveStacks model** – Models are produced as VEDA-compatible Excel files.
2. **Set up GitHub repository** – Commit your model templates to a GitHub repo (public or private).
3. **Connect VO to GitHub** – Link your repository to Veda Online for automatic synchronization.
4. **Synchronize model** – VO reads Excel files into its database and validates the structure.
5. **Configure scenarios** – Define policy cases, sensitivities, and time-series assumptions.
6. **Run analysis** – Execute optimization on cloud solvers and view results interactively.
7. **Explore and share** – Compare outputs, share links to views, and download data for reports.

Why It Matters
==============

From Model Building to Model Use
---------------------------------

Veda Online fundamentally changes who can engage with energy models.

Traditional setups require each user to install software, manage databases, run solvers locally, and recreate results to verify claims. This creates a **two-tier system**: modelers who build, and stakeholders who wait for PowerPoint presentations.

VO collapses this distinction. Policy analysts can explore results directly through pivot tables and reports. Collaborators see live model updates without re-syncing locally. Reviewers can inspect input assumptions via Browse without needing the full modeling stack.

**The result**: modeling becomes a collaborative exploration process, not a black-box analysis service.

Removing Mechanical Barriers
-----------------------------

Veda Online eliminates the mechanical barriers that have long separated *building* from *using* models.

It allows policy teams, analysts, and researchers to engage directly with sophisticated frameworks like TIMES without needing to manage the underlying machinery.

In combination with VerveStacks' automated model generation and KiNESYS' structured experimentation tools, VO forms part of a larger open-use ecosystem — a **modern operating environment for energy system modeling**, where effortlessness enables exploration and insight scales naturally.

.. note::
   VerveStacks models can also be used with desktop Veda 2.0 for intensive model development and debugging. Many users employ both: VO for stakeholder engagement and collaborative analysis, Veda 2.0 for detailed model modifications. The Excel templates are identical across both platforms.

=============================
Your First Scenario (Detailed)
=============================

**A complete walkthrough of running your first energy scenario**

This detailed guide walks you through every step of exploring a VerveStacks model,
from initial discovery to interpreting results and making your first modifications.

Step 1: Choose Your Country
===========================

**What to consider:**
- Start with a country you're familiar with for easier result interpretation
- Smaller countries (Switzerland, Denmark) are faster to explore initially
- Larger countries (USA, China, India) offer more complex regional dynamics

**Recommended first countries:**
- **Germany**: Well-documented energy transition with clear renewable targets
- **Japan**: Interesting fossil fleet transition dynamics post-Fukushima
- **California (USA-CAISO)**: Leading renewable integration policies
- **Switzerland**: Clean, simple system perfect for learning the interface

Step 2: Explore the Baseline Model
==================================

**Understanding the interface:**
- **Map view**: Geographic layout of your energy system
- **Technology mix**: Current generation capacity by fuel type
- **Regional structure**: How demand and supply are spatially organized
- **Time structure**: How the year is represented (timeslices)

**Key questions to explore:**
- What's the current generation mix?
- Where are the renewable resources located?
- How is demand distributed across regions?
- What does the transmission network look like?

Step 3: Select a Climate Scenario
=================================

**Available scenarios (AR6-based):**
- **Current Policies**: Business-as-usual trajectory
- **NDC Pledges**: National climate commitments
- **Below 2°C**: Moderate climate action
- **1.5°C Limit**: Aggressive decarbonization
- **Net Zero 2050**: Maximum climate ambition

**What changes between scenarios:**
- Carbon pricing trajectories
- Renewable energy targets
- Fossil fuel phase-out timelines
- Demand growth patterns
- Technology cost assumptions

Step 4: Run and Analyze Results
==============================

**Key outputs to examine:**
- **Capacity expansion**: What new technologies get built?
- **Generation patterns**: How does the energy mix evolve?
- **Regional dynamics**: Which areas see the most change?
- **System costs**: What are the economic implications?
- **Emissions trajectory**: Does the scenario meet climate goals?

**Comparison tools:**
- Side-by-side scenario comparison
- Delta views showing changes from baseline
- Time-series evolution of key metrics
- Regional breakdown of impacts

Step 5: Export and Share
=======================

**Available exports:**
- **Charts**: Publication-ready figures (PNG, SVG)
- **Data**: Complete results in CSV/Excel format
- **Models**: Full VEDA model files for local analysis
- **Reports**: Automated summary documents

**Sharing options:**
- Direct links to specific scenario results
- Embedded charts for presentations
- Complete model packages for collaboration

Common First Insights
=====================

**Typical discoveries:**
- Renewable energy dominates new capacity in most scenarios
- Storage becomes critical in high-renewable futures
- Regional differences in optimal technology mix
- Transmission expansion needs for renewable integration
- Economic benefits of early climate action

**Questions that often arise:**
- Why does this technology get selected over that one?
- How sensitive are results to cost assumptions?
- What happens if demand grows faster/slower?
- How do transmission constraints affect results?

Troubleshooting
===============

**If results seem unexpected:**
- Check the scenario assumptions and compare with baseline
- Examine regional details - national totals can hide local dynamics
- Look at the time dimension - annual averages can mask seasonal patterns
- Consider transmission constraints - isolated regions behave differently

**If the model runs slowly:**
- Try a smaller country first to learn the interface
- Use the queue status to understand processing times
- Consider upgrading to priority access for faster results

Next Steps
==========

**Ready to go deeper?**
- :doc:`customization-basics` - Make your first model modifications
- :doc:`understanding-results` - Detailed guide to interpreting outputs
- :doc:`/tutorials/intermediate` - Advanced scenario design
- :doc:`/case-studies/policy-analysis` - Real-world policy applications

**Want to understand the science?**
- :doc:`/methods/stress-timeslices` - How time is represented
- :doc:`/methods/spatial-clustering` - How space is modeled
- :doc:`/data-assumptions/index` - Where the data comes from

.. tip::
   The best way to learn energy modeling is by doing. Don't worry about 
   understanding everything immediately - start exploring and the patterns 
   will become clear through experience.

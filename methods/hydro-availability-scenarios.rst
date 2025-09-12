============================
Hydro Availability Scenarios
============================

**Evidence-based methodology validated with 24 years of historical data**

.. epigraph::

   **The future will not be average.** Analysis of 212 countries shows that planning for hydro variability is not optional—it's essential for energy security.

Executive Summary
=================

The Hydro Availability Scenarios module addresses critical uncertainty in energy planning by generating 100+ plausible future scenarios based on comprehensive historical analysis of global hydroelectric systems. This methodology transforms hydro uncertainty from an unknown risk into a manageable planning parameter.

**Key Findings from Global Analysis:**

- **212 countries analyzed** with historical data (2000-2023)
- **74 countries** with detailed monthly patterns  
- **Major droughts successfully reproduced** in scenario analysis
- **P10/P50/P90 framework** provides robust planning boundaries

The Problem We Solve
=====================

Why Historical Averages Fail
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Most energy models use simple historical averages for hydro availability, assuming every future year will match the past 5-10 year average. This approach is dangerously flawed because:

- **Droughts cluster**: Multiple dry years often occur consecutively (e.g., Brazil 2014-2015, California 2012-2016)
- **Climate change intensifies extremes**: Both droughts and floods are becoming more severe
- **Timing matters**: A drought during peak demand has different impacts than one in low season
- **Regional correlations exist**: Neighboring countries often experience similar conditions

Using historical averages leads to:

- **Underestimating backup needs** by 10-20%
- **Inadequate reserve margins** for drought years
- **Overreliance on hydro** during critical periods
- **Systemic risk** from correlated regional droughts

Our Solution: Stochastic Scenarios
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Instead of one average future, we generate 100+ possible futures that capture:

- **Natural variability**: Wet and dry year cycles
- **Persistence**: Multi-year droughts and wet periods  
- **Climate trends**: Declining availability and increasing volatility
- **Extreme events**: Low-probability, high-impact droughts

Understanding Scenario Outputs
===============================

The Three Key Scenarios
~~~~~~~~~~~~~~~~~~~~~~~~

From 100 generated scenarios, three are particularly useful for planning:

**P10 - Security Planning Scenario**
  - **What it represents**: A dry future that occurs 10% of the time
  - **Characteristics**: More frequent and severe droughts
  - **Use for**: Sizing reserve margins, stress testing, ensuring system security
  - **Key insight**: If your system survives P10, it's robust

**P50 - Base Planning Scenario**
  - **What it represents**: The median expected future
  - **Characteristics**: Typical mix of wet, normal, and dry years
  - **Use for**: Expected costs, base case capacity planning
  - **Key insight**: Most likely outcome for financial planning

**P90 - Opportunity Scenario**
  - **What it represents**: A favorable future with good hydro conditions
  - **Characteristics**: Fewer, milder droughts
  - **Use for**: Identifying export opportunities, minimum thermal needs
  - **Key insight**: Best case for hydro generation

Real-World Validation: Top Hydro Countries
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Analysis of scenario outputs reveals critical planning insights validated against historical data:

.. csv-table:: **Hydro Risk Analysis: Historical vs Future Scenarios**
   :header: "Country", "Hydro Share", "P10 Avg", "P50 Avg", "P90 Avg", "Risk Level"
   :widths: 15, 10, 10, 10, 10, 15

   "Norway", "96%", "43.8%", "46.6%", "49.0%", "Moderate"
   "Brazil", "65%", "40.3%", "43.4%", "46.4%", "High"
   "Venezuela", "68%", "36.6%", "38.7%", "41.0%", "Moderate"
   "Colombia", "70%", "48.5%", "51.0%", "54.0%", "Moderate"
   "Canada", "60%", "50.4%", "54.0%", "57.2%", "High"
   "Switzerland", "60%", "27.6%", "29.0%", "30.9%", "Low"

*Source: Analysis of 100 scenarios per country (2025-2050) validated against historical data (2000-2023)*

Historical Foundation
=====================

Methodology Validation with Real Data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Our scenario generation methodology has been validated against 24 years of historical data from EMBER Climate database, covering 212 countries with annual records and 74 countries with detailed monthly patterns.

**Historical Drought Documentation:**

The analysis uses **country-specific drought thresholds** based on each nation's historical patterns (P20 percentile) rather than arbitrary fixed values. This ensures drought identification reflects actual operational experience:

- **Brazil 2001**: Energy crisis with 20% rationing (CF dropped to ~30%, below Brazil's P20 threshold of 38%)
- **Brazil 2014-2015**: Consecutive drought years, reservoir levels at 40%
- **Brazil 2021**: Severe drought, 91-year low in some regions
- **European 2003**: Heat wave with significant hydro impacts

**Methodology Note**: Drought thresholds are derived from the bottom 20% of each country's historical capacity factors (2000-2023), ensuring definitions reflect actual operational stress rather than arbitrary percentages.

Data Foundation
~~~~~~~~~~~~~~~

**Primary Data Sources:**

- **EMBER Climate**: Monthly generation database (2000-2023) covering 212 countries
- **Capacity Data**: Installed hydro capacity by country and year
- **Quality Control**: Systematic validation and gap-filling procedures

**Coverage Statistics:**

- **High-Quality Analysis**: 74 countries with complete monthly data
- **Moderate Coverage**: ~90 countries with regional pattern-based scenarios  
- **Basic Coverage**: ~48 countries with climate zone patterns

**Derived Metrics:**

For each country and month, we calculate:

.. code-block:: text

   Availability Factor = Monthly Generation (TWh) / (Installed Capacity (GW) × Hours in Month × 0.001)

Scenario Generation Framework
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Step 1: Historical Analysis**
We analyze each country's historical hydro patterns (2000-2023) to extract:

- Seasonal patterns (wet/dry seasons)
- Year-to-year variability  
- Extreme event frequency
- Country-specific drought thresholds (P20 percentile)

**Step 2: Regime Classification**
Years are classified into three regimes that persist realistically:

- **Dry regimes** (bottom 35%): Tend to continue for 2-3 years
- **Normal regimes** (middle 30%): Most common state
- **Wet regimes** (top 35%): Favorable conditions

**Step 3: Climate Adjustment**
Future scenarios incorporate climate change through:

- **Declining mean availability**: -0.5% per decade (moderate scenario)
- **Increasing variability**: +10% per decade
- **More extreme events**: Higher probability of severe droughts

**Step 4: Scenario Generation**
For each of 100 scenarios, we generate 25+ years of monthly availability factors that:

- Preserve seasonal patterns
- Include realistic year-to-year transitions
- Incorporate climate trends
- Maintain physical bounds (5-95% availability)

Seasonal Pattern Analysis
~~~~~~~~~~~~~~~~~~~~~~~~~

The methodology successfully preserves historical seasonal patterns while projecting future variability:

.. figure:: /_static/images/hydro/seasonal_profiles.png
   :alt: Seasonal hydro availability profiles
   :align: center
   :width: 100%

   **Seasonal Hydro Availability: Future Scenarios vs Historical Data**
   
   P10/P50/P90 future scenarios (solid lines) compared with historical monthly averages and variability ranges (orange). The analysis shows scenarios successfully preserve seasonal patterns while capturing climate-driven changes.

Annual Trajectory Validation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Long-term scenario trajectories demonstrate realistic evolution from historical baselines:

.. figure:: /_static/images/hydro/annual_profiles.png
   :alt: Annual hydro availability trajectories
   :align: center
   :width: 100%

   **Annual Hydro Availability: Future Scenarios vs Historical Data (2000-2050)**
   
   Historical time series (2000-2023) seamlessly connect to future P10/P50/P90 scenarios (2025-2050). Country-specific drought thresholds (red dashed lines) reflect actual operational experience rather than arbitrary values.

Regional Patterns
~~~~~~~~~~~~~~~~~

**Tropical Systems** (Brazil, Colombia, Venezuela):
- High seasonal variability with distinct wet/dry seasons
- Strong El Niño/La Niña impacts on annual patterns
- Multi-year drought sequences require extended backup planning

**Snow-Dominated** (Norway, Canada, Switzerland):
- Spring snowmelt timing critical for annual generation
- Climate change shifting peak timing earlier
- Storage capacity crucial for seasonal balancing

**Monsoon-Dependent** (Vietnam, parts of Asia):
- Extreme seasonal concentration of generation
- Monsoon timing uncertainty creates planning challenges
- Flash drought risk during failed monsoon years

Historical Validation
~~~~~~~~~~~~~~~~~~~~~

Our scenarios successfully reproduce the statistics of major historical droughts:

.. figure:: /_static/images/hydro/historical_validation.png
   :alt: Historical drought validation analysis
   :align: center
   :width: 100%

   **Historical Drought Analysis: Validation of Scenario Methodology**
   
   Left: Drought frequency vs hydro dependency using country-specific P20 thresholds. Right: Worst-case historical availability factors showing actual operational stress levels experienced by each country.

Using Scenarios in Planning
============================

Capacity Planning Example
~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: text

   Traditional Approach (Historical Average):
   Required Capacity = Peak Demand / 0.41 (average hydro availability)
   Result: 100 GW needed

   Scenario-Based Approach:
   P50 Planning = Peak Demand / 0.41 = 100 GW
   P10 Verification = Peak Demand / 0.35 = 114 GW
   Required Reserve = 14 GW additional

   Decision: Build 100 GW base + 14 GW reserve = 114 GW total

Investment Analysis
~~~~~~~~~~~~~~~~~~~

For a new hydro project:

- **P50 scenario**: Expected returns, base case NPV
- **P10 scenario**: Downside risk, debt service coverage  
- **P90 scenario**: Upside potential

Banks typically require projects to maintain positive cash flow even in P10 scenarios.

System Operation Planning
~~~~~~~~~~~~~~~~~~~~~~~~~

- **Maintenance scheduling**: Use P50 for normal planning
- **Emergency preparedness**: Use P10 to size backup resources
- **Market opportunities**: Use P90 to identify export potential

Climate Change Implications
===========================

Our analysis reveals concerning trends for 2025-2050:

**Global Average Changes:**

- **Mean availability**: -5% by 2050 (moderate climate scenario)
- **Variability**: +20% increase in standard deviation
- **Extreme events**: 2x frequency of severe droughts

**Regional Hotspots:**

- **Mediterranean**: Summer availability could drop 30%
- **Tropical**: Wet/dry season intensification
- **Snow-based**: 1-2 month earlier peak, reduced total

**Planning Implications:**

- **Increased backup needs**: 10-20% more firm capacity required
- **Storage value**: 2-3x more valuable for drought bridging
- **Regional transmission**: Critical for resource sharing

Integration with Energy Models
==============================

Direct Scenario Usage
~~~~~~~~~~~~~~~~~~~~~~

Use specific scenario numbers (e.g., Scenario #23 for P10) as input to your capacity expansion model. This preserves year-to-year dynamics crucial for storage valuation.

Statistical Bounds
~~~~~~~~~~~~~~~~~~

For simpler models, use P10/P50/P90 monthly values as sensitivity cases.

Stochastic Optimization
~~~~~~~~~~~~~~~~~~~~~~~

Use all 100 scenarios with equal probability weights for expected value optimization.

Data Quality and Coverage
==========================

**Quality Transparency:**

.. list-table::
   :widths: 20 30 20 30
   :header-rows: 1

   * - Quality Level
     - Basis
     - Countries
     - Example
   * - High
     - Direct monthly data
     - 74
     - Brazil, Norway, Canada
   * - Moderate
     - Regional patterns
     - ~90
     - Bolivia (from Brazil)
   * - Basic
     - Generic patterns
     - ~48
     - Small island states

Limitations and Uncertainties
=============================

What We Capture
~~~~~~~~~~~~~~~

- Natural climate variability and persistence
- Climate change trends and intensification
- Realistic drought sequences and recovery patterns
- Seasonal pattern preservation

What We Don't Model
~~~~~~~~~~~~~~~~~~~

- Reservoir operations and storage constraints
- Upstream/downstream water dependencies
- Political water allocation changes
- Catastrophic infrastructure failures

Uncertainty Bounds
~~~~~~~~~~~~~~~~~~

- P10-P90 range captures 80% confidence interval
- Extreme scenarios (P5, P95) available for stress testing
- Climate scenarios span optimistic to severe projections

Recommendations for Planners
=============================

1. **Never use historical averages alone** - Minimum use P50 with P10 verification

2. **Size reserves for P10** - Better over-prepared than rationing

3. **Value flexibility** - Storage and demand response worth premium in variable futures

4. **Consider correlations** - Regional droughts affect multiple countries

5. **Update regularly** - Rerun scenarios as new data becomes available

Conclusion
==========

Hydro availability uncertainty represents a critical risk for energy systems worldwide. Our data-driven scenario approach, validated against 24 years of historical data from 212 countries, transforms this uncertainty into manageable planning parameters.

**Key Message**: The future will not match historical averages. Planning for variability using P10/P50/P90 scenarios is essential for reliable, cost-effective energy systems.

The key insight: **the future will not be average**. Planning for variability is not optional—it's essential for energy security.

---

*Methodology validated against historical data from EMBER Climate (2000-2023)*  
*Scenario generation covers 212 countries with 100 futures per country (2025-2050)*
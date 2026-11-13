# Calibration & Checks

**How the base year is tied to official statistics, and how every build is checked**

A VerveStacks model is not tuned to the base year after it is built. The base year is assembled from the same statistics it is checked against, and every build writes out the comparison so anyone can see where sources agree and where they do not.

## What is matched by construction

**Capacity.** Unit data from Global Energy Monitor misses capacity, mostly small and distributed plants. The pipeline compares the unit total for each fuel with official statistics (IRENA for renewables, Ember for fossil fuels) and, where the units fall short, fills the difference year by year, 2022 to 2024, placing it on the grid by rule. Where unit data shows more capacity than the statistics, the units are kept as they are. In Germany, two thirds of solar capacity was missing from unit data and is filled this way; see [Existing Stock Characterization](../methods/existing-stock-characterization.md).

**Utilisation.** For each fuel, the range of utilisation (generation divided by capacity) that Ember and IRENA have reported in recent years is written into the model's base scenario file.

**Demand.** Base-year electricity demand is the country's reported demand from Ember; see [Electricity Demand](../methods/electricity-demand.md).

## What is checked in every build

Each build writes a `Calibration` sheet to `VerveStacks_<ISO>.xlsx` with three tables:

| Table | Compares | Against |
|---|---|---|
| Capacity | Model capacity by fuel | IRENA and Ember |
| Generation | Model capacity × reported utilisation | Reported generation, IRENA and Ember |
| Fuel use | Implied generation ÷ plant efficiency | Reported fuel input, UN Statistics Division |

The fuel-use check is the independent one: plant efficiencies come from unit-level data, not from the statistics, so a gap here points at efficiencies, utilisation or the statistics themselves.

## Example: Germany, base year 2022

From the build of 1 October 2026.

| Fuel | Model capacity (GW) | Ember capacity (GW) | Implied generation (TWh) | Ember generation (TWh) | Implied fuel use (TWh) | UN fuel use (TWh) |
|---|---|---|---|---|---|---|
| Coal | 39.7 | 39.2 | 182.3 | 179.9 | 522 | 587 |
| Gas | 32.3 | 30.1 | 85.0 | 79.1 | 214 | 224 |
| Nuclear | 4.3 | 4.2 | 35.5 | 34.7 | | |
| Bioenergy | 9.8 | 9.8 | 48.8 | 48.8 | 158 | 163 |
| Solar | 61.2 | 61.2 | 60.3 | 60.3 | | |
| Oil | 1.9 | 3.8 | 10.7 | 21.7 | | |

What the table shows:

- **Capacity and generation agree** to within about 7% for coal, gas, nuclear, bioenergy and solar, and exactly for solar and bioenergy, where the gap-fill closes the difference. Gas units in the unit data add up to 7% more than Ember reports; they are kept.
- **Oil is the weak spot.** The model carries half the oil capacity Ember reports and implies half its generation. Oil is a small share of German power, but the gap is visible here rather than hidden.
- **Coal fuel use is 11% below UN statistics.** Either the unit-level efficiencies are optimistic or the reported fuel input includes uses the model does not carry. The gap is shown, not hidden.
- **Sources disagree among themselves** for some fuels. For onshore wind, IRENA reports 58 GW and Ember 66 GW; for hydro, IRENA reports 10.9 GW and Ember 5.6 GW. The sheet lists both, so a user can see which one the model follows.

## Where to look

| File | What it holds |
|---|---|
| `VerveStacks_<ISO>.xlsx`, sheet `Calibration` | The three tables above |
| `SuppXLS/Scen_Base_VS.xlsx` | Utilisation ranges by fuel; the country's published renewable targets (sheet `re_targets`) |

!!! note "On the model library page"

    The *Calibration %* column on the [Coverage Map](../model-library/coverage-map.md) is a single summary figure entered when a model is published. The tables above are the full picture for any one model.

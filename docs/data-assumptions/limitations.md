# Limitations & Known Gaps

**Data limitations and model constraints**

VerveStacks models have known limitations that users should understand.

## Data Limitations

### Geographic Coverage

- Some countries have incomplete power plant data
- Remote regions may have limited renewable resource data
- Transmission infrastructure data gaps
- Demand pattern estimation limitations

### Technology Coverage

- Limited representation of emerging technologies
- Simplified storage and flexibility modeling
- Industrial process heat limitations
- Transport sector integration constraints

### Temporal Resolution

- Timeslice aggregation loses some operational detail
- Seasonal storage representation limitations
- Inter-annual variability not captured
- Long-term planning horizon uncertainties

### Renewable Resource Conversion

Turning reanalysis weather into a plant capacity factor carries its own residual errors, documented in full in [Weather to Capacity Factors](../methods/weather-to-capacity-factors.md). The ones most likely to affect conclusions:

- **Wind shear assumes a neutral boundary layer.** Wind speed is extrapolated to hub height with a logarithmic profile. Real shear varies with atmospheric stability, and the stable nocturnal boundary layer is considerably steeper. This biases the diurnal *shape* rather than the annual level, so it is not absorbed by any downstream loss factor and it propagates into timeslice and flexibility results.
- **One turbine model per technology class.** Real fleets span a wide range of specific power, and modern low-specific-power machines produce materially higher capacity factors at low wind speeds. This is plausibly a larger source of country-level error than the physical corrections that are applied.
- **Power curve smoothing width is a chosen value.** The kernel that removes unphysical saturation uses a single global width rather than the sub-grid wind speed variance of each cell. It lifts low-wind sites more than good ones, compressing the modelled spread between strong and weak wind regions.
- **Coarse terrain elevation.** Air density is corrected using a grid-mean elevation, so ridge-top sites, where turbines are actually built, are under-corrected.
- **Fixed-tilt solar by default.** Profiles represent fixed-tilt PV. Fleets with significant single-axis tracking need a blended profile; tracking gain is strongly climate dependent, from roughly 8-10 percent in maritime climates to 20-25 percent in high-DNI desert, so no single global uplift is valid.
- **No icing, hysteresis or curtailment** in the resource profiles.
- **Weather year sampling is sparse.** Model builds draw on four weather years at most, which does not span the tails of inter-annual renewable variability.

## Model Constraints

### Optimization Assumptions

- Perfect foresight and rational decision-making
- No implementation barriers or delays
- Simplified policy representation
- Limited behavioral and social factors

### Validation Limitations

- Historical calibration may not predict future accurately
- Cross-dataset inconsistencies in some regions
- Limited validation against operational data
- Uncertainty quantification challenges

## Usage Recommendations

- Use for directional insights rather than precise predictions
- Compare multiple scenarios to understand sensitivities
- Validate results against local knowledge and data
- Consider limitations when interpreting results

!!! note
    Specific limitations documented for each country model.

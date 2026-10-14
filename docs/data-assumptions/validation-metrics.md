# Validation Metrics

**Quality assurance metrics and benchmarking**

VerveStacks uses multiple validation approaches to ensure model quality.

## Validation Approaches

### Historical Calibration

- Base year generation matching against EMBER data
- Capacity factor validation for existing plants
- Regional generation pattern consistency
- Technology mix validation against statistics

### Cross-Dataset Validation

- Capacity reconciliation between GEM, IRENA, EMBER
- Geographic coordinate validation
- Technology mapping consistency checks
- Missing data identification and documentation

### Spatial Validation

- Clustering algorithm validation
- Geographic boundary consistency
- Transmission connection realism
- Regional aggregation accuracy

### Temporal Validation

- Timeslice energy conservation
- Stress period identification accuracy
- Hourly profile data completeness
- Seasonal pattern preservation

## Renewable Profile Screening

Modelled renewable capacity factors are screened against **IRENA utilisation factors for 2019-2023**, country by country and technology by technology. The metric is the ratio of modelled to observed: 1.00 is agreement, above 1.00 means the profiles are optimistic. Typical agreement is within 10 percent.

The screen applies to *net* capacity factors, after the downstream loss stack. Resource profiles are gross by construction and will read high against IRENA if compared directly - see [Weather to Capacity Factors](../methods/weather-to-capacity-factors.md).

**What the screen is sensitive to.** The ratio responds strongly to fleet composition assumptions, and solar is the clearest case: assuming a fully tracking, optimally oriented fleet moves the ratio by 25 percentage points or more in high-irradiance countries, a larger effect than the entire loss stack. Panel orientation shows up as a latitude gradient in the ratio, which makes the screen an effective test of hemisphere and tilt handling.

**Interpretation guidance.** A ratio near 1.00 is necessary but not sufficient. It can also result from two errors of opposite sign cancelling - an over-optimistic fleet assumption offsetting an understated loss stack, for instance. Screen the components separately before accepting an aggregate match.

## Quality Metrics

- Data completeness percentages
- Validation error statistics
- Cross-dataset agreement measures
- Geographic accuracy assessments

!!! note
    Detailed validation reports generated automatically for each model.

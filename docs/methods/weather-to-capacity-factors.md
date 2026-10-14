# Weather to Capacity Factors

**How ERA5 reanalysis weather becomes the hourly capacity factor of a grid cell**

Every renewable profile in VerveStacks begins as reanalysis weather: a wind speed, a solar irradiance, a temperature on a coarse global grid. Turning that into the hourly capacity factor of a plant is a modelling step in its own right, with its own physics and its own defensible choices. This page documents that step. It sits upstream of [Renewable Energy Characterization](renewable-characterization.md), which takes the per-cell hourly profiles produced here as its starting point and proceeds to land-use adjustment, clustering and shape assignment.

The conversion is performed with [atlite](https://atlite.readthedocs.io), extended with two physical corrections for wind that are described below.

## Pipeline Position

``` text
ERA5 reanalysis, per country and weather year
     |
     |  [ this page ]  solar and wind conversion, local-time alignment
     v
hourly capacity factors per 50x50km grid cell
     |
     |  LCOE-based selection and capacity weighting
     v
country-level hourly profiles
     |
     |  land-use adjustment, clustering, shape assignment
     v
cluster profiles and model-ready timeslice parameters
```

The air density correction described below is applied inside the power curve. It cannot be represented as an adjustment to a finished capacity factor.

## Weather Inputs

Weather is drawn from ERA5 reanalysis, prepared per country and per weather year at a coarsened spatial resolution of 0.5 degrees. The variables used differ by technology:

**ERA5 variables by technology**

| **Technology** | **Variables** | **Purpose** |
|---------------|-----------------------------|-----------------------------|
| Solar PV, onshore wind | Irradiance, air temperature, wind speed, terrain elevation | Irradiance for PV; wind speed at 10 m and 100 m; elevation and temperature for the air density correction |
| Offshore wind | Wind speed, elevation | Sea level means the density correction reduces to a temperature effect, so the correction is inactive offshore |

Model builds use four weather years: **2010, 2013, 2016 and 2019**. 2013 is the default where a single year is required. The four are spaced to sample distinct circulation conditions rather than consecutive years, which would be strongly correlated.

Additional years are generated for research and sensitivity work outside the standard build. Any profile labelled with a year other than the four above should be treated as research material and checked before use, not assumed to be an equivalent weather sample.

## Local Time Alignment

A capacity factor profile is only useful if its hour labels mean what a system operator means by that hour. Cell timestamps are therefore expressed on the clock the grid actually runs on, resolved from IANA timezone geometry rather than approximated from longitude. An offset derived from longitude is solar time, not clock time, and misaligns profiles against national load curves by up to three hours in countries spanning several longitudes.

**One national clock, resolved from the modal zone.** A country takes a single offset - the most common timezone across its cells - because that is the clock its grid dispatches on. This pins China to UTC+8 nationwide rather than letting its western cells fall into a zone that exists in the timezone database but that the Chinese grid does not use.

**Per-cell resolution for genuinely multi-clock countries.** The exceptions, resolved cell by cell, are the United States, Canada, Russia, Australia, Brazil, Mexico, Indonesia, Kazakhstan, Greenland, Kiribati, French Polynesia and Antarctica.

**Standard time throughout**, never daylight saving. A profile carrying DST transitions has two discontinuities a year that are artefacts of civil timekeeping rather than of the weather, and most published load curves are given in standard time.

## Solar PV Conversion

Solar profiles are generated for a crystalline-silicon panel, with two choices that dominate the result.

### Orientation

Panel slope and azimuth are chosen **per grid cell** as the local optimum.

A globally fixed orientation cannot be correct: a fixed azimuth is backwards in one hemisphere, and a fixed mid-latitude slope is too steep near the equator and too shallow in the far north. Choosing per cell is right in both hemispheres and at every latitude, and needs no lookup table. The sensitivity is large - a poorly oriented panel loses a third or more of its output in the mid-southern latitudes.

### Tracking

Profiles represent **fixed-tilt** PV, which is what most installed capacity is.

Tracking is not applied globally, because a universally tracking and optimally oriented fleet does not exist anywhere and describing one inflates modelled output well beyond observed utilisation factors. Where a tracking fleet matters, the correct treatment is to generate a tracked variant separately and blend the two by fleet share. A single global uplift is not valid: tracking gain is strongly climate dependent, roughly 8 to 10 percent in maritime climates against 20 to 25 percent in high-DNI desert.

## Wind Conversion

Wind conversion extrapolates the reanalysis wind speed to hub height and applies a turbine power curve, with two physical corrections layered on.

### Turbine and Hub Height

Onshore uses a Vestas V112-3MW at a 100 m hub height; offshore uses the NREL 5 MW reference turbine, also at 100 m. Onshore hub height sits within the machine's catalogued range of 84 to 119 m and close to real fleet practice - German new-build is around 130 to 140 m and the global fleet average is well under 100 m.

Hub height is a high-leverage assumption. At a shear exponent of about 0.17, a 50 m change moves wind speed by roughly 7 percent and capacity factor by 10 to 15 percent, so a hub height above the reference machine's catalogued range would inflate output substantially.

### Air Density

Power curves are defined at 1.225 kg/m3 - sea level, 15 degrees C - and a turbine at altitude sees thinner air and produces less. VerveStacks applies the IEC 61400-12-1 treatment for a pitch-regulated turbine: normalise the wind speed by `(rho / rho0) ** (1/3)`, then apply the standard curve.

The correction is applied **per grid cell, before any spatial aggregation**, which is the only place it is correct. A national or zonal mean elevation would smear the Tibetan plateau into the Jiangsu coast.

Pressure comes from the International Standard Atmosphere profile at cell elevation and is combined with the *actual* hourly air temperature:

``` text
p(z) = p0 * (1 - L z / T0) ** (g / (R L))      ISA, elevation only
rho  = p(z) / (R T)                            T from hourly reanalysis
v_eff = v_hub * (rho / rho0) ** (1/3)          IEC 61400-12-1
```

This is the standard wind-resource treatment when temperature is known and pressure is not, and it is more accurate at altitude than the isothermal shortcut, which drifts 2 to 3 percent low above 3000 m. Using hourly rather than climatological temperature preserves the seasonal signal, which matters: cold winter air is denser and carries more power, and in mid-latitudes cold correlates with windy. Synoptic pressure variation is not represented, costing 2 to 3 percent in density, under 1 percent in wind speed, and nothing material in an annual capacity factor.

The size of the correction is entirely a function of terrain:

**Magnitude of the density correction, area-weighted**

| **Country**           | **Effect on capacity factor** |
|-----------------------|-------------------------------|
| Tajikistan            | 16 percent                    |
| China                 | 10 percent                    |
| Mongolia              | 8 percent                     |
| South Africa          | 6 percent                     |
| United States         | 4 percent                     |
| Germany               | 1.4 percent                   |
| United Kingdom        | 0.9 percent                   |
| Offshore, any country | none                          |

### Power Curve Treatment

A single-turbine power curve evaluated on a **cell-mean** wind speed is a category error: the cell mean is not a point wind speed, and applying a point curve to it drives a large share of offshore cell-hours to exactly rated output. No real array behaves that way.

VerveStacks therefore convolves the power curve with a Gaussian kernel over wind speed, representing the spread of speeds within a cell. This removes the unphysical flat top at rated output while leaving the overall level essentially unchanged.

!!! note "Important"
    The kernel is a **width only**, with no accompanying shift in wind speed. A speed offset is a fitted level correction that absorbs wake, availability and reanalysis bias in a single number, and applying one alongside an explicit loss stack would double count.

Because the power curve is convex below rated output, the kernel lifts low-wind sites more than good ones, which compresses the modelled spread between strong and weak wind regions. This is a known property of the treatment rather than a physical effect, and it warrants a check in applications that turn on resource heterogeneity between clusters.

Power curves also carry an explicit cut-out, so output falls to zero above the cut-out wind speed instead of being held at rated in extreme winds.

## Gross Resource, Not Net Generation

The capacity factors produced here are **gross resource capacity factors**. Wake and array losses, electrical collection and point-of-interconnection losses, availability and curtailment are applied downstream in an explicit loss stack, and are documented with the technology cost and performance assumptions rather than here.

This separation is deliberate, and it is why no fitted speed offset is applied in the power curve treatment above. A fitted offset and an explicit loss stack are two ways of doing the same job; applying both double counts. Comparing these profiles against observed utilisation factors without first applying the loss stack will therefore show them as high, correctly so.

## Conversion Settings

**Settings in force**

| **Setting** | **Value** | **Notes** |
|-------------------------|-------------------|-----------------------------|
| Spatial resolution | 0.5 degrees | Coarsened from native ERA5 |
| Solar panel | Crystalline silicon |  |
| Solar orientation | Per-cell optimum | Slope and azimuth chosen for each cell |
| Solar tracking | None | Fixed tilt; blend a tracked variant by fleet share where required |
| Onshore turbine | Vestas V112-3MW | 100 m hub height |
| Offshore turbine | NREL 5 MW reference | 100 m hub height |
| Air density correction | Active onshore | Per cell, hourly temperature; inactive offshore |
| Power curve kernel | Width only, no speed shift | Removes unphysical saturation without a fitted level correction |
| Clock | Grid operator standard time | Single national clock, except for multi-clock countries |

## Known Limitations

**Residual physics gaps**

| **Limitation** | **Consequence** |
|----------------------|--------------------------------------------------|
| Neutral shear assumption | Wind speed is extrapolated to hub height with a logarithmic profile, which assumes a neutrally stable boundary layer. Real shear varies with stability, and the stable nocturnal boundary layer is considerably steeper. This biases the diurnal *shape* rather than the annual level, so it is not absorbed by any downstream loss factor. |
| One turbine model per class | Real fleets span a wide range of specific power (W per m2 of rotor). Modern low-specific-power machines have flatter curves and materially higher capacity factors at low wind speeds, plausibly a larger effect on country capacity factor than the density correction. |
| Coarse terrain elevation | Reanalysis elevation is a grid mean, so ridge-top sites - where turbines actually go - are understated in elevation and under-corrected for density. |
| Density at terrain level | Density is evaluated at terrain elevation using near-surface temperature rather than at the hub, overstating density by roughly 1 percent and capacity factor by a few tenths of a percent. |
| Single kernel width | The power curve kernel uses one global width rather than the sub-grid wind speed variance of each cell, which varies substantially with terrain. |
| No icing or hysteresis | Cold-climate icing losses and high-wind cut-out hysteresis are not represented. |
| Synoptic pressure | Pressure comes from elevation and temperature only, costing 2 to 3 percent in density and nothing material in an annual capacity factor. |

!!! info "See also"
    [Renewable Energy Characterization](renewable-characterization.md) for what happens to these profiles next - land-use conflict resolution, resource clustering and shape assignment.

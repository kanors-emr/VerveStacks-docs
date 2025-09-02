# Variable Renewable Energy (VRE) Integration

VerveStacks employs sophisticated methodologies to integrate variable renewable energy data from multiple sources, creating spatially-explicit and temporally-accurate representations of solar and wind resources. This section documents the comprehensive VRE data processing pipeline.

## Overview

VRE integration combines three primary data sources:
- **REZoning**: Economic potential and cost data
- **Atlite**: Weather-based hourly capacity factors  
- **EMBER**: Actual generation data for demand anchoring

The integration process ensures spatial precision, temporal accuracy, and economic realism in renewable energy modeling.

## Data Flow Architecture

```{mermaid}
graph TD
    subgraph "REZoning Data"
        A1[Economic Potential<br/>50x50km Grid Cells]
        A2[LCOE Estimates<br/>by Technology]
        A3[Capacity Factors<br/>Annual Average]
    end
    
    subgraph "Atlite Weather Data"
        B1[Hourly Solar Irradiance<br/>8760 hours]
        B2[Hourly Wind Speed<br/>Multiple Heights]
        B3[Temperature Data<br/>Performance Corrections]
    end
    
    subgraph "EMBER Statistics"
        C1[Country Totals<br/>Annual Generation]
        C2[Technology Mix<br/>Solar/Wind Split]
        C3[Capacity Factors<br/>Validation Data]
    end
    
    A1 --> D[Spatial Allocation]
    A2 --> D
    A3 --> D
    
    B1 --> E[Hourly CF Calculation]
    B2 --> E
    B3 --> E
    
    C1 --> F[Demand Anchoring]
    C2 --> F
    C3 --> F
    
    D --> G[Grid Cell Assignment]
    E --> G
    F --> G
    
    G --> H[VRE Model Components]
    
    subgraph "Model Outputs"
        H --> I[Spatial Commodities<br/>elc_spv-ISO_NNNN]
        H --> J[Hourly Load Shapes<br/>8760 profiles]
        H --> K[Economic Parameters<br/>CAPEX, OPEX, LCOE]
    end
```

## Solar Integration Methodology

### 1. Spatial Processing

#### Grid Cell Allocation
Solar potential is allocated to 50x50km grid cells based on:
- **Technical potential** from land use analysis
- **Economic potential** at different cost thresholds
- **Resource quality** (capacity factors)
- **Grid connection feasibility**

```python
def allocate_solar_potential(country_iso, cost_threshold_usd_mwh=50):
    """
    Allocate solar potential to grid cells within economic thresholds
    """
    # Load REZoning data for country
    rez_data = load_rezoning_data(country_iso, technology='solar')
    
    # Filter by economic threshold
    economic_cells = rez_data[rez_data['lcoe_usd_mwh'] <= cost_threshold_usd_mwh]
    
    # Calculate allocation weights
    weights = calculate_allocation_weights(economic_cells)
    
    # Assign grid cell IDs
    grid_assignments = assign_grid_cells(economic_cells, weights)
    
    return grid_assignments
```

#### Capacity Factor Processing
```python
def process_solar_capacity_factors(grid_cell_data, weather_data):
    """
    Calculate hourly capacity factors from weather data
    """
    hourly_cf = []
    
    for hour in range(8760):
        # Get solar irradiance components
        ghi = weather_data[hour]['global_horizontal_irradiance']
        dni = weather_data[hour]['direct_normal_irradiance']
        dhi = weather_data[hour]['diffuse_horizontal_irradiance']
        
        # Temperature correction
        temp_air = weather_data[hour]['temperature_air']
        temp_correction = calculate_temperature_correction(temp_air)
        
        # PV power calculation
        pv_power = calculate_pv_power(ghi, dni, dhi, temp_correction)
        
        # Normalize to capacity factor
        capacity_factor = pv_power / grid_cell_data['rated_capacity']
        hourly_cf.append(capacity_factor)
    
    return hourly_cf
```

### 2. Economic Parameters

#### LCOE Calculation
```python
def calculate_solar_lcoe(grid_cell, economic_assumptions):
    """
    Calculate Levelized Cost of Energy for solar PV
    """
    # Capital costs (including regional adjustments)
    capex_usd_kw = economic_assumptions['solar_capex_base'] * \
                   grid_cell['regional_cost_multiplier']
    
    # Fixed O&M costs
    fixed_om_usd_kw_year = economic_assumptions['solar_fixed_om']
    
    # Variable O&M costs
    variable_om_usd_mwh = economic_assumptions['solar_variable_om']
    
    # Capacity factor and generation
    capacity_factor = grid_cell['annual_capacity_factor']
    annual_generation_mwh_mw = capacity_factor * 8760
    
    # Financial parameters
    discount_rate = economic_assumptions['discount_rate']
    lifetime_years = economic_assumptions['solar_lifetime']
    
    # LCOE calculation
    annualized_capex = capex_usd_kw * calculate_crf(discount_rate, lifetime_years)
    annual_fixed_costs = fixed_om_usd_kw_year
    
    lcoe_usd_mwh = (annualized_capex + annual_fixed_costs) / annual_generation_mwh_mw + \
                   variable_om_usd_mwh
    
    return lcoe_usd_mwh
```

## Wind Integration Methodology

### 1. Onshore Wind Processing

#### Wind Resource Assessment
```python
def assess_wind_resource(grid_cell, weather_data, turbine_specs):
    """
    Assess wind resource potential for specific turbine technology
    """
    # Extract wind speed data at hub height
    hub_height = turbine_specs['hub_height_m']
    wind_speeds = extract_wind_speeds(weather_data, hub_height)
    
    # Apply wind power curve
    power_curve = turbine_specs['power_curve']
    hourly_power = [apply_power_curve(ws, power_curve) for ws in wind_speeds]
    
    # Calculate capacity factors
    rated_power = turbine_specs['rated_power_mw']
    hourly_cf = [power / rated_power for power in hourly_power]
    
    # Annual statistics
    annual_cf = sum(hourly_cf) / 8760
    
    return {
        'hourly_capacity_factors': hourly_cf,
        'annual_capacity_factor': annual_cf,
        'wind_resource_class': classify_wind_resource(annual_cf)
    }
```

#### Turbine Technology Selection
```python
def select_optimal_turbine(grid_cell, available_turbines):
    """
    Select optimal turbine technology for grid cell conditions
    """
    wind_resource = grid_cell['wind_resource_class']
    terrain_complexity = grid_cell['terrain_complexity']
    
    # Filter suitable turbines
    suitable_turbines = []
    for turbine in available_turbines:
        if (turbine['min_wind_speed'] <= grid_cell['avg_wind_speed'] and
            turbine['terrain_suitability'] >= terrain_complexity):
            suitable_turbines.append(turbine)
    
    # Select based on economic performance
    best_turbine = None
    best_lcoe = float('inf')
    
    for turbine in suitable_turbines:
        lcoe = calculate_wind_lcoe(grid_cell, turbine)
        if lcoe < best_lcoe:
            best_lcoe = lcoe
            best_turbine = turbine
    
    return best_turbine, best_lcoe
```

### 2. Offshore Wind Processing

#### Marine Resource Assessment
```python
def assess_offshore_wind(marine_zone, weather_data, water_depth):
    """
    Assess offshore wind potential considering marine conditions
    """
    # Higher wind speeds offshore
    offshore_wind_speeds = weather_data['wind_speed_100m'] * 1.15  # Typical offshore enhancement
    
    # Foundation type selection based on water depth
    if water_depth < 50:
        foundation_type = 'fixed_bottom'
        foundation_cost_multiplier = 1.0
    elif water_depth < 200:
        foundation_type = 'floating'
        foundation_cost_multiplier = 1.8
    else:
        foundation_type = 'not_feasible'
        return None
    
    # Distance to shore cost impact
    distance_to_shore = marine_zone['distance_to_shore_km']
    transmission_cost = calculate_offshore_transmission_cost(distance_to_shore)
    
    return {
        'foundation_type': foundation_type,
        'foundation_cost_multiplier': foundation_cost_multiplier,
        'transmission_cost_usd_mw': transmission_cost,
        'enhanced_wind_speeds': offshore_wind_speeds
    }
```

## Atlite Integration

### Weather Data Processing

#### Hourly Capacity Factor Generation
```python
def generate_hourly_profiles(iso_code, technology, weather_year=2013):
    """
    Generate 8760-hour capacity factor profiles from Atlite weather data
    """
    # Load weather data for country
    weather_data = load_atlite_weather_data(iso_code, weather_year)
    
    # Technology-specific processing
    if technology == 'solar':
        hourly_cf = process_solar_weather(weather_data)
    elif technology == 'windon':
        hourly_cf = process_onshore_wind_weather(weather_data)
    elif technology == 'windoff':
        hourly_cf = process_offshore_wind_weather(weather_data)
    
    # Quality validation
    validate_capacity_factors(hourly_cf, technology)
    
    # Normalize and format
    normalized_cf = normalize_capacity_factors(hourly_cf)
    
    return {
        'technology': technology,
        'country': iso_code,
        'weather_year': weather_year,
        'hourly_profiles': normalized_cf,
        'annual_average': sum(normalized_cf) / 8760
    }
```

#### Grid-to-ISO Aggregation
```python
def aggregate_grid_to_iso(grid_cell_profiles, capacity_weights):
    """
    Aggregate grid cell profiles to country level using capacity weighting
    """
    iso_profile = [0.0] * 8760
    total_capacity = sum(capacity_weights.values())
    
    for hour in range(8760):
        weighted_cf = 0.0
        for grid_cell, capacity in capacity_weights.items():
            if grid_cell in grid_cell_profiles:
                cell_cf = grid_cell_profiles[grid_cell][hour]
                weight = capacity / total_capacity
                weighted_cf += cell_cf * weight
        
        iso_profile[hour] = weighted_cf
    
    return iso_profile
```

## EMBER Data Anchoring

### Demand Anchoring Process

#### Statistical Reconciliation
```python
def anchor_to_ember_statistics(modeled_generation, ember_data, country_iso):
    """
    Anchor modeled VRE generation to EMBER statistical data
    """
    # Get EMBER statistics for country
    ember_solar = ember_data[(ember_data['iso'] == country_iso) & 
                            (ember_data['technology'] == 'Solar')]
    ember_wind = ember_data[(ember_data['iso'] == country_iso) & 
                           (ember_data['technology'] == 'Wind')]
    
    # Calculate scaling factors
    solar_scale = ember_solar['generation_twh'].sum() / modeled_generation['solar_twh']
    wind_scale = ember_wind['generation_twh'].sum() / modeled_generation['wind_twh']
    
    # Apply scaling to maintain statistical consistency
    anchored_generation = {
        'solar_twh': modeled_generation['solar_twh'] * solar_scale,
        'wind_twh': modeled_generation['wind_twh'] * wind_scale,
        'scaling_factors': {'solar': solar_scale, 'wind': wind_scale}
    }
    
    return anchored_generation
```

## Quality Assurance

### Validation Framework

#### 1. Physical Consistency Checks
```python
def validate_physical_consistency(capacity_factors):
    """
    Ensure capacity factors are physically realistic
    """
    checks = {
        'range_check': all(0 <= cf <= 1 for cf in capacity_factors),
        'annual_average': 0.05 <= sum(capacity_factors)/8760 <= 0.65,
        'variability_check': check_reasonable_variability(capacity_factors),
        'seasonal_patterns': validate_seasonal_patterns(capacity_factors)
    }
    
    return all(checks.values()), checks
```

#### 2. Statistical Validation
```python
def validate_against_benchmarks(country_data, benchmark_sources):
    """
    Validate results against multiple benchmark sources
    """
    validations = {}
    
    for source, benchmark in benchmark_sources.items():
        correlation = calculate_correlation(country_data, benchmark)
        rmse = calculate_rmse(country_data, benchmark)
        bias = calculate_bias(country_data, benchmark)
        
        validations[source] = {
            'correlation': correlation,
            'rmse': rmse,
            'bias': bias,
            'passes_validation': correlation > 0.8 and abs(bias) < 0.1
        }
    
    return validations
```

### Performance Metrics

#### Processing Efficiency
- **Single country processing**: 30-60 seconds for complete VRE integration
- **Grid cell resolution**: Up to 1000+ cells per country
- **Temporal resolution**: Full 8760-hour profiles
- **Memory efficiency**: <2GB peak usage for largest countries

#### Quality Metrics
- **Spatial coverage**: >90% of economic potential allocated to specific grid cells
- **Temporal accuracy**: <5% deviation from Atlite weather patterns
- **Statistical consistency**: <3% deviation from EMBER country totals
- **Economic realism**: LCOE estimates within ±10% of regional benchmarks

## Model Integration

### TIMES/VEDA Output Format

#### Commodity Generation
```python
def generate_vre_commodities(country_iso, grid_assignments):
    """
    Generate spatially-explicit VRE commodities for TIMES model
    """
    commodities = []
    
    for grid_cell, data in grid_assignments.items():
        # Solar commodity
        if data['solar_potential_gw'] > 0:
            solar_commodity = {
                'commodity': f'elc_spv-{country_iso}_{grid_cell:04d}',
                'description': f'Solar PV electricity - Grid Cell {grid_cell}',
                'capacity_gw': data['solar_potential_gw'],
                'capacity_factor': data['solar_annual_cf'],
                'lcoe_usd_mwh': data['solar_lcoe']
            }
            commodities.append(solar_commodity)
        
        # Wind commodity
        if data['wind_potential_gw'] > 0:
            wind_commodity = {
                'commodity': f'elc_won-{country_iso}_{grid_cell:04d}',
                'description': f'Onshore Wind electricity - Grid Cell {grid_cell}',
                'capacity_gw': data['wind_potential_gw'],
                'capacity_factor': data['wind_annual_cf'],
                'lcoe_usd_mwh': data['wind_lcoe']
            }
            commodities.append(wind_commodity)
    
    return commodities
```

#### Load Shape Generation
```python
def generate_load_shapes(hourly_profiles, timeslice_definition):
    """
    Convert hourly profiles to TIMES timeslice load shapes
    """
    load_shapes = {}
    
    for timeslice in timeslice_definition:
        # Get hours belonging to this timeslice
        timeslice_hours = get_timeslice_hours(timeslice)
        
        # Calculate average capacity factor for timeslice
        timeslice_cf = sum(hourly_profiles[h] for h in timeslice_hours) / len(timeslice_hours)
        
        # Normalize to annual average
        annual_avg = sum(hourly_profiles) / 8760
        load_shape_value = timeslice_cf / annual_avg if annual_avg > 0 else 0
        
        load_shapes[timeslice['name']] = load_shape_value
    
    return load_shapes
```

---

```{seealso}
- [Spatial Gap-Filling](spatial-gap-filling.md) - Handling missing VRE capacity
- [Grid Modeling](grid-modeling.md) - Transmission network integration
- [Data Sources](data-sources.md) - Complete data inventory
- [Validation Methodology](../methodology/validation-approaches.md) - Quality assurance
```

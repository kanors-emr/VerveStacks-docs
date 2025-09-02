# Data Sources & Inventory

VerveStacks integrates multiple authoritative global datasets to ensure comprehensive coverage and high-quality energy system models. This page provides a complete inventory of all data sources, their characteristics, and how they contribute to model generation.

## Primary Data Sources

### 1. EMBER Climate Data
**Source**: [Ember Climate](https://ember-climate.org/data/)  
**Coverage**: Global electricity generation and capacity data (2000-2022)  
**Update Frequency**: Annual  

| File | Size | Description |
|------|------|-------------|
| `yearly_full_release_long_format.csv` | 40.3 MB | Annual electricity data by country and technology |
| `monthly_full_release_long_format.csv` | 51.8 MB | Monthly electricity generation data |
| `ember_targets_download2025jul.xlsx` | 0.1 MB | Renewable energy targets and policies |

**Key Variables**:
- Electricity generation (TWh) by technology and country
- Installed capacity (GW) by technology and country
- Capacity factors and utilization rates
- Carbon emissions from electricity generation

### 2. IRENA Renewable Energy Statistics
**Source**: [International Renewable Energy Agency](https://www.irena.org/data)  
**Coverage**: Global renewable energy capacity and generation (2000-2022)  
**Update Frequency**: Annual  

| File | Size | Description |
|------|------|-------------|
| `IRENASTAT-C.xlsx` | 0.8 MB | Renewable capacity statistics by country and technology |
| `IRENASTAT-G.xlsx` | 0.8 MB | Renewable generation statistics by country and technology |

**Technology Coverage**:
- Solar photovoltaic (utility and distributed)
- Wind (onshore and offshore)
- Hydroelectric (large and small)
- Bioenergy (solid biomass, biogas, liquid biofuels)
- Geothermal
- Marine (tidal and wave)

### 3. Weather and Climate Data (ERA5/SARAH)
**Source**: [Copernicus Climate Data Store](https://cds.climate.copernicus.eu/)  
**Coverage**: Hourly weather data for renewable energy modeling  
**Spatial Resolution**: 50x50km grid cells  
**Temporal Resolution**: Hourly (8760 hours/year)  

| File | Size | Description |
|------|------|-------------|
| `era5_combined_data_2030.csv` | 342.5 MB | Combined weather variables for 2030 projections |
| `sarah_era5_iso_grid_cell_2013.csv` | 1,389.6 MB | Grid cell level weather data for 2013 |
| `sarah_era5_iso_2013.csv` | 52.2 MB | Country-level aggregated weather data |

**Weather Variables**:
- Solar irradiance (GHI, DNI, DHI)
- Wind speed at multiple heights (10m, 100m)
- Temperature (air temperature, soil temperature)
- Precipitation and humidity
- Atmospheric pressure

### 4. REZoning (Renewable Energy Zones)
**Source**: [IRENA REZoning Programme](http://www.irena.org/rezoning)  
**Coverage**: Economic renewable energy potential by grid cell  
**Spatial Resolution**: 50x50km grid cells  

| File | Size | Description |
|------|------|-------------|
| `REZoning_Solar.csv` | 7.7 MB | Solar PV economic potential and costs |
| `REZoning_WindOnshore.csv` | 7.3 MB | Onshore wind economic potential and costs |
| `REZoning_WindOffshore.csv` | - | Offshore wind economic potential and costs |
| `REZoning_costs_per_kw.csv` | - | Technology cost assumptions by region |
| `zones_centroids.csv` | - | Geographic coordinates of renewable energy zones |

**Key Metrics**:
- Technical potential (GW) by technology and grid cell
- Economic potential (GW) at different cost thresholds
- Capacity factors by technology and location
- Levelized cost of energy (LCOE) estimates

### 5. Global Energy Monitor (GEM) Power Plant Database
**Source**: [Global Energy Monitor](https://globalenergymonitor.org/)  
**Coverage**: Individual power plant database with technical specifications  
**Update Frequency**: Quarterly  

| File | Size | Description |
|------|------|-------------|
| `Global-Integrated-Power-April-2025.xlsx` | - | Comprehensive global power plant database |

**Plant Attributes**:
- Plant name, location (coordinates), and country
- Technology type and fuel source
- Capacity (MW) and commissioning year
- Operating status (operating, planned, cancelled, retired)
- Owner/operator information
- Environmental controls and efficiency ratings

### 6. OpenStreetMap Grid Infrastructure
**Source**: [OpenStreetMap](https://www.openstreetmap.org/) via PyPSA-Eur  
**Coverage**: European transmission network infrastructure  
**Spatial Resolution**: Individual transmission assets  

| File | Size | Description |
|------|------|-------------|
| `buses.csv` | 0.8 MB | Electrical buses (substations and connection points) |
| `lines.csv` | 10.6 MB | Transmission lines with technical parameters |
| `links.csv` | - | HVDC links and interconnectors |
| `converters.csv` | - | AC/DC converter stations |
| `transformers.csv` | - | Transformer specifications |

**Infrastructure Data**:
- Transmission line capacities and impedances
- Substation locations and voltage levels
- Cross-border interconnection capacities
- HVDC link specifications

### 7. World Energy Outlook (IEA/WEO)
**Source**: [International Energy Agency](https://www.iea.org/reports/world-energy-outlook-2024)  
**Coverage**: Energy demand projections and technology assumptions  
**Scenarios**: STEPS, APS, NZE  

| File | Size | Description |
|------|------|-------------|
| `WEO2024_AnnexA_Free_Dataset_World.csv` | - | Global energy projections |
| `WEO2024_AnnexA_Free_Dataset_Regions.csv` | - | Regional energy projections |
| `IEAData.csv` | 3.2 MB | Historical energy statistics |

### 8. NGFS Climate Scenarios
**Source**: [Network for Greening the Financial System](https://www.ngfs.net/ngfs-scenarios-portal/)  
**Coverage**: Climate scenario projections for financial risk assessment  
**Models**: MESSAGEix-GLOBIOM, REMIND-MAgPIE, GCAM  

| File | Size | Description |
|------|------|-------------|
| `Downscaled_MESSAGEix-GLOBIOM 1.1-M-R12_data.xlsx` | - | IIASA model projections |
| `Downscaled_REMIND-MAgPIE 3.2-4.6_data.xlsx` | - | PIK model projections |
| `Downscaled_GCAM 6.0 NGFS_data.xlsx` | - | PNNL model projections |

**Scenario Categories**:
- **Orderly**: Early policy action, smooth transition
- **Disorderly**: Late policy action, rapid transition
- **Hot House World**: Insufficient climate action

### 9. Technology and Economic Assumptions
**Sources**: Multiple (IEA, IRENA, NREL, academic literature)  
**Coverage**: Technology cost and performance parameters  

| File | Size | Description |
|------|------|-------------|
| `ep_technoeconomic_assumptions.xlsx` | - | Capital costs, O&M, efficiency by technology |
| `advanced_parameters.xlsx` | - | Advanced technology parameters |
| `WEO_2024_PG_Assumptions_STEPSandNZE_Scenario.xlsb` | - | IEA technology projections |

## Data Quality and Validation

### Quality Assurance Framework

```{admonition} Data Quality Metrics
:class: note

**Completeness**: >95% country coverage across all major datasets  
**Timeliness**: Data updated within 12 months of source publication  
**Accuracy**: Cross-validated against multiple authoritative sources  
**Consistency**: Harmonized units and technology classifications  
```

### Validation Procedures

#### 1. Statistical Validation
```python
def validate_statistical_consistency(dataset_a, dataset_b, tolerance=0.05):
    """
    Cross-validate statistics between different data sources
    """
    correlation = calculate_correlation(dataset_a, dataset_b)
    deviation = calculate_mean_absolute_deviation(dataset_a, dataset_b)
    
    return {
        'correlation': correlation,
        'deviation': deviation,
        'passes_validation': deviation < tolerance
    }
```

#### 2. Temporal Consistency
- Year-over-year growth rate validation
- Trend analysis against historical patterns
- Anomaly detection for outlier values

#### 3. Spatial Consistency
- Geographic coordinate validation
- Administrative boundary alignment
- Cross-border flow consistency

### Data Processing Pipeline

#### Stage 1: Ingestion and Cleaning
```python
def process_raw_data(source_file, data_type):
    """
    Standardized data ingestion with quality checks
    """
    # Load raw data
    raw_data = load_data(source_file)
    
    # Apply data type specific cleaning
    cleaned_data = apply_cleaning_rules(raw_data, data_type)
    
    # Validate data quality
    quality_report = validate_data_quality(cleaned_data)
    
    # Log processing results
    log_processing_results(source_file, quality_report)
    
    return cleaned_data, quality_report
```

#### Stage 2: Harmonization
- Technology classification mapping
- Unit standardization (MW, GWh, USD)
- Temporal alignment to common base years

#### Stage 3: Integration
- Multi-source data reconciliation
- Gap filling for missing values
- Spatial allocation and disaggregation

## Data Lineage and Traceability

### Complete Audit Trail
Every data point in VerveStacks models maintains complete lineage:

```python
class DataLineage:
    def __init__(self, value, source, processing_steps):
        self.value = value
        self.original_source = source
        self.processing_history = processing_steps
        self.validation_results = []
        self.last_updated = datetime.now()
    
    def add_processing_step(self, step_description, transformation):
        """Record each data transformation"""
        self.processing_history.append({
            'timestamp': datetime.now(),
            'description': step_description,
            'transformation': transformation,
            'previous_value': self.value
        })
```

### Reproducibility Guarantees
- **Deterministic processing**: Same inputs always produce identical outputs
- **Version control**: Complete Git history of all data and code changes
- **Environment specification**: Exact software versions and dependencies
- **Processing logs**: Detailed records of all transformation steps

## Update Procedures

### Automated Data Updates
```python
def check_for_data_updates():
    """
    Automated system to check for new data releases
    """
    sources_to_check = [
        {'name': 'EMBER', 'url': 'https://ember-climate.org/data/', 'frequency': 'annual'},
        {'name': 'IRENA', 'url': 'https://www.irena.org/data', 'frequency': 'annual'},
        {'name': 'GEM', 'url': 'https://globalenergymonitor.org/', 'frequency': 'quarterly'}
    ]
    
    for source in sources_to_check:
        latest_version = check_latest_version(source)
        current_version = get_current_version(source['name'])
        
        if latest_version > current_version:
            notify_update_available(source, latest_version)
```

### Manual Review Process
1. **Data validation**: Comprehensive quality checks on new data
2. **Impact assessment**: Analysis of changes from previous version
3. **Model testing**: Validation runs on subset of countries
4. **Documentation update**: Revision of methodology documentation
5. **Release approval**: Final review and deployment authorization

## Summary Statistics

### Data Volume and Coverage
- **Total Files**: 66+ data files from 14+ authoritative sources
- **Geographic Coverage**: 190+ countries and territories
- **Temporal Coverage**: 2000-2050 (historical + projections)
- **Spatial Resolution**: 50x50km grid cells (~24,000 global cells)
- **Total Data Volume**: >4.5 GB of processed data

### Update Frequency
- **Real-time**: Weather data (hourly updates available)
- **Quarterly**: Power plant database (GEM)
- **Annual**: Statistical datasets (IRENA, EMBER, IEA)
- **Scenario updates**: Every 2-3 years (NGFS, WEO)

---

```{seealso}
- [Spatial Gap-Filling Methodology](spatial-gap-filling.md) - Handling missing data
- [VRE Integration](vre-integration.md) - Renewable energy data processing
- [Grid Modeling](grid-modeling.md) - Infrastructure data utilization
- [Validation Methodology](../methodology/validation-approaches.md) - Quality assurance
```

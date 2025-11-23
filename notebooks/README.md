# Notebooks

## Instructions for Running and Testing This Workflow

This notebook uses ArcGIS Pro 3.5 and its Python environment to prepare, analyze, and model wildfire conditions across California. To run run or test this workflow should follow the guidance below.

### 1. Required Software and Environment

- ArcGIS Pro 3.5 (required for ArcPy)
- ArcGIS Pro default Python environment
- Jupyter Notebook or JupyterLab
- Python 3.9+ (bundled with ArcGIS Pro 3.5)

Launch Jupyter Notebook from the ArcGIS Pro Python environment so that ArcPy is available.

---

### 2. Required Python Libraries and Packages

The following libraries must be installed in the ArcGIS Pro environment:

**GIS and Data Handling**

- arcpy
- os
- numpy
- pandas

**Machine Learning**

- scikit-learn
  - RandomForestClassifier
  - MLPClassifier
  - train_test_split
  - accuracy_score
  - precision_recall_fscore_support
  - confusion_matrix
  - roc_curve
  - auc
  - precision_recall_curve

If scikit-learn is missing, install it in the ArcGIS Pro environment:

### 3. Required Folder Structure and Input Data

It is important to maintain the following folder and geodatabase structure or update notebook paths accordingly:

```shell
C:\AH_Files\CalFire_NN_Project
├── 02_data_work
│ └── CAL_FIRE_WorkSpace_A\_\_GIS_DataSets.gdb
├── 10-SimplePredictions.gdb
├── 11-NN_Predictions.gdb
├── 13_NN_ML_90_target_DataSet.gdb
└── 14_RF_ML_90_target_DataSet.gdb
```

The source geodatabase must contain:

- CalFire_Master_DataSet_C_Final_for_SpatialAnalysis
- monthly_longlat_Temporal_Data

---

### 4. How to Run the Notebook

Run the notebook cells in order, from top to bottom:

Cell 1 — Preparing Base Fire, Weather, Hazard, and Temporal Datasets (GIS Preprocessing)

- Creates working geodatabases
- Copies and cleans fire perimeter, weather, and hazard fields
- Standardizes numeric fields and prepares the base datasets

Cell 2 — Building Machine Learning Feature Classes for Random Forest (RF) and Neural Network (NN)

- Builds machine learning geodatabases for both Random Forest (RF) and Neural Network (NN)
- Performs spatial joins linking fire perimeters with monthly weather data
- Adds a fire/no-fire label
- Produces RF-ready and NN-ready training feature classes

Cell 3 — Random Forest (RF) Model Training, Testing, and Accuracy Evaluation

- Extracts RF predictor variables
- Splits RF dataset into training and testing
- Trains the Random Forest classifier
- Computes accuracy, precision, recall, F1-score, ROC curves, and PR curves

Cell 4 — Exporting Random Forest (RF) Results to Geodatabase (Statistics, Curves, Predictions)

- Exports RF metrics and curve tables to the RF geodatabase
- Creates RF test prediction feature class with probability and prediction fields

Cell 5 — Neural Network (NN) Model Training, Testing, and Metrics Extraction

- Extracts NN predictor variables
- Splits NN dataset into training and testing
- Trains the Neural Network classifier (MLPClassifier)
- Computes accuracy, precision, recall, F1-score, ROC curves, and PR curves

Cell 6 — Exporting Neural Network (NN) metrics, curves, and test predictions to geodatabase

- Exports NN metrics and curve tables to the NN geodatabase
- Creates NN test prediction feature class with probability and prediction fields

---

### 5. Notes:

- All folder paths and geodatabases must exist before running the notebook.
- Spatial joins require a licensed ArcGIS Pro installation.
- Larger datasets may require additional system memory.
- Users may substitute their own wildfire or climate datasets if the schema is adjusted accordingly.
- The workflow expects consistent field names in both RF and NN feature classes.

---

### 6. Additional Testing and Extension Options

Extending the workflow to:

- Adding seasonal, weekly, or yearly temporal predictors
- Incorporating vegetation, hazard classification, or terrain variables
- Testing more neural network architectures
- Comparing RF and NN results in additional evaluation tables
- Rebuilding datasets with updated fire perimeter or climate data

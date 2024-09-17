
# A Framework for Synthetic fNIRS Data Generation

**Authors**: Mario De Los Santos-Hernández¹, Luis Enrique Sucar¹, Felipe Orihuela-Espina²  
¹ Instituto Nacional de Astrofísica, Óptica y Electrónica (INAOE), México  
² University of Birmingham, UK

## Overview

This framework offers a versatile solution for generating synthetic and semisynthetic functional near-infrared spectroscopy (fNIRS) data, incorporating both physiological and instrumental noise. It is designed to facilitate validation and algorithm development in cases where ground truth data is unavailable.

The framework builds on the **Tak and Friston's bilinear model** to simulate fNIRS signals, including neurodynamics, hemodynamics, and optics. By generating synthetic and semisynthetic datasets, it provides researchers with the tools necessary to simulate realistic neuroimaging scenarios for validating fNIRS data processing algorithms.

## Features

- **Bilinear Model**: Models neurodynamics, blood flow, and optical density changes.
- **Flexible Noise Generation**: Simulates realistic conditions by incorporating physiological (e.g., heart rate, breathing, vasomotion), motion artifacts, and instrumental noise.
- **Synthetic Noise Generation**: Includes customizable noise models (e.g., heart rate, breathing, and colored noise).
- **Semisynthetic Noise Generation**: Combines precompiled resting-state fNIRS data with the ability to add custom datasets.
- **User-Friendly Interface**: Allows data generation without coding experience, using an intuitive graphical user interface (GUI).

## Installation

To install the bilinear model and its associated tools, run the following command (for some reason is not working right now (September-17, 2024), We are working to get it back):

```bash
pip install bilinear-model-mdls
```

## Usage

The framework allows users to:

- **Generate Synthetic Data**: Users can create datasets with synthetic physiological noises.
- **Generate Semisynthetic Data**: Merge resting-state fNIRS data with synthetic noise, including custom datasets for controlled experiments.

### User Interface

The GUI provides an easy-to-use platform for generating and customizing synthetic fNIRS data, controlling the signal-to-noise ratio (SNR), variability, and other noise characteristics.

For code-based implementation, refer to the repository:

- [GitHub Repository](https://github.com/MarSH-Up/Bilinear-model)

## Results

- The framework generates datasets with synthetic or semisynthetic noise across up to 10 regions at this moment.
  
- The framework provides access to a user-friendly interface via the BilinearModel_frontend. Detailed instructions for running and using the interface can be found within the repository.

## References

1. Tak, S. et al. (2015). Bilinear model for fNIRS neurodynamics. *Neuroimage*, 111, 338-349.
2. Elwell, C. E. et al. (1999). Oxygen transport to tissue using synthetic physiological noise. *Oxygen Transport to Tissue XXI*, 57–65.
3. Montero-Hernandez, S. et al. (2018). Probabilistic semisynthetic noise generation for neuroimaging. *Probabilistic Graphical Models Conference*, 296–307.

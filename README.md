# Project of Projected Population Mapping

**Website Link:**
[https://poblacionproyectadacostarica.netlify.app/](https://poblacionproyectadacostarica.netlify.app/)

## Introduction

This project was developed using **Grass GIS** and **QGIS** (Quantum Geographic Information System), which is an open-source and free program specialized in Geographic Information Systems (GIS) that allows working with spatial data.

Next, **HTML** was used along with **JavaScript** and the necessary libraries to display the mapping as specified, with the projected coordinates shown in **OpenStreetMap**.

## Creation of Vector Data

The data for the cantons were used as the base, and a new column for **projected population** was added.

## Exporting GeoJSON Files

The files were exported to **GeoJSON** using **QGIS**, which offers an easy layer export feature by right-clicking on the layer and selecting "Export."

## Creation of the Website

Using **HTML**, the **Leaflet** library was included, which enables interactive maps from a chosen provider.

By importing **Leaflet**, a base map layer from **OpenStreetMap** was added to the website.

Through **JavaScript**, a system of layers was implemented where users can switch between layers on the **Costa Rica** map in **OpenStreetMap** using buttons.

It is important to note that the projection of coordinates in **OpenStreetMap** is **EPSG:4326**, also known as **WGS 84** (World Geodetic System 1984).

## Website Hosting

The project was hosted using the hosting application **Netlify**. The program was uploaded to a **GitHub** repository, and through **Netlify**, the “main” function of the **GitHub** repository can be hosted to run the program via a web link.

## Layer Creation

### Cantons

A vector layer with the **CRTM05** projection, which contains all the cantons in **Costa Rica**, was used as the base to create the remaining layers.

### Random Points

Random points were created using the **v.random** function in **Grass**.

### Heatmaps

Heatmaps were created using **v.surf.rst** in **Grass**, along with the **Heatmap (Kernel Density Estimation)** function in **QGIS**. Both perform the same function of interpolating a raster map. The interpolated layers used were the random points. For web display, it was not possible to load them in **OpenStreetMap** due to the complexity of the file.

### Hospitals/Schools

**(Example image: Hospitals with the highest population 2022)**

To create points for hospitals and schools with the highest population, the **Heatmap** layer was used because it contains values for the population per area. Both layers (heatmap and hospital points) were filtered through a **raster calculator**. The filter selects only the points with a value greater than 20 (a parameter that defines the population per zone as 0-36).

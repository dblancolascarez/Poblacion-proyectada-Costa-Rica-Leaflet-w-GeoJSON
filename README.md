# Proyecto de Mapeo de Población Proyectada

**Dirección de Sitio Web:**  
[https://poblacionproyectadacostarica.netlify.app/](https://poblacionproyectadacostarica.netlify.app/)

## Introducción

El siguiente proyecto se trabajó en **Grass GIS** y **QGIS** (abreviatura de *Quantum Geographic Information System*), que es un programa de código abierto y gratuito especializado en Sistemas de Información Geográfica (GIS) que permite trabajar con datos espaciales. 

Seguidamente, se trabajó en **HTML** junto con **JavaScript** y las librerías necesarias para poder mostrar el mapeado de lo especificado, con las coordenadas proyectadas en **OpenStreetMap**.

## Creación de Datos Vectoriales

Se han tomado como base los datos de los cantones y se agregó una columna de **población proyectada**.

## Exportación de Archivos GeoJSON

Los archivos fueron exportados a **GeoJSON** mediante **QGIS**, el cual ofrece una exportación de capa fácil mediante un clic derecho en la capa y seleccionando "Exportar".

## Creación de La Página Web

Utilizando **HTML**, se ha incluido la librería **Leaflet**, que permite mostrar mapas interactivos de algún proveedor determinado. 

Importando **Leaflet**, se agregó una capa de mapa base del proveedor **OpenStreetMap** a la página web.

Por medio de **JavaScript**, se implementó un sistema de capas donde se pueden cambiar, por medio de botones, cada capa sobre el mapa de **Costa Rica** en **OpenStreetMap**. 

Cabe recalcar que la proyección de las coordenadas en **OpenStreetMap** es **EPSG:4326**, o mejor conocida como **WGS 84** (World Geodetic System 1984).

## Hosting de Sitio Web

El proyecto fue subido mediante la aplicación de hosting **Netlify**. Se subió el programa a un repositorio de **GitHub**, y mediante el uso de **Netlify**, se puede alojar la función “main” de dicho **GitHub** para poder ejecutar el programa mediante un link en la web.

## Creación de Capas

### Cantones

Fue utilizada una capa vectorial con proyección **CRTM05**, que contiene todos los cantones del territorio de **Costa Rica**, la cual fue la base para crear el resto de las capas.

### Puntos Aleatorios

Los puntos aleatorios fueron creados utilizando la función de **v.random** de **Grass**.

### Mapas de Calor

Los mapas de calor fueron creados utilizando **v.surf.rst** de **Grass**, y utilizando la función **Heatmap (Kernel Density Estimation)** de **QGIS**. Ambas realizan la misma función de interpolar un plano ráster. Las capas interpoladas fueron las de puntos aleatorios. Para efectos de la representación en web, no fue posible que cargara en **OpenStreetMap** debido a la complejidad del archivo.

### Hospitales/Escuelas

**(Imagen de ejemplo: Hospitales mayor población 2022)**

Para la creación de los puntos de hospitales y escuelas con más población, se utiliza la capa de **Heatmap**, ya que esta posee valores de la cantidad de población por zona. Se filtran ambas capas (mapa de calor y puntos de hospitales) y se realiza un filtro mediante una **calculadora ráster**. El filtro elige únicamente los puntos que posean un valor mayor a 20 (parámetro que establece población por zona de 0-36).

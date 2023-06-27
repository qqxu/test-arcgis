import React, { useEffect } from 'react';
import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import Basemap from '@arcgis/core/Basemap';
import TileLayer from '@arcgis/core/layers/TileLayer';
import Search from '@arcgis/core/widgets/Search';
import Weather from '@arcgis/core/widgets/Weather';

import './index.css';

const MapComponent = () => {
  useEffect(() => {
    const map = new Map({
      basemap: new Basemap({
        baseLayers: [
          new TileLayer({
            url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer',
          }),
        ],
      }),
    });

    const view = new SceneView({
      container: 'mapView',
      map: map,
      center: [121, 31, 5000],
      zoom: 12,
      heading: 95, // direction the camera is looking
      tilt: 65 // tilt of the camera relative to the ground
    });
    const searchWidget = new Search({
      view: view,
    });
  
    view.ui.add(searchWidget, 'top-right');

    const weatherWidget = new Weather({
      view: view,
    });

    view.ui.add(weatherWidget, 'top-left');


  }, []);

  return <div id="mapView" style={{ height: '100vh' }}></div>;
};

export default MapComponent;
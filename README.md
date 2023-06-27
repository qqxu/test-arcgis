### 初始化项目

1、初始化
npx create-react-app test-arcgis


2、新建页面
在页面层级建map需要的container

```
import React, { useEffect } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Basemap from '@arcgis/core/Basemap';
import TileLayer from '@arcgis/core/layers/TileLayer';

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

    const view = new MapView({
      container: 'mapView',
      map: map,
      center: [121, 31],
      zoom: 13,
    });
  }, []);

  return <div id="mapView" style={{ height: '100vh' }}></div>;
};

export default MapComponent;

```



3、添加search ui, 发现样式不对
导入css

```
// map-component.js
import './index.css';

// index.css
@import "~@arcgis/core/assets/esri/themes/light/main.css";

```



4、点击图层 添加popup ，发现无法显示 popup
[arcgis js API](https://developers.arcgis.com/javascript/latest/api-reference/)

```
    view.popupEnabled = false;  // 添加这一行就可以显示popup: 禁止自动展示，通过openPopup唤起
    view.on("click", (event) => {
      const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
      const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

      view.openPopup({
        title: "Reverse geocode: [" + lon + ", " + lat + "]",
        location: event.mapPoint // Set the location of the popup to the clicked location
      });
    });
```


5、添加天气组件
- 必须使用 SceneView  [map可以传给view，有两类view，mapview是用来展示2D，sceneView可以用来展示3D](https://developers.arcgis.com/javascript/latest/maps-and-views/)

- 将地图缩放至低海拔区域
[下雨的祖冲之路](./public/imgs//rain.png)

```

  const view = new SceneView({
      container: 'mapView',
      map: map,
      center: [121, 31],
      zoom: 12,
    });

    const weatherWidget = new Weather({
      view: view,
    });

    view.ui.add(weatherWidget, 'top-left');


```


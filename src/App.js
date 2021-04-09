import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from '@arcgis/core/config.js';

import "./App.css";

function App() {

  // Required: Set this property to insure assets resolve correctly.
  esriConfig.assetsPath = './assets'; 
  // esriConfig.portalUrl = 'https://geodata.maps.arcgis.com/'; 

  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const map = new WebMap({
        portalItem: { // autocasts as new PortalItem()
          id: "e48190cc1b8b409c8d01ef6685cb42a4"  // ID of the WebScene on arcgis.com
        }
      });

      const mapView = new MapView({
        map: map,
        container: mapDiv.current,
      }).when((mapView) => {
      });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;

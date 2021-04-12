import React, { useRef, useEffect, useState } from "react";
import { AppContext } from "./state/context";

import "./App.css";
import Map from "./components/Map";
import RouteWidget from "./components/RouteWidget";

// Klasser nødvendig for å autentisere mot ArcGIS Online
// import esriConfig from '@arcgis/core/config.js';
// import IdentityManager from '@arcgis/core/identity/IdentityManager';
// import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
// import Portal from '@arcgis/core/portal/Portal';

function App() {

  // TODO: Autentiser ved oppstart
  // https://developers.arcgis.com/javascript/latest/sample-code/identity-oauth-basic/
  useEffect(() => {
    // TODO: Legg inn riktig portalUrl (NTNU's ArcGIS Online konto)
    // esriConfig.portalUrl = "https://geodata.maps.arcgis.com/";

    // var info = new OAuthInfo({
    //   // TODO: Legg inn riktig appId (clientid) opprettet på developers.arcgis.com
    //   appId: "id3Q2AFr5FLf1nOY",
    //   // Uncomment the next line and update if using your own portal
    //   portalUrl: esriConfig.portalUrl,
    //   popup: false
    // });
    // const portal = new Portal(esriConfig.portalItem);

    // IdentityManager.registerOAuthInfos([info]);
    // IdentityManager.getCredential(esriConfig.portalUrl + "/sharing").then((res) => {
    //   portal.load();
    // });
  }, []);

  // Opprett store som sendes rundt til ulike komponenter
  const [mapView, setMapView] = useState(null); // Vi tar vare på mapView objektet så vi får tilgang til dette overalt
  const [point, setPoint] = useState({ //Create a point
    type: "point",
    latitude: 63.4305,
    longitude: 10.4500
  });

  const store = {
    mapView: { value: mapView, set: setMapView },
    point: { value: point, set: setPoint },
  }

  return (
    <AppContext.Provider value={store}>
      <div style={{ height: "100%", width: "100%" }}>
        <Map/>
        <RouteWidget />
      </div>
    </AppContext.Provider>

  );
}

export default App;

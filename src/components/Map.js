import React, { useRef, useEffect, useContext } from "react";
import { AppContext } from "../state/context";

import esriConfig from '@arcgis/core/config.js';
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
// import Locate from '@arcgis/core/widgets/Locate';
import Graphic from "@arcgis/core/Graphic";

import "../App.css";

const Map = () => {
      const context = useContext(AppContext);

      // Required: Set this property to insure assets resolve correctly.
      esriConfig.assetsPath = './assets';

      const mapDiv = useRef(null);

      // Tegn punktgrafikk 
      // useEffect(() => {
      //       if (context.mapView.value) {
      //             const mapView = context.mapView.value;
                  
      //             mapView.graphics.removeAll();

      //             const simpleMarkerSymbol = {
      //                   type: "simple-marker",
      //                   color: [226, 119, 40],  // Orange
      //                   outline: {
      //                         color: [255, 255, 255], // White
      //                         width: 1
      //                   }
      //             };

      //             const pointGraphic = new Graphic({
      //                   geometry: context.point.value,
      //                   symbol: simpleMarkerSymbol
      //             });

      //             mapView.graphics.add(pointGraphic);
      //       }
      // }, [context.point.value, context.mapView.value]);

      // Opprett kartet
      useEffect(() => {
            if (mapDiv.current) {
                  const map = new WebMap({
                        portalItem: { // autocasts as new PortalItem()
                              id: "d802f08316e84c6592ef681c50178f17"  // ID of the WebScene on arcgis.com
                        }
                  });

                  const mapView = new MapView({
                        map: map,
                        container: mapDiv.current,
                  }).when((mapView) => {
                        // Når kartet er initialisert:

                        // TODO: Initialisere Locate-widget og legge denne til i kartviewet
                        // https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html
                        // const locateWidget = "???"
                                                
                        // TODO: Når locate-widget lokaliserer, sett ruteberegnerens startpunkt
                        // locateWidget.on("locate", function(locateEvent){
                        //       if (locateEvent.position.coords) {
                        //             context.point.set(
                        //                   {
                        //                         type: "point",
                        //                         latitude: locateEvent.position.coords.latitude,
                        //                         longitude: locateEvent.position.coords.longitude
                        //                   }
                        //             )
                        //       }
                        // });

                        // TODO: Legge til click event på kartet, og bruke klikkets koordinat som ruteberegnerens startpunkt
                        // mapView.on("click", (event) => {
                        //       context.point.set(event.mapPoint);
                        // });

                        context.mapView.set(mapView);
                  });

            }
      }, []);

      return <div className="mapDiv" ref={mapDiv}></div>;
}

export default Map;

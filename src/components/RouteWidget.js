import React, { useState, useContext } from 'react';
import { AppContext } from "../state/context";
import { isMobile } from "react-device-detect";
import { MenuItem, TextField, Button } from '@material-ui/core';

import "../App.css";
import getRandomRoute from '../utils/routeUtils';

const RouteWidget = () => {
      const context = useContext(AppContext);

      const [length, setLength] = useState(0); // Lengde på kalkulert rute
      const [radius, setRadius] = useState(1.5); // Radius rundt brukerens posisjon

      // TODO: Kalkuler ca antall skritt basert på rutens lengde. 
      const getSteps = (length) => {
      }

      // Finn rute
      const getRoute = () => {
            const point = context.point.value;

            // Finn en rute. Input er punkt (valgt i kart eller ut fra brukerens posisjon), og radius
            getRandomRoute(point, radius).then((result) => {
                  const mapView = context.mapView.value; // Vi henter mapView fra context

                  // Vi sletter gamle linjer fra kartet når det hentes en ny
                  const oldLine = mapView.graphics.items.filter((item) => { return item.geometry.type === "polyline" })[0];
                  mapView.graphics.remove(oldLine);

                  // TODO: Legg til ruten i kartet. 
                  const route = result.routeResults[0].route;

                  // TODO: Hva er feil med symbologien?
                  // https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html
                  // route.symbol = {
                  //       type: "simpleline",
                  //       color: "#3f51b5",
                  //       width: "2"
                  // };

                  // // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#graphics
                  // mapView.graphics.???;

                  // TODO: Hent lengden på ruten fra rutens attributter og legg verdien i length-staten.
                  setLength("??");
            });
      }

      return (
            <div className={isMobile ? "widgetContainerMobile" : "widgetContainer"}>
                  {/* Hvor mange skritt vil du gå idag? 
                  <div style={{margin:"20px"}}>
                        <TextField id="select" label="Skritt" value={radius} select onChange={(e) => setRadius(e.target.value)}>
                              <MenuItem value={0.5}>3000</MenuItem>
                              <MenuItem value={0.7}>5000</MenuItem>
                              <MenuItem value={1.5}>10000</MenuItem>
                        </TextField>
                  </div> */}
                  <Button variant="contained" color="primary" onClick={() => getRoute()}>
                        Finn rute
                  </Button>
                  {/* TODO: Vis informasjon om rutens lengde og antall skritt*/}
                  {length > 0 &&
                        <div style={{ padding: "10px" }}>
                              <div>
                                    X kilometer
                              </div>
                              <div>
                                    ~ {getSteps(length)} skritt
                              </div>
                        </div>
                  }
            </div>
      );
};

export default RouteWidget;

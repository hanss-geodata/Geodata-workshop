import React, { useState, useContext } from 'react';
import { AppContext } from "../state/context";
import { MenuItem, TextField, Button } from '@material-ui/core';

import "../App.css";
import getRandomRoute from '../utils/routeUtils';

const RouteWidget = () => {
      const context = useContext(AppContext);

      const [length, setLength] = useState(0); // Lengde på kalkulert rute
      const [radius, setRadius] = useState(1.5); // Radius rundt brukerens posisjon

      // TODO: Kalkuler ca antall skritt basert på rutens lengde. 1 km = ca 1400 skritt
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

                  const route = result.routeResults[0].route;
                  
                  // TODO: Legg til et symbol for polylinjen
                  // https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html
                  route.symbol = {};
                  
                  // TODO: Legg til ruten i kartet. 
                  // // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#graphics
                  // mapView.graphics.???;

                  // TODO: Hent lengden på ruten fra rutens attributter og legg verdien i length-staten.
                  setLength("??");
            });
      }

      // TODO: Returner en annen klasse dersom brukeren er på mobil
      const getDesktopOrMobileClass = () => {
            return "widgetContainer";
      }

      return (
            <div className={getDesktopOrMobileClass()}>
                  {/* TODO: Legg inn en dropdown som oppdaterer "radius"-staten */}
                  {/* Hvor mange skritt vil du gå idag? 
                  <div style={{margin:"20px"}}>
                        <TextField 
                              id="select" 
                              label="Skritt" 
                              value={radius} 
                              select 
                              onChange={(event) => {
                                    // TODO: Oppdater "radius"-staten med ny verdi fra eventet, og legg til flere MenuItems
                              }}>
                              <MenuItem value={0.5}>3000</MenuItem> 
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

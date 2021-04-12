import React, { useState, useContext } from 'react';
import { AppContext } from "../state/context";
import {isMobile} from "react-device-detect";
import { MenuItem, TextField, Button } from '@material-ui/core';

import "../App.css";
import getRandomRoute from '../utils/routeUtils';

const RouteWidget = () => {
      const context = useContext(AppContext);

      const [length, setLength] = useState(0); // Lengde på kalkulert rute
      const [radius, setRadius] = useState(1.5); // Radius rundt brukerens posisjon

      // const [hightlightPoint, setHighlightPoint] = useState(null);

      // Kalkuler ca antall skritt basert på rutens lengde
      const getSteps = (length) => {
            return Math.floor((length) * 1400);
      }

      // Finn rute
      const getRoute = () => {
            const point = context.point.value;

            getRandomRoute(point, radius).then((result) => {
                  // if (result.point1.attributes.POI !== null) {
                  //       setHighlightPoint(result.point1)
                  // } else if (result.point2.attributes.POI !== null) {
                  //       setHighlightPoint(result.point2);
                  // }

                  const mapView = context.mapView.value;

                  const oldLine = mapView.graphics.items.filter((item) => { return item.geometry.type === "polyline" })[0];
                  mapView.graphics.remove(oldLine);

                  const route = result.data.routeResults[0].route;

                  route.attributes.name = "route";
                  route.symbol = {
                        type: "simple-line",
                        color: "#3f51b5",
                        width: 3
                  };

                  mapView.graphics.add(route);
                  setLength(route.attributes.Total_Kilometers);
            });
      }

      return (
            <div className={isMobile ? "widgetContainerMobile" : "widgetContainer"}>
                  {/* {hightlightPoint && 
                        <div>Fant et punkt!</div>
                  }  */}
                  Hvor mange skritt vil du gå idag? 
                  <div style={{margin:"20px"}}>
                        <TextField id="select" label="Skritt" value={radius} select onChange={(e) => setRadius(e.target.value)}>
                              <MenuItem value={0.5}>3000</MenuItem>
                              <MenuItem value={0.7}>5000</MenuItem>
                              <MenuItem value={1.5}>10000</MenuItem>
                        </TextField>
                  </div>
                  <Button variant="contained" color="primary" onClick={() => getRoute()}>
                        Finn rute
      </Button>
                  {length > 0 &&
                        <div style={{ padding: "10px" }}>
                              <div>
                                    {length.toFixed(1)} kilometer
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

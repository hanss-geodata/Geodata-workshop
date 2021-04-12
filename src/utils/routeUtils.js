import QueryTask from "@arcgis/core/tasks/QueryTask";
import RouteTask from "@arcgis/core/tasks/RouteTask";
import Query from "@arcgis/core/tasks/support/Query";
import FeatureSet from "@arcgis/core/tasks/support/FeatureSet";
import RouteParameters from "@arcgis/core/tasks/support/RouteParameters";
import Graphic from "@arcgis/core/Graphic";

function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
}

const getRandomRoute = (point, radius) => {
      return new Promise((resolve, reject) => {
            const routeService = "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

            const queryTask = new QueryTask("https://services1.arcgis.com/DIcffHalFljSYvfk/arcgis/rest/services/POI_trondheim/FeatureServer/0");
            const query = new Query();
            query.returnGeometry = true;
            query.geometry = point;
            query.distance = radius;
            query.units = "kilometers";
            query.outFields = ["*"];

            queryTask.execute(query).then((results) => {
                  const routeTask = new RouteTask({
                        url: routeService
                  });

                  const fromGraphic = new Graphic({
                        geometry: point,
                  });

                  const shuffledArray = shuffle(results.features);

                  var routeParams = new RouteParameters({
                        stops: new FeatureSet({
                              features: [fromGraphic, shuffledArray[0], shuffledArray[1], fromGraphic] // Pass the array of graphics
                        }),
                        returnDirections: false
                  });

                  return routeTask.solve(routeParams).then(function (data) {
                        // Display the route
                        resolve(
                              {
                                    data: data,
                                    point1: shuffledArray[0],
                                    point2: shuffledArray[1]
                              });
                  }).catch((error) => {
                        resolve([]);
                  });
            });
      });
}

export default getRandomRoute;
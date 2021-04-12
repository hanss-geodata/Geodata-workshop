import QueryTask from "@arcgis/core/tasks/QueryTask";
import RouteTask from "@arcgis/core/tasks/RouteTask";
import Query from "@arcgis/core/tasks/support/Query";
import FeatureSet from "@arcgis/core/tasks/support/FeatureSet";
import RouteParameters from "@arcgis/core/tasks/support/RouteParameters";
import Graphic from "@arcgis/core/Graphic";

// Hjelpefunksjon for å blande rekkefølgen på en array
function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
}

const getRandomRoute = (point, radius) => {
      return new Promise((resolve, reject) => {
            // Initialiser ruteberegningstjeneste
            const routeService = "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
            const routeTask = new RouteTask({
                  url: routeService
            });

            // TODO: Initialiser et querytask på featurelayeret ditt
            const queryTask = new QueryTask("URL TIL LAYER. HUSK LAYERID");

            // TODO: Bygg opp et query som bruker input "point" som geomeri og søker i en avstand "radius" kilometer fra punktet. 
            // Husk at geometrien også må returneres
            // https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-Query.html#properties-summary
            const query = new Query();
            query.outFields = ["*"];

            queryTask.execute(query).then((results) => {
                  // Bland listen av features returnert av queryet
                  const shuffledArray = shuffle(results.features);

                  // Lag en graphic av "point", punktet vi står i/punktet valgt i kartet
                  const fromGraphic = new Graphic({
                        geometry: point,
                  });

                  // TODO: Lag et nytt featureset som starter og slutter i fromGraphic, 
                  // og ett, to eller flere av punktene fra den blandede listen av features mellom start og slutt. 
                  const featureSet = new FeatureSet({
                        features: [] 
                  })

                  // Opprett RouteParameters. 
                  // https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-RouteParameters.html#travelMode
                  const routeParams = new RouteParameters({
                        stops: featureSet,
                        returnDirections: false
                  });

                  return routeTask.solve(routeParams).then(function (data) {
                        resolve(data);
                  }).catch((error) => {
                        resolve([]);
                  });
            });
      });
}

export default getRandomRoute;
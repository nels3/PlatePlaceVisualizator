import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import mapGeoConfig from "src/components/map/MapConfig";
import Markers from "src/components/map/Markers";
import MapFilters from "src/components/map/MapFilters";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";

export default function Map() {
  return (
    <>
      <MapFilters />
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [58, 20, 0],
          scale: 400,
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>
        <Markers />
      </ComposableMap>
    </>
  );
}

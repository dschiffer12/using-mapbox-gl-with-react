import * as React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapboxMapProps {
  initialOptions?: Omit<mapboxgl.MapboxOptions, "container">;
  onCreated?(map: mapboxgl.Map): void;
  onLoaded?(map: mapboxgl.Map): void;
  onRemoved?(): void;
}

function MapboxMap({
  initialOptions = {},
  onCreated,
  onLoaded,
  onRemoved,
}: MapboxMapProps) {
  const [map, setMap] = React.useState<mapboxgl.Map>();

  const mapNode = React.useRef(null);

  React.useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: "pk.eyJ1IjoiZHNjaGlmZmVyMTIiLCJhIjoiY2xiZHQ5bTFuMDRtajNvbzQ3c3VudmhvMiJ9.2uvgoSuAn4BT_WJxTGQCZw",
      style: "mapbox://styles/dschiffer12/cljjnamwy001k01rdcppdg3tv",
      center: [-74.5, 40],
      zoom: 9,
      ...initialOptions,
    });

    setMap(mapboxMap);
    if (onCreated) onCreated(mapboxMap);

    if (onLoaded) mapboxMap.once("load", () => onLoaded(mapboxMap));

    return () => {
      mapboxMap.remove();
      setMap(undefined);
      if (onRemoved) onRemoved();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mapNode} style={{ width: "100%", height: "100%" }} />;
}

export default MapboxMap;

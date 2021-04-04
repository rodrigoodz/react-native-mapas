import React from "react";
import { Polygon } from "react-native-maps";

const DrawPolygon = ({ markers }) => {
  return (
    <>
      {markers.length > 0 && (
        <Polygon coordinates={markers} fillColor="rgba(0,255,255,.2)" />
      )}
    </>
  );
};

export default DrawPolygon;

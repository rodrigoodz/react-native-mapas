import React from "react";
import { Image } from "react-native";
import { Marker } from "react-native-maps";
import Pin from "../assets/pin.png";

const DrawMarkers = ({ markers, setMarkers }) => {
  return (
    <>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker}
          // title={`Mercador ${index}`}
          // description={`Descripcion ${index}`}
        >
          <Image source={Pin} style={{ height: 25, width: 25 }} />
        </Marker>
      ))}
    </>
  );
};

export default DrawMarkers;

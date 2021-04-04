import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Marker } from "react-native-maps";
import { getCenter } from "../helpers/calcCenter";
import { haversine } from "../helpers/calcDistance";

const DrawDistances = ({ markers }) => {
  const data = [];
  for (let i = 0; i < markers.length; i = i + 1) {
    const c = markers[i];
    // si llego al final, tomo el primero y el ultimo
    let c2;
    if (i == markers.length - 1) {
      c2 = markers[0];
    } else {
      // en otro caso, tomo anterior y siguiente
      c2 = markers[i + 1];
    }
    data.push({
      center: getCenter([c, c2]),
      distance: haversine(c, c2),
    });
  }

  return (
    <>
      {data.map((d, idx) => (
        <Marker coordinate={d.center} key={idx}>
          <Text style={styles.textStyle}>{d.distance.toFixed(2)}m</Text>
        </Marker>
      ))}
    </>
  );
};

export default DrawDistances;

const styles = StyleSheet.create({
  textStyle: {
    color: "#ecf0f1",
    fontWeight: "bold",
    //   , fontSize: 7
  },
});

import React from "react";
import { StyleSheet, Text } from "react-native";
import { Marker } from "react-native-maps";
import { getCenter } from "../helpers/calcCenter";
import { calcArea } from "../helpers/calcArea";

const DrawTextArea = ({ markers }) => {
  return (
    <>
      {markers.length > 2 && (
        <Marker coordinate={getCenter(markers)}>
          <Text style={styles.textStyle}>
            Area: {calcArea(markers).toFixed(2)} m^2
          </Text>
        </Marker>
      )}
    </>
  );
};

export default DrawTextArea;

const styles = StyleSheet.create({
  textStyle: {
    color: "#bdc3c7",
    fontWeight: "bold",
    // fontSize: 9,
  },
});

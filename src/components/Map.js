import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import DrawMarkers from "./DrawMarkers";
import DrawPolygon from "./DrawPolygon";
import DrawTextArea from "./DrawTextArea";
import DrawDistances from "./DrawDistances";

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("El permiso a usar localizacion fue denegado");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (errorMsg) {
    return <Text style={{ alignSelf: "center" }}>{errorMsg}</Text>;
  }

  return (
    <>
      {location && (
        <MapView
          showsMyLocationButton
          showsUserLocation={true}
          showsCompass
          provider={PROVIDER_GOOGLE}
          moveOnMarkerPress={false}
          mapType={"satellite"}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            // latitude: -30.745144,
            // longitude: -57.845678,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={{ flex: 1 }}
          onLongPress={(e) => {
            setMarkers([...markers, e.nativeEvent.coordinate]);
          }}
        >
          <DrawTextArea markers={markers} />
          <DrawMarkers markers={markers} setMarkers={setMarkers} />
          <DrawPolygon markers={markers} />
          {markers.length > 1 && <DrawDistances markers={markers} />}

          {/* polilinea exterior */}
          {/* {markers.length > 0 && (
            <Polyline
              coordinates={markers}
              strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={2}
            />
          )} */}
        </MapView>
      )}
      <View style={styles.infoWrapperStyle}>
        <Text style={styles.textStyle}>Marcadores: {markers.length}</Text>
        {/* <Text style={styles.textStyle}>Area: {calcArea(markers)}</Text> */}
        {/* <Text style={styles.textStyle}>
          Distancia: {haversine(markers[0], markers[1]).toFixed(2)}m
        </Text> */}
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setMarkers([])}
        >
          <Text>Resetear Marcadores</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Map;

const styles = StyleSheet.create({
  infoWrapperStyle: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  buttonStyle: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
});

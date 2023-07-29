import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet, Dimensions } from "react-native";

export const MapScreen = () => {
  const route = useRoute();
  const coords = route.params?.coords;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...coords,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={1}
      >
        {coords && <Marker title="You are here" coordinate={coords} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

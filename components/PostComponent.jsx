import { useNavigation } from "@react-navigation/native";

import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

import { CommentIcon, LocationIcon } from "../components/icons/icons";

export const PostComponent = ({
  id,
  way,
  name,
  commentsNumber,
  country,
  coords,
}) => {
  const navigation = useNavigation();

  const handleCommentsRedirect = (way) => {
    navigation.navigate("Comments", { way: way });
  };

  const handleMapRedirect = (coords) => {
    navigation.navigate("Map", { coords: coords });
  };

  return (
    <View style={{ marginBottom: 32 }}>
      <View style={{ marginBottom: 8 }}>
        <Image
          source={typeof way === "number" ? way : { uri: way }}
          resizeMode={"cover"}
          style={styles.image}
        />
      </View>
      <Text style={styles.nameText}>{name}</Text>
      <View style={styles.aboutContainer}>
        <View style={styles.aboutLeftContainer}>
          <TouchableOpacity onPress={() => handleCommentsRedirect(way)}>
            <CommentIcon />
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              {
                color: "#BDBDBD",
              },
            ]}
          >
            {commentsNumber}
          </Text>
        </View>
        <View style={styles.aboutRightContainer}>
          <TouchableOpacity onPress={() => handleMapRedirect(coords)}>
            <LocationIcon />
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              {
                color: "#212121",
                textDecorationLine: "underline",
              },
            ]}
          >
            {country}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
  },

  nameText: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
  },

  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },

  aboutContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  aboutLeftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  aboutRightContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

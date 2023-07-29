import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    flex: 1,
    justifyContent: "flex-end",
  },

  button: {
    paddingTop: 16,
    paddingBottom: 16,

    backgroundColor: "#FF6C00",

    borderRadius: 100,
  },

  buttonText: {
    textAlign: "center",

    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 18.75,

    color: "white",
  },

  disabledButton: {
    paddingTop: 16,
    paddingBottom: 16,

    backgroundColor: "#F6F6F6",

    borderRadius: 100,
  },

  disabledButtonText: {
    textAlign: "center",

    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 18.75,

    color: "#BDBDBD",
  },
});

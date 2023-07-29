import { Image, View, Text, StyleSheet } from "react-native";

export const CommentComponent = ({
  img,
  direction = "row",
  text,
  textAlign = "right",
  date,
}) => {
  return (
    <View style={{ flexDirection: direction, gap: 16, marginBottom: 24 }}>
      <Image source={img} />
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <Text style={[styles.date, { textAlign: textAlign }]}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,

    width: "100%",

    padding: 16,

    backgroundColor: "#00000008",

    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  text: {
    marginBottom: 8,

    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
  },

  date: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 11.72,
  },
});

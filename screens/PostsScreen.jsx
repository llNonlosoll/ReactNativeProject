import { View, Image, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectPosts } from "../redux/posts/selectors";

import { globalStyles } from "../components/styles/globalStyles";

import { PostComponent } from "../components/PostComponent";

export const PostsScreen = () => {
  const posts = useSelector(selectPosts);

  return (
    <View style={[globalStyles.container, styles.postsContainer]}>
      <View style={styles.profileContainer}>
        <View style={styles.userPhoto}>
          <Image source={require("../components/images/userPhoto.png")} />
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostComponent
            way={item.imageUrl}
            name={item.name}
            commentsNumber={item.commentsNumber}
            country={item.location}
            coords={item.coords}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postsContainer: {
    display: "flex",
    flexDirection: "column",

    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },

  profileContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,

    marginBottom: 32,
  },

  userPhoto: {
    width: 60,
    height: 60,

    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  name: {
    fontFamily: "Roboto-Medium",
    lineHeight: 15.23,
    fontSize: 13,
  },

  email: {
    fontFamily: "Roboto-Regular",
    lineHeight: 12.89,
    fontSize: 11,
    color: "#212121CC",
  },
});

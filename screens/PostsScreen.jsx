import { View, Image, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectPosts } from "../redux/posts/selectors";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/posts/postsSlice";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useIsFocused } from "@react-navigation/native";

import { PostComponent } from "../components/PostComponent";

import { globalStyles } from "../components/styles/globalStyles";


export const PostsScreen = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const posts = useSelector(selectPosts);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        try {
          const snapshot = await getDocs(collection(db, "posts"));

          const postsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          dispatch(addPost(postsData));
        } catch (error) {
          console.log(error);
          throw error;
        }
      })();
    }
  }, [isFocused]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={[globalStyles.container, styles.postsContainer]}>
      <View style={styles.profileContainer}>
        <View style={styles.userPhoto}>
          <Image source={require("../components/images/userPhoto.png")} />
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={styles.name}>{user?.displayName}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostComponent
            id={item.id}
            way={item.data.photoUri}
            name={item.data.photoName}
            commentsNumber={item.data.comments.length}
            country={item.data.locationName}
            coords={item.data.location}
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

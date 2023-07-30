import { useRoute } from "@react-navigation/native";
import uuid from "react-native-uuid";
import { useState, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";

// import { useSelector } from "react-redux";
// import { selectPosts } from "../redux/posts/selectors";
// import { useIsFocused } from "@react-navigation/native";

import { CommentComponent } from "../components/CommentComponent";

import { ArrowUp } from "../components/icons/icons";

import { globalStyles } from "../components/styles/globalStyles";

export const CommentsScreen = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [comments, setComments] = useState([]);

  const route = useRoute();
  const way = route.params?.way;
  const id = route.params?.id;
  // const isFocused = useIsFocused();
  const currentDate = Date.now();

  // const posts = useSelector(selectPosts);

  // const comments = posts.find((post) => post.id === id).data.comments;

  const updateDataInFirestore = async (collectionName, docId) => {
    try {
      const ref = doc(db, collectionName, docId);

      await updateDoc(ref, {
        comments: [
          ...comments,
          { comment: inputValue, currentDate, id: uuid.v4() },
        ],
      });
      console.log("document updated");
    } catch (error) {
      console.log(error);
    } finally {
      setInputValue("");
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));

        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        const comments = postsData.find((post) => post.id === id).data.comments;

        setComments(comments);
      } catch (error) {
        console.log(error);
        throw error;
      }
    })();
  }, [inputValue]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <View
          style={[
            globalStyles.container,
            styles.container,
            {
              paddingBottom: isKeyboardVisible ? 90 : 16,
            },
          ]}
        >
          <Image
            source={typeof way === "number" ? way : { uri: way }}
            resizeMode={"cover"}
            style={styles.image}
          />
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CommentComponent
                img={require("../components/images/userPhotoComments.png")}
                text={item.comment}
                date={item.currentDate}
                direction={"row-reverse"}
                textAlign={"left"}
              />
            )}
          />
          {/* <CommentComponent
              img={require("../components/images/commentedUserPhoto.png")}
              text={
                "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!"
              }
              date={"09 червня, 2020 | 08:40"}
            />
            <CommentComponent
              img={require("../components/images/userPhotoComments.png")}
              text={
                "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images."
              }
              direction={"row-reverse"}
              textAlign={"left"}
              date={"09 червня, 2020 | 09:14"}
            />
            <CommentComponent
              img={require("../components/images/commentedUserPhoto.png")}
              text={"Thank you! That was very helpful!"}
              date={"09 червня, 2020 | 09:20"}
            />
            <CommentComponent
              img={require("../components/images/userPhotoComments.png")}
              text={
                "I'm glad I could be helpful. If you have any more questions or need any further assistance in photography, feel free to reach out. I'll be happy to share my knowledge! I wish you to continue improving your skills and capturing captivating photographs! Don't hesitate to ask for help anytime. Happy shooting!"
              }
              direction={"row-reverse"}
              textAlign={"left"}
              date={"09 червня, 2020 | 09:25"}
            /> */}
          <View>
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              onFocus={() => setIsKeyboardVisible(true)}
              onBlur={() => setIsKeyboardVisible(false)}
              style={styles.input}
              placeholder="Коментувати..."
            />
            <TouchableOpacity
              style={styles.sendMessageButton}
              onPress={() => updateDataInFirestore("posts", id)}
            >
              <ArrowUp />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-end",

    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },

  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },

  input: {
    width: "100%",
    height: 50,

    paddingLeft: 16,
    paddingRight: 16,

    fontSize: 16,
    lineHeight: 19.36,

    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 25,
  },

  sendMessageButton: {
    position: "absolute",
    top: 8,
    right: 8,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: 34,
    height: 34,

    backgroundColor: "#FF6C00",
    borderRadius: 17,
  },
});

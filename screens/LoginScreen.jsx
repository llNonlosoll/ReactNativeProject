import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

import { logIn } from "../redux/auth/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

import { BackgroundComponent } from "../components/BackgroundComponent";

import { globalStyles } from "../components/styles/globalStyles";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("Home");
    }
  }, [isLoggedIn, navigation]);

  const handleSubmit = async () => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(logIn({ email, password }));
      navigation.navigate("Home");
      return credentials.user;
    } catch (error) {
      alert(error.message);
    }
  };

  const togglePassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <BackgroundComponent>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                style={[
                  styles.formWrapper,
                  {
                    paddingBottom: isKeyboardVisible ? 32 : 111,
                    height: isKeyboardVisible ? 248 : "auto",
                  },
                ]}
              >
                <Text style={styles.title}>Увійти</Text>
                <TextInput
                  style={[styles.commonText, styles.input]}
                  placeholder="Адреса електронної пошти"
                  textContentType="emailAddress"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setIsKeyboardVisible(true)}
                  onBlur={() => setIsKeyboardVisible(false)}
                ></TextInput>
                <View>
                  <TextInput
                    style={[styles.commonText, styles.input]}
                    placeholder="Пароль"
                    textContentType="password"
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setIsKeyboardVisible(true)}
                    onBlur={() => setIsKeyboardVisible(false)}
                    secureTextEntry={isPasswordHidden}
                  />
                  <TouchableOpacity
                    style={styles.showPasswordButton}
                    onPress={togglePassword}
                  >
                    {password !== "" && (
                      <Text>{isPasswordHidden ? "Показати" : "Сховати"}</Text>
                    )}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={[styles.commonText, styles.buttonText]}>
                    Увійти
                  </Text>
                </TouchableOpacity>
                <View style={styles.signInContainer}>
                  <Text style={[styles.commonText, styles.signInText]}>
                    Немає акаунту?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Registration")}
                  >
                    <Text
                      style={[
                        styles.commonText,
                        styles.signInText,
                        styles.signInLink,
                      ]}
                    >
                      Зареєструватися
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </BackgroundComponent>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  formWrapper: {
    width: "100%",

    paddingTop: 32,
    paddingBottom: 111,
    paddingLeft: 16,
    paddingRight: 16,

    backgroundColor: "white",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  title: {
    marginBottom: 33,

    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35.16,
  },

  commonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
  },

  input: {
    width: "100%",
    height: 50,

    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,

    backgroundColor: "#F6F6F6",

    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
  },

  showPasswordButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },

  button: {
    marginTop: 27,
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
  },

  signInContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  signInText: {
    color: "#1B4371",
    textAlign: "center",
  },

  signInLink: {
    textDecorationLine: "underline",
  },
});

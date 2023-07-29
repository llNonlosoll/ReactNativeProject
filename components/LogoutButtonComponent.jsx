import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { TouchableOpacity } from "react-native";

import { logOut } from "../redux/auth/authSlice";
import { auth } from "../firebase/config";

import { LogoutIcon } from "./icons/icons";

export const LogoutButtonComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logOut());
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <TouchableOpacity onPress={handleLogOut}>
      <LogoutIcon style={{ marginRight: 20 }} />
    </TouchableOpacity>
  );
};

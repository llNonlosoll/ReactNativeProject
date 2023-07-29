import { ImageBackground } from "react-native";

import { globalStyles } from "./styles/globalStyles";

export const BackgroundComponent = ({ children }) => {
  return (
    <ImageBackground
      source={require("./images/background.jpg")}
      resizeMode="cover"
      style={globalStyles.image}
    >
      {children}
    </ImageBackground>
  );
};

import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LeftIcon } from "./icons/icons";

export const BackButtonComponent = () => {
  const navigation = useNavigation();

  const handleTurnBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleTurnBack}>
      <LeftIcon style={{ marginLeft: 16 }} />
    </TouchableOpacity>
  );
};

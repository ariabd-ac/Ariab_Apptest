import RNBounceable from "@freakycoder/react-native-bounceable";
import { useTheme } from "@react-navigation/native";
import { deleteContact } from "@services/contact";
import { ICardItem } from "@services/models";
import Text from "@shared-components/text-wrapper/TextWrapper";
import React, { useMemo } from "react";
import {
  Image,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import UserAvatar from "react-native-user-avatar";
import { generateRandomNumber } from "utils";
/**
 * ? Local Imports
 */
import createStyles from "./CardItem.style";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  data: ICardItem;
  handleUpdate?: any;
  handleDelete?: any;
}

const CardItem: React.FC<ICardItemProps> = ({
  style,
  data,
  handleUpdate,
  handleDelete,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { firstName, lastName, age, photo, id } = data;

  return (
    <RNBounceable style={[styles.container, style]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          flex: 1,
          paddingBottom: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => handleUpdate(id)}
          style={{ paddingRight: 16 }}
        >
          <Icon name="pencil" type="FontAwesome" color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(id)}>
          <Icon name="trash" type="FontAwesome" color={colors.text} />
        </TouchableOpacity>
      </View>
      <View>
        <View>
          {/* <Text h4 bold color={colors.text}>
            {photo}
          </Text> */}
          {photo === "N/A" ? (
            <Text h4 bold color={colors.text} />
          ) : (
            <UserAvatar
              size={100}
              name={firstName}
              src={photo === "N/A" ? generateAvatar() : photo}
              bgColor="transparant"
            />
          )}
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text h2 bold color={colors.text}>
            {firstName} {lastName}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text h4 bold color={colors.text}>
            {age}
          </Text>
        </View>
      </View>
    </RNBounceable>
  );
};

export default CardItem;

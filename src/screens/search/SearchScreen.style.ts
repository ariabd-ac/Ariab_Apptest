import { ExtendedTheme } from "@react-navigation/native";
import { palette } from "@theme/themes";
import { ViewStyle, StyleSheet, Text, TextInput } from "react-native";

interface Style {
  container: ViewStyle;
  label: any;
  input: any;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingTop: 50,
      // alignItems: "center",
      // justifyContent: "center",
      // borderColor: "red",
    },
    label: {
      fontSize: 16,
      color: palette.title,
      marginBottom: 6,
    },
    input: {
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: palette.shadow,
      padding: 12,
      width: "100%",
      marginBottom: 16,
      color: palette.title,
    },
  });
};

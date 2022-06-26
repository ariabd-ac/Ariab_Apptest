/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import { Button, Image, View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./SearchScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
// import * as ImagePicker from "react-native-image-picker";
// import { generateRandomNumber } from "utils";
import { postContact } from "@services/contact";
import { SCREENS } from "@shared-constants";
import { useToast } from "react-native-toast-notifications";

interface SearchScreenProps {}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }: any) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [photo] = useState<any>(null);
  const toast = useToast();

  // Opoen photo libary
  // const handleChoosePhoto = () => {
  //   const option = {
  //     maxHeight: 200,
  //     maxWidth: 200,
  //     selectionLimit: 0,
  //     mediaType: "photo",
  //     includeBase64: false,
  //   };
  //   launchImageLibrary({ option }, (response: any) => {
  //     console.log(response);
  //   });
  // };

  // Generate avatar
  // function generateAvatar() {
  //   const ranNum = generateRandomNumber(1, 1000);
  //   return `https://avatars.dicebear.com/api/avataaars/${ranNum}.svg`;
  // }

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", age: 0, photo: "" }}
      onSubmit={async (values, { resetForm }) => {
        try {
          const dataForm = {
            firstName: values.firstName,
            lastName: values.lastName,
            age: values.age,
            photo:
              // eslint-disable-next-line max-len
              "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550",
          };
          const response = await postContact(dataForm);
          if (response.status === 201) {
            // Toast Native From React Native
            // ToastAndroid.show("Succes", 2000);
            toast.show(response.data.message, {
              type: "success",
              placement: "bottom",
              duration: 5000,
              animationType: "zoom-in",
            });

            navigation.push(SCREENS.HOME);
            resetForm();
          }
        } catch (error: any) {
          toast.show(error.message, {
            type: "danger",
            placement: "bottom",
            duration: 5000,
            animationType: "zoom-in",
          });
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <View>
            <View>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                style={styles.input}
              />
            </View>
            <View>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                style={styles.input}
              />
            </View>
            <View>
              <Text style={styles.label}>Age</Text>
              <TextInput
                onChangeText={handleChange("age")}
                onBlur={handleBlur("age")}
                style={styles.input}
                keyboardType={"numeric"}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              {photo && (
                <>
                  <Image source={photo} style={{ width: 300, height: 300 }} />
                </>
              )}
              {/* <Button
                title="Choose Photo"
                onPress={() => {
                  ImagePicker.launchImageLibrary(
                    {
                      mediaType: "photo",
                      includeBase64: false,
                      maxHeight: 200,
                      maxWidth: 200,
                    },
                    (response: any) => {
                      const source = response?.assets?.[0].fileName;
                      console.log(response);
                      console.log(source);
                      setPhoto(source);
                    },
                  );
                }}
              /> */}
            </View>

            <Button onPress={handleSubmit} title="Submit" />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SearchScreen;

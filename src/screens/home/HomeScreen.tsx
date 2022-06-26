/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import fonts from "@fonts";
import { useTheme } from "@react-navigation/native";
import {
  deleteContact,
  getContact,
  getContactById,
  updateContact,
} from "@services/contact";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { useToast } from "react-native-toast-notifications";
/**
 * ? Shared Imports
 */
import { SCREENS } from "@shared-constants";
import { Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "./components/card-item/CardItem";
/**
 * ? Local Imports
 */
import createStyles from "./HomeScreen.style";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }: any) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { isLoading, data } = useSelector((state: any) => state.contact);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [dataById, setDataById] = useState<any>({});
  const toast = useToast();

  const getContacts = useCallback(async () => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const response = await getContact();
      if (response.status === 200) {
        dispatch({ type: "SET_DATA", payload: response?.data?.data });
        dispatch({ type: "IS_LOADING", payload: false });
      } else {
        dispatch({ type: "IS_LOADING", payload: false });
      }
    } catch (error: any) {
      dispatch({ type: "IS_LOADING", payload: false });
    }
  }, [getContact]);

  useEffect(() => {
    getContacts();
  }, []);

  const handleUpdate = async (id: string) => {
    setModalVisible(true);
    try {
      const response = await getContactById(id);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const data = response?.data?.data;
      const age = data.age.toString();
      setDataById({ ...data, age: age });
    } catch (error: any) {
      toast.show(error.message, {
        type: "danger",
        placement: "bottom",
        duration: 5000,
        animationType: "zoom-in",
      });
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteContact(id);
      if (response.status === 202) {
        toast.show(response.data.message, {
          type: "success",
          placement: "bottom",
          duration: 5000,
          animationType: "zoom-in",
        });
        getContacts();
      }
    } catch (error: any) {
      toast.show(error.message, {
        type: "danger",
        placement: "bottom",
        duration: 5000,
        animationType: "zoom-in",
      });
    }
  };

  const List = () => (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CardItem
            data={item}
            handleUpdate={() => handleUpdate(item.id)}
            handleDelete={() => handleDelete(item.id)}
          />
        )}
      />
    </View>
  );

  const Welcome = () => (
    <View>
      <View>
        <Text h1 bold color={colors.text}>
          Hello!
        </Text>
        <Text
          fontFamily={fonts.montserrat.lightItalic}
          color={colors.placeholder}
        >
          Welcome Back
        </Text>
      </View>
      <View
        style={{
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.push(SCREENS.ADD)}
          style={{ flexDirection: "row" }}
        >
          <Text h4 bold style={{ paddingRight: 16 }}>
            Add Contact
          </Text>
          <Icon name="plus" type="FontAwesome" color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const Content = () => (
    <View style={styles.contentContainer}>
      <Welcome />
      <List />
      <View />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Formik
          initialValues={{
            firstName: dataById?.firstName,
            lastName: dataById?.lastName,
            age: dataById?.age,
            photo: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            const dataForm = {
              ...values,
              // eslint-disable-next-line radix
              age: parseInt(values.age),
              photo:
                // eslint-disable-next-line max-len
                "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550",
            };
            try {
              const response = await updateContact(dataById?.id, dataForm);
              if (response.status === 201) {
                resetForm();
                getContacts();
                toast.show(response.data.message, {
                  type: "success",
                  placement: "bottom",
                  duration: 5000,
                  animationType: "zoom-in",
                });
                setModalVisible(false);
              }
            } catch (error: any) {
              console.log(error);
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
            <View style={styles.modalView}>
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
                    value={values.age}
                  />
                </View>
                <View style={{ marginBottom: 16 }}>
                  {dataById?.photo && (
                    <>
                      <Image
                        source={dataById?.photo}
                        style={{ width: 300, height: 300 }}
                      />
                    </>
                  )}
                </View>

                <Button onPress={() => setModalVisible(false)} title="Close" />
                <Button onPress={handleSubmit} title="Submit" />
              </View>
            </View>
          )}
        </Formik>
      </Modal>
    </View>
  );
  const Loading = () => (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <Loading /> : <Content />}
    </SafeAreaView>
  );
};

export default HomeScreen;

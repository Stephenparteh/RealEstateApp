import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import axios from "axios";
import { URL } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AgentSignIn = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleAgentSignIn = () => {
    //Check if no field is empty
    if (!data.email || !data.password) {
      Alert.alert(
        "Missing Field",
        "There are missing fields that to be filled",
        [{ text: "Okay" }]
      );
      return;
    }
    // axios request to connect the backend with frontend for login
    axios
      .post(
        `${URL}/login-admin`,
        {
          email: data.email, //columnNameFromBackend: stateName.column
          password: data.password,
          phoneNumber: data.email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log("Response!", response.data);

        const {
          access_token,
          refresh_token,
          id,
          firstName,
          lastName,
          email,
          phoneNumber,
        } = response.data; //needs to be review to know the function

        AsyncStorage.setItem("accessToken", access_token);
        AsyncStorage.setItem("refreshToken", refresh_token);
        AsyncStorage.setItem("AdminId", String(id));
        AsyncStorage.setItem("firstName", firstName);
        AsyncStorage.setItem("lastName", lastName);
        AsyncStorage.setItem("email", email);
        AsyncStorage.setItem("phone", phoneNumber);

        // To make sure user dont go back to login screen after logining in
        navigation.reset({
          index: 0,
          routes: [{ name: "AgentButtomTab" }],
        });

        // navigation.navigate("AgentButtomTab");
      })
      .catch((err) => {
        console.log("Login failed", err.response);

        Alert.alert("Login Failed", "Invalid username or password", [
          { text: "Okay" },
        ]);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.signInText}>Login</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email or Phone Number"
          value={data.email}
          onChangeText={(val) => setData({ ...data, email: val })}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={data.password}
          onChangeText={(val) => setData({ ...data, password: val })}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAgentSignIn}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.option}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AgentUpdatePasswordScreen")}
        >
          <Text style={styles.optionText}>Forget Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.downBelow}>
        <Text style={styles.white}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AgentSignUpScreen")}
        >
          <Text style={styles.green}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "#094FAF", // Background color
    padding: 10, // All sides are 10
    paddingHorizontal: 50, // Left and right are 20
    backgroundColor: "deepskyblue",
  },
  signInText: {
    fontSize: 44,
    fontWeight: "bold",
    color: "white", // Text color
    marginBottom: 20,
    alignSelf: "center",
  },
  form: {
    justifyContent: "space-between",
    alignContent: "center",
  },
  input: {
    height: 45,
    width: "100%",
    borderColor: "white", // Input border color
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    paddingHorizontal: 10,
    color: "black",
    backgroundColor: "white",
  },

  option: {
    alignItems: "center",
  },

  downBelow: {
    flexDirection: "row",
    paddingBottom: 30,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    alignSelf: "center",
  },

  white: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },

  green: {
    color: "gray",
  },

  optionText: {
    color: "gray",
    fontSize: 15,
  },

  addButton: {
    backgroundColor: "gray",
    padding: 13, // All sides are 10
    marginTop: 30,
    width: "100%",
    alignSelf: "center",
    marginBottom: 20,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    borderRadius: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    borderRadius: 10, // Set the border radius
    borderWidth: 2, // Set the border width
    borderColor: "gray", // Set the border color to blue
    padding: 10, // Add some padding for better visual appearance
  },
});

export default AgentSignIn;

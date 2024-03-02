// Sign Up Screen
import React, { useState } from "react"; //Importation of React and the useState hook from react
import {
  View, //Is like a container component for the other components
  Text, //Is a component that is use for text
  TextInput, //Is a component that is use to accept the users input
  StyleSheet, //Is a component that is use to style the contents of the screen
  TouchableOpacity, //Is a component that gets highlight for few second when clicked
  ImageBackground, //Is a component that is use to set the background of the screen with a image
  Alert, //A component that is use show an alert to the user
  ScrollView,
} from "react-native"; //Importation of various component that will be use to build the screen
import { SafeAreaView } from "react-native-safe-area-context"; //Importation of the SafeAreaView that is not in use now

import axios from "axios";
import { URL } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

//The general function for this screen
const AgentSignUp = ({ navigation }) => {
  // Creation of a state to dynamically hold the user data from the text input and their initial values are empty string
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    // userName: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  // data.firstName;
  // An arrow function created to check if the both passwords enter by the user are the same and also check if there isn't any empty field
  const handleAgentSignUp = () => {
    // Conditional statement to check if no field is left empty
    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.gender ||
      !data.phone ||
      !data.address ||
      !data.password
    ) {
      Alert.alert("Missing field", "You have some missing fields to fill");
      return;
    }

    // Conditional statement to check if password and confirmed password are the same
    if (data.password !== data.confirmPassword) {
      Alert.alert(
        "Password Mismatch",
        "Password and confirm password did not match"
      );
      return; // Return from the function to prevent further execution
    }

    axios
      .post(
        `${URL}/register-admin`,
        {
          firstName: data.firstName, //BackendColumnName: data.columnName
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phone,
          gender: data.gender,
          address: data.address,
          password: data.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log("Response!", response.data);

        const jsonValue = JSON.stringify(response.data);
        AsyncStorage.setItem("userData", jsonValue);
        // console.log("value", jsonValue);

        // console.log(jsonValue);

        Alert.alert(
          "Account Created Succefully",
          "Welcome To Your Housing Portal",
          [{ text: "Okay" }]
        );
        navigation.navigate("AgentButtomTab");
      })
      .catch((err) => {
        console.log("Error!", err.response.data);

        if (err.response && err.response.data && err.response.data.message) {
          Alert.alert("Registration Error", err.response.data.message);
        }
      });
    // console.log("User created:", { firstName, lastName });
  };

  // Returning The Contents Of The Screen
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.signInText}>Sign Up</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={data.firstName}
            onChangeText={(val) => setData({ ...data, firstName: val })}
          />

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={data.lastName}
            onChangeText={(val) => setData({ ...data, lastName: val })}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={data.email}
            onChangeText={(val) => setData({ ...data, email: val })}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={data.phone}
            onChangeText={(val) => setData({ ...data, phone: val })}
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Address"
            value={data.address}
            onChangeText={(val) => setData({ ...data, address: val })}
          />

          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={data.gender}
            onChangeText={(val) => setData({ ...data, gender: val })}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={data.password}
            onChangeText={(val) => setData({ ...data, password: val })}
            secureTextEntry={true}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={data.confirmPassword}
            onChangeText={(val) => setData({ ...data, confirmPassword: val })}
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAgentSignUp}
          >
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.downBelow}>
          <Text style={styles.white}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AgentSignInScreen")}
          >
            <Text style={styles.green}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
// Stying of the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // backgroundColor: "#094FAF", // Background color
    // padding: 10, // All sides are 10
    paddingHorizontal: 50, // Left and right are 20
    // backgroundColor: "lightblue",
    backgroundColor: "deepskyblue",
  },
  signInText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white", // Text color
    marginBottom: 20,
    marginTop: 40,
    alignSelf: "center",
  },
  form: {
    justifyContent: "space-between",
    alignContent: "center",
  },
  input: {
    height: 35,
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
    flexDirection: "row",
    justifyContent: "space-between",
  },

  optionText: {
    color: "#fff",
  },

  addButton: {
    backgroundColor: "gray",
    padding: 13, // All sides are 10
    marginTop: 30,
    width: "100%",
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 10,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    borderRadius: 10, // Set the border radius
    borderWidth: 2, // Set the border width
    borderColor: "#3498db", // Set the border color to blue
    padding: 10, // Add some padding for better visual appearance
  },
  downBelow: {
    flexDirection: "row",
    // paddingTop: 90,
    // position: "absolute",
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
});

export default AgentSignUp;

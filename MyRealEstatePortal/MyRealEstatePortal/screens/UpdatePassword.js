import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UpdatePassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPasswod] = useState("");

  const handlePasswordUpdate = () => {
    // Handle update passoword here
    console.log("Task created:", { email, password });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.signInText}>UpdatePassword</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email or Phone Number"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChangeText={(text) => setConfirmNewPasswod(text)}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("SignInScreen")}
        >
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "deepskyblue", // Background color
    padding: 10, // All sides are 10
    paddingHorizontal: 50, // Left and right are 20
  },
  signInText: {
    fontSize: 34,
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
    flexDirection: "row",
    justifyContent: "space-between",
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

  optionText: {
    color: "#fff",
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
    borderColor: "#3498db", // Set the border color to blue
    padding: 10, // Add some padding for better visual appearance
  },
});

export default UpdatePassword;

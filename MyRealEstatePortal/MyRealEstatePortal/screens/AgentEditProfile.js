import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { URL } from "./constants";

const AgentEditProfileScreen = ({ route, navigation }) => {
  const { userData } = route.params;

  const [firstName, setFirstName] = useState(userData[0]);
  const [lastName, setLastName] = useState(userData[1]);
  const [email, setEmail] = useState(userData[2]);
  const [phone, setPhone] = useState(userData[3]);

  const handleEditProfile = async () => {
    console.log("Profile updated:", {
      firstName,
      lastName,
      email,
      phone,
    });

    try {
      const adminId = await AsyncStorage.getItem("AdminId");
      console.log(adminId);
      const response = await axios.put(
        `${URL}/update-admin/${adminId}`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phone,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Success:", response);

      Alert.alert("Updated", "Admin Detail Updated Successfully", [
        { text: "Okay" },
      ]);

      navigation.navigate("AgentProfileScreen");
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", "Failed to Update User. Please try again later.");
    }
    // Add functionality to update profile details
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.top}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AgentProfileScreen")}
          >
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileSection}>
          <Image
            style={styles.profileImage}
            source={{
              uri: "https://scontent.fmlw1-2.fna.fbcdn.net/v/t39.30808-6/376735388_1498882900651961_760263301503832346_n.jpg?stp=dst-jpg_p640x640&_nc_cat=110&ccb=1-7&_nc_sid=9c7eae&_nc_eui2=AeFrAE5qu6vcocVI-rgU5B3_Zf8feb36rVZl_x95vfqtVnz8dipKTnEZZtxgNBexH7227BBlFpU9jzahIksKq6PL&_nc_ohc=QgMDVVIAFFIAX_rPY7R&_nc_zt=23&_nc_ht=scontent.fmlw1-2.fna&oh=00_AfCoAqzFCwiPG4S-wTA5voJ4jdD0Xp-qi7NT0IoFGVO39g&oe=65AB7D78",
            }}
          />
          {/* <Image
            style={styles.profileImage}
            source={{
              uri: "https://scontent.fmlw1-2.fna.fbcdn.net/v/t39.30808-6/376735388_1498882900651961_760263301503832346_n.jpg?stp=dst-jpg_p640x640&_nc_cat=110&ccb=1-7&_nc_sid=9c7eae&_nc_eui2=AeFrAE5qu6vcocVI-rgU5B3_Zf8feb36rVZl_x95vfqtVnz8dipKTnEZZtxgNBexH7227BBlFpU9jzahIksKq6PL&_nc_ohc=QgMDVVIAFFIAX_rPY7R&_nc_zt=23&_nc_ht=scontent.fmlw1-2.fna&oh=00_AfCoAqzFCwiPG4S-wTA5voJ4jdD0Xp-qi7NT0IoFGVO39g&oe=65AB7D78",
            }}
          /> */}
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            placeholder="Last Name"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  form: {
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "deepskyblue",
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AgentEditProfileScreen;

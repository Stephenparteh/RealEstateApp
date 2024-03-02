import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Button,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "./constants";

const ProfileScreen = ({ navigation }) => {
  const [currentUserData, setCurrentUserData] = useState([]);
  const [image, setImage] = useState(null); // Define the 'image' state variable

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const firstName = await AsyncStorage.getItem("firstName");
        const lastName = await AsyncStorage.getItem("lastName");
        const email = await AsyncStorage.getItem("email");
        const phone = await AsyncStorage.getItem("phone");

        setCurrentUserData([firstName, lastName, email, phone]);
      } catch (error) {
        console.log(error.response);
      }
    };
    getCurrentUser();

    const loadProfileImage = async () => {
      try {
        // Check if there's a stored image URI in AsyncStorage
        const storedImageURI = await AsyncStorage.getItem("profileImageURI");
        if (storedImageURI) {
          setImage(storedImageURI);
        }
      } catch (error) {
        console.log("Error loading profile image:", error);
      }
    };

    loadProfileImage();
  }, []);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MainScreen" }],
    });
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      uploadImage(result);
    }
  };

  const uploadImage = async (result) => {
    const userId = 1; // Replace with the actual user ID
    const accessToken = await AsyncStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("image", {
      uri: result.assets[0].uri,
      type: "image/jpeg",
      name: "image.jpg",
    });

    try {
      const response = await axios.put(`${URL}/upload/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`, // Include the JWT token in the Authorization header
        },
      });
      console.log(response.data);
      // Assuming the response contains a message indicating success
      alert("Profile picture updated successfully");

      // Store the image URI in AsyncStorage
      await AsyncStorage.setItem("profileImageURI", result.assets[0].uri);
    } catch (error) {
      console.log("Error uploading image:", error);
      // Handle error
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PropertyListingScreen")}
          >
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditProfileScreen", {
                userData: currentUserData,
              })
            }
          >
            <AntDesign name="edit" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <Pressable onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <Image
                source={require("../assets/icon.png")}
                style={styles.profileImage}
              />
            )}
          </Pressable>
          <Text style={styles.fullName}>
            {`${currentUserData[0]} ${currentUserData[1]}`}
          </Text>
          <View style={styles.detailsContainer}>
            <View style={{ ...styles.detail, marginBottom: 10 }}>
              <Text style={styles.title}>Email:</Text>
              <Text style={styles.info}>{currentUserData[2]}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.title}>Phone number:</Text>
              <Text style={styles.info}>{currentUserData[3]}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "100%",
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
  },
  info: {
    color: "#555",
  },
  logoutButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;

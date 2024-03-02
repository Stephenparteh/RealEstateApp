// AddPropertyScreen

import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { URL } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddPropertyScreen = ({ navigation }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    if (selectedImages.length > 0) {
      uploadImages(selectedImages[selectedImages.length - 1]);
    }
  }, [selectedImages]);

  const pickImageAsync = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        multiple: true,
      });
      if (result.cancelled) {
        console.log("Image selection cancelled");
      } else if (result.assets[0].uri) {
        console.log("Selected Image URI:", result.assets[0].uri);
        if (selectedImages.length < 10) {
          setSelectedImages([...selectedImages, result.assets[0].uri]);
          uploadImages(result);
          console.log("Selected Images:", selectedImages);
        } else {
          alert("You can only select up to 10 images.");
        }
      }
    } catch (error) {
      console.log("Error picking image:", error);
    }
  };

  const uploadImages = async (result) => {
    const adminId = await AsyncStorage.getItem("AdminId");
    const accessToken = await AsyncStorage.getItem("accessToken");

    const formData = new FormData();

    formData.append("image", {
      uri: result.assets[0].uri,
      type: "image/jpeg",
      name: "image.jpg",
    });

    try {
      const response = await axios.post(
        `${URL}/upload/image/${adminId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`, // Add any necessary headers
          },
        }
      );
      console.log(response.data);
      // alert("Images uploaded successfully");

      // await AsyncStorage.setItem("propertyImageURI", result.assets[0].uri);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Error: " + error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        alert("Error: No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        alert("Error: " + error.message);
      }
      console.log(error.config);
    }
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedRooms] = useState("");
  const [bathrooms, setBathRooms] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");

  const handleAddProperty = async () => {
    try {
      // Getting the admin id from AsyncStorage
      const adminId = await AsyncStorage.getItem("AdminId");
      const adminFirstName = await AsyncStorage.getItem("firstName");
      const adminLastName = await AsyncStorage.getItem("lastName");

      if (
        !title ||
        !description ||
        !price ||
        !bedrooms ||
        !bathrooms ||
        !location ||
        !contact
      ) {
        Alert.alert("Missing Field", "You Have Some Missing Fields To Fill", [
          { text: "Okay" },
        ]);
        return;
      }

      const response = await axios.post(
        `${URL}/create-property`,
        {
          title: title,
          description: description,
          price: price,
          location: location,
          bedrooms: bedrooms,
          bathrooms: bathrooms,
          contact: contact,
          admin_id: adminId,
          images: selectedImages,
          adminFirstName: adminFirstName,
          adminLastName: adminLastName,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Success:", response.data);
      const propertyid = String(response.data.propertyid);

      setTitle("");
      setDescription("");
      setPrice("");
      setBedRooms("");
      setBathRooms("");
      setLocation("");
      setContact("");
      setSelectedImages([]);
      await AsyncStorage.setItem(
        `propertyImages_${propertyid}`,
        JSON.stringify(selectedImages)
      );

      console.log(propertyid);
      console.log(adminFirstName);
      console.log(adminLastName);

      console.log("Images uploaded successfully to asyncstorage");

      Alert.alert("Property Created", "Property Created Successfully", [
        { text: "Okay" },
      ]);
      navigation.navigate("ManagePropertyScreen", { propertyid: propertyid });
    } catch (error) {
      console.log("Error:", error);
      // Add further error handling if needed
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <Text style={styles.addHeader}>Add Property Details</Text>
          </View>
          <View style={styles.contain}>
            <View style={styles.inputs}>
              <MaterialIcons name="title" size={24} color="black" />
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
            <View style={styles.inputs}>
              <MaterialIcons name="description" size={24} color="black" />
              <TextInput
                style={{
                  ...styles.input,
                  height: 100,
                  textAlignVertical: "top",
                }}
                placeholder="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
                multiline
                numberOfLines={4}
              />
            </View>
            <View style={styles.inputs}>
              <MaterialIcons name="attach-money" size={24} color="black" />
              <TextInput
                style={styles.input}
                placeholder="Price In USD/monthly"
                keyboardType="number-pad"
                value={price}
                onChangeText={(text) => setPrice(text)}
              />
            </View>
            <View style={styles.inputs}>
              <FontAwesome name="bed" size={24} color="black" />
              <TextInput
                style={styles.input}
                placeholder="Beds"
                keyboardType="number-pad"
                value={bedrooms}
                onChangeText={(text) => setBedRooms(text)}
              />
            </View>
            <View style={styles.inputs}>
              <FontAwesome name="bathtub" size={24} color="black" />
              <TextInput
                style={styles.input}
                placeholder="Baths"
                keyboardType="number-pad"
                value={bathrooms}
                onChangeText={(text) => setBathRooms(text)}
              />
            </View>
            <View style={styles.inputs}>
              <MaterialIcons name="add-location" size={24} color="black" />
              <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={(text) => setLocation(text)}
              />
            </View>
            <View style={styles.inputs}>
              <AntDesign name="contacts" size={24} color="black" />
              <TextInput
                style={styles.input}
                placeholder="Contact Number"
                keyboardType="phone-pad"
                value={contact}
                onChangeText={(text) => setContact(text)}
              />
            </View>
          </View>

          <View style={styles.containers}>
            <Button
              theme="primary"
              // label="Choose a photo"
              onPress={pickImageAsync}
              title="Upload an image of the property"
            />
            <View style={styles.selectedImageContainer}>
              {selectedImages.map((uri, index) => (
                <Image
                  key={index}
                  source={{ uri: uri }}
                  style={{
                    ...styles.selectedImage,
                    width: 100,
                    height: 100,
                    marginTop: 10,
                  }}
                />
              ))}
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.cont}
              onPress={() => handleAddProperty()}
            >
              <Text style={styles.save}>Add Property</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  selectedImageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingLeft: 35,
    paddingRight: 35,
    textAlign: "center",
    marginTop: 30,
    backgroundColor: "#d3d3d3",
  },
  addHeader: {
    fontWeight: "bold",
    fontSize: 20,
  },

  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 16,
  },
  inputs: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  contain: {
    marginTop: 20,
  },
  selectedImage: {
    width: "30%",
    marginBottom: 10,
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cont: {
    backgroundColor: "deepskyblue",
    alignItems: "center",
    paddingVertical: 15,
    marginTop: 10,
    width: 100,
    alignSelf: "center",
    borderRadius: 10,
  },
  save: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddPropertyScreen;

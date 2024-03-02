import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "./constants";

const AgentEditPropertyScreen = ({ navigation, route }) => {
  const { propertyData, images } = route.params;

  const [title, setTitle] = useState(propertyData.title);
  const [description, setDescription] = useState(propertyData.description);
  const [price, setPrice] = useState(propertyData.price);
  const [bedrooms, setBedrooms] = useState(propertyData.bedrooms);
  const [bathrooms, setBathrooms] = useState(propertyData.bathrooms);
  const [location, setLocation] = useState(propertyData.location);
  const [contact, setContact] = useState(propertyData.contact);

  const handleUpdateProperty = async () => {
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
    try {
      const adminId = await AsyncStorage.getItem("AdminId");

      const response = await axios.put(
        `${URL}/update-property/${propertyData.id}`,
        {
          title: title,
          description: description,
          price: price,
          bedrooms: bedrooms,
          bathrooms: bathrooms,
          location: location,
          contact: contact,
          admin_id: adminId,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Success:", response.data);
      alert("Property Updated Successfully");

      fetchPropertyData();

      navigation.navigate("AgentPropertyDetail", {
        property: response.data, // Pass updated property data
        images: images,
      });
    } catch (error) {
      console.log("Error:", error);
      alert("Failed to update property");
    }
  };

  const fetchPropertyData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");

      const response = await axios.get(`${URL}/admin-property`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("Response:", response.data);

      // Handle response and update state accordingly
    } catch (error) {
      console.log("Error:", error);

      // Handle error
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.addHeader}>Edit Property Details</Text>
        <View style={styles.inputs}>
          <MaterialIcons name="title" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={(val) => setTitle(val)}
          />
        </View>
        <View style={styles.inputs}>
          <MaterialIcons name="description" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Description"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={(val) => setDescription(val)}
          />
        </View>
        <View style={styles.inputs}>
          <MaterialIcons name="attach-money" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Price In USD/monthly"
            keyboardType="numeric"
            value={price}
            onChangeText={(val) => setPrice(val)}
          />
        </View>
        <View style={styles.inputs}>
          <FontAwesome name="bed" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Beds"
            keyboardType="numeric"
            value={bedrooms}
            onChangeText={(val) => setBedrooms(val)}
          />
        </View>
        <View style={styles.inputs}>
          <FontAwesome name="bathtub" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Baths"
            keyboardType="numeric"
            value={bathrooms}
            onChangeText={(val) => setBathrooms(val)}
          />
        </View>
        <View style={styles.inputs}>
          <MaterialIcons name="add-location" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={(val) => setLocation(val)}
          />
        </View>
        <View style={styles.inputs}>
          <AntDesign name="contacts" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            keyboardType="phone-pad"
            value={contact}
            onChangeText={(val) => setContact(val)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleUpdateProperty}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  addHeader: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    marginTop: 30,
  },
  inputs: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AgentEditPropertyScreen;

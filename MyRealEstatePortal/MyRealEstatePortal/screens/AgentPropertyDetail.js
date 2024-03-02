// AgentPropertyDetailsScreen

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "./constants";
import { SliderBox } from "react-native-image-slider-box";

const AgentPropertyDetail = ({ route, navigation }) => {
  const { property, images } = route.params;
  if (!property) {
    return <Text>Loading...</Text>; // or any other placeholder
  }

  const handleDeleteProperty = async (propertyid) => {
    try {
      const response = await axios.delete(
        `${URL}/delete-property/${propertyid}`
      );
      console.log("Success:", response.data);

      fetchPropertyData();

      Alert.alert("Deleted", "Property Deleted Successfully", [
        { text: "Okay" },
      ]);
      navigation.navigate("ManagePropertyScreen");
    } catch (error) {
      console.log(error.response);

      Alert.alert("Error", "Failed to delete property", [{ text: "Okay" }]);
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
      <ScrollView>
        <SliderBox images={images || []} />

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Title:</Text>
            <Text style={styles.detailValue}>{property.title}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Price:</Text>
            <Text style={styles.detailValue}>${property.price}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue}>{property.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bedrooms:</Text>
            <Text style={styles.detailValue}>{property.bedrooms}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bathrooms:</Text>
            <Text style={styles.detailValue}>{property.bathrooms}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Description:</Text>
            <Text style={styles.detailValue}>{property.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#4CAF50" }]}
          onPress={() =>
            navigation.navigate("AgentEditPropertyScreen", {
              propertyData: property,
              images: images,
            })
          }
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FF5722" }]}
          onPress={() => handleDeleteProperty(property.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  propertyImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 16,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 25,
    borderBottomWidth: 2,
  },
  detailLabel: {
    fontWeight: "bold",
    width: 250,
    fontSize: 20,
  },
  detailValue: {
    flex: 1,
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AgentPropertyDetail;

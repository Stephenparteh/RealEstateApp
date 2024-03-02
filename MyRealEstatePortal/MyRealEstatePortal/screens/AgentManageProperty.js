// AgentManagePropertyScreen

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { URL } from "./constants";

const AgentManageProperty = ({ navigation, route }) => {
  // Mock cover images for each property
  const mockCoverImages = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ];

  const { propertyid } = route.params || {};

  const [properties, setProperties] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchPropertyData();
    }, [])
  );

  const fetchPropertyData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const firstName = await AsyncStorage.getItem("firstName");
      const coverImage = await AsyncStorage.getItem(
        `propertyImages_${propertyid}`
      );

      console.log("accessToken:", accessToken);
      console.log("firstName:", firstName);
      console.log("propertyImages:", coverImage);

      const response = await axios.get(`${URL}/admin-property`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log("API Response:", response.data); // Log API response

      if (response.status === 200 && Array.isArray(response.data.properties)) {
        // Check response status and data structure
        setFirstName(firstName);
        setProperties(response.data.properties.reverse()); // Adjusted to response.data.properties
        setIsLoading(false);
        setCoverImage(JSON.parse(coverImage));
      } else {
        Alert.alert(
          "Error",
          "Failed to fetch properties. Invalid response data."
        );
      }
    } catch (error) {
      console.log("Error:", error);

      if (error.response && error.response.status === 401) {
        Alert.alert("Error", "Failed to fetch properties. Please try again.");
      } else {
        Alert.alert(
          "Error",
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{`Hello ${firstName} !`} </Text>
        <Text style={styles.subHeaderText}>Welcome To Your Housing Portal</Text>
      </View>
      <View style={styles.manageHeader}>
        <Text style={styles.manageHeaderText}>Manage Your Properties</Text>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : !properties.length ? (
        <View style={styles.noPropertyContainer}>
          <Text style={styles.boldText}>No Properties</Text>
          <Text style={styles.subHeaderText}>
            Tap the Add Button Icon to add a property
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.propertyListContainer}>
          {properties.map((property, index) => (
            <TouchableOpacity
              key={index}
              style={styles.propertyCard}
              onPress={() =>
                navigation.navigate("AgentPropertyDetail", {
                  property,
                  images: coverImage,
                })
              }
            >
              <Image
                style={styles.propertyImage}
                source={{
                  uri: coverImage[index],
                }}
              />
              <View style={styles.propertyDetails}>
                <Text style={styles.price}>${property.price}</Text>
                <Text style={styles.propertyTitle}>{property.title}</Text>
                <View style={styles.location}>
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color="grey"
                    style={styles.locationIcon}
                  />
                  <Text style={styles.locationText}>{property.location}</Text>
                </View>
                <View style={styles.bedBathContainer}>
                  <View style={styles.bedContainer}>
                    <Ionicons
                      name="bed-outline"
                      size={24}
                      color="black"
                      style={styles.bedIcon}
                    />
                    <Text style={styles.bedText}>{property.bedrooms}</Text>
                  </View>
                  <View style={styles.bathContainer}>
                    <FontAwesome
                      name="bathtub"
                      size={22}
                      color="black"
                      style={styles.bathIcon}
                    />
                    <Text style={styles.bathText}>{property.bathrooms}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    padding: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 21,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#888",
  },
  manageHeader: {
    paddingLeft: 10,
    marginTop: 15,
  },
  manageHeaderText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noPropertyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  propertyListContainer: {
    paddingVertical: 10,
  },
  propertyCard: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  propertyImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
  },
  propertyDetails: {
    flex: 1,
    marginLeft: 10,
  },
  price: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  propertyTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  locationIcon: {
    marginRight: 5,
  },
  locationText: {
    fontSize: 14,
    color: "#888",
  },
  bedBathContainer: {
    flexDirection: "row",
  },
  bedContainer: {
    flexDirection: "row",
    marginRight: 20,
  },
  bedIcon: {
    marginRight: 5,
  },
  bathContainer: {
    flexDirection: "row",
  },
  bathIcon: {
    marginRight: 5,
  },
});

export default AgentManageProperty;

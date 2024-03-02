import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons, Octicons, FontAwesome } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { URL } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PropertyListing = ({ navigation, route }) => {
  const { propertyid } = route.params || {};

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [coverImage, setCoverImage] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchPropertyData();
    }, [])
  );

  const fetchPropertyData = async () => {
    try {
      const firstName = await AsyncStorage.getItem("firstName");
      const coverImage = await AsyncStorage.getItem(
        `propertyImages_${propertyid}`
      );

      console.log("firstName:", firstName);

      const response = await axios.get(`${URL}/all-properties`);
      if (response.data && Array.isArray(response.data.properties)) {
        setProperties(response.data.properties.reverse());
        setIsLoading(false);
        setCoverImage(JSON.parse(coverImage));
      } else {
        setIsLoading(false);
        Alert.alert(
          "Error",
          "Failed to fetch properties. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
      setIsLoading(false);
      Alert.alert(
        "Error",
        "Failed to fetch properties. Please check your internet connection and try again later."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <Text style={styles.appName}>My RealEstate Portal</Text>
        </View>
        <View style={styles.searchFilter}>
          <SearchBar
            placeholder="Search Property"
            onChangeText={(text) => console.log(text)}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInput}
          />
          <TouchableOpacity style={styles.filter}>
            <Octicons name="filter" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : properties.length === 0 ? (
        <View style={styles.NoProperty}>
          <Text style={styles.boldText}>No Property</Text>
          <Text style={styles.subHeaderText}>
            No Properties Have Been Added To Your Portal Yet.
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {properties.map((property, index) => (
            <TouchableOpacity
              key={index}
              style={styles.propertyContainer}
              onPress={() =>
                navigation.navigate("PropertyDetailScreen", {
                  property,
                  images: coverImage,
                })
              }
            >
              <Image
                style={styles.logo}
                source={{ uri: coverImage[index] }}
                //  || "default_image_url" }}
              />
              <Text style={styles.price}> ${property.price || 0} </Text>
              <Text style={styles.propertyTitle}>{property.title || ""}</Text>
              <View style={styles.location}>
                <Ionicons
                  name="location-outline"
                  size={20}
                  color="grey"
                  style={styles.locationIcon}
                />
                <Text style={styles.addic}> {property.location || ""} </Text>
              </View>
              <View style={styles.icons}>
                <View style={styles.bed}>
                  <Ionicons
                    name="bed-outline"
                    size={24}
                    color="black"
                    style={styles.bedIcon}
                  />
                  <Text> {property.bedrooms || 0} </Text>
                </View>
                <View style={styles.bath}>
                  <FontAwesome
                    name="bathtub"
                    size={22}
                    color="black"
                    style={styles.bathIcon}
                  />
                  <Text>{property.bathrooms || 0}</Text>
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
    backgroundColor: "#f8f8ff",
  },
  top: {
    backgroundColor: "white",
    width: "100%",
  },
  header: {
    marginLeft: 10,
  },
  appName: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
  },
  searchFilter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  searchBarContainer: {
    backgroundColor: "white",
    borderBottomColor: "white",
    borderTopColor: "white",
    width: "70%",
  },
  searchBarInput: {
    backgroundColor: "#e0e0e0",
  },
  filter: {
    marginTop: 15,
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  NoProperty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  subHeaderText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  scrollContainer: {
    alignItems: "center",
  },
  propertyContainer: {
    borderRadius: 15,
    backgroundColor: "white",
    marginTop: 30,
    width: "90%",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: 200,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  price: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 10,
  },
  propertyTitle: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
  },
  location: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  locationIcon: {
    marginRight: 5,
  },
  addic: {
    fontSize: 15,
    color: "grey",
  },
  icons: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  bed: {
    flexDirection: "row",
    marginRight: 20,
    alignItems: "center",
  },
  bath: {
    flexDirection: "row",
    alignItems: "center",
  },
  bedIcon: {
    marginRight: 5,
  },
  bathIcon: {
    marginRight: 5,
  },
});

export default PropertyListing;

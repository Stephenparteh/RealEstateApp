import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  EvilIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";

const PropertyDetails = ({ route, navigation }) => {
  const { property, images } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SliderBox images={images || []} style={styles.sliderBox} />
      <View style={styles.detailsContainer}>
        <Text style={styles.price}>${property.price}</Text>
        <Text style={styles.propertyTitle}>{property.title}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color="grey" />
          <Text style={styles.locationText}>{property.location}</Text>
        </View>
        <View style={styles.iconsContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="bed-outline" size={24} color="black" />
            <Text style={styles.iconText}>{property.bedrooms}</Text>
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome name="bathtub" size={22} color="black" />
            <Text style={styles.iconText}>{property.bathrooms}</Text>
          </View>
        </View>
        <View style={styles.ownerContainer}>
          <TouchableOpacity
            // onPress={() => navigation.navigate("ProfileScreens")}
            style={styles.accountContainer}
          >
            <EvilIcons name="user" size={45} color="black" />
          </TouchableOpacity>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>
              {property.adminFirstName} {property.adminLastName}
            </Text>
            <Text style={styles.contactText}>{property.contact}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("MessageScreen")}
            style={styles.messageContainer}
          >
            <MaterialIcons name="message" size={35} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.descriptionText}>{property.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f8ff",
  },
  sliderBox: {
    borderRadius: 15,
    marginBottom: 20,
    height: 300,
  },
  detailsContainer: {
    borderRadius: 15,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  price: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 10,
    color: "#333",
  },
  propertyTitle: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 10,
    color: "#333",
  },
  locationContainer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 5,
  },
  iconsContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    marginRight: 20,
  },
  iconText: {
    marginLeft: 5,
    color: "#666",
  },
  ownerContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: "#f0f8ff",
    borderRadius: 15,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  accountContainer: {},
  userInfoContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  contactText: {
    fontSize: 16,
    color: "#666",
  },
  messageContainer: {},
  descriptionText: {
    marginTop: 20,
    color: "#444",
    fontSize: 16,
    lineHeight: 22,
  },
});

export default PropertyDetails;

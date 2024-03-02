import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Welcome To Your Real Estate Portal</Text>
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.question}>
          Are you looking for properties to buy or rent? Tap the button below.
        </Text>
        <TouchableOpacity
          style={styles.answer}
          onPress={() => navigation.navigate("UserStack")}
        >
          <Text style={styles.answerText}>I am a Regular User</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.question}>
          Are you looking to sell or rent your property? Tap the button below.
        </Text>
        <TouchableOpacity
          style={styles.answer}
          onPress={() => navigation.navigate("AgentStack")}
        >
          <Text style={styles.answerText}>I am an Agent</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    marginBottom: 40,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  optionContainer: {
    marginTop: 40,
    width: "100%",
  },
  question: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  answer: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
  },
  answerText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MainScreen;

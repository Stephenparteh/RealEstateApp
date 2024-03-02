import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Server } from "socket.io";

const MessageScreen = (navigation) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Hello EveryOne</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default MessageScreen;

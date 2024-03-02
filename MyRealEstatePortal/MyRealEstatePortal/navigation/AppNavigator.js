import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
// import { FontAwesome6 } from "@expo/vector-icons";

import MessageScreen from "../screens/Message";
import FavoriteScreen from "../screens/Favorite";
import PropertyListing from "../screens/PropertyListing";
import PropertyDetails from "../screens/PropertyDetails";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import UpdatePassword from "../screens/UpdatePassword";
import ProfileScreen from "../screens/Profile";
import EditProfileScreen from "../screens/EditProfile";
import MainScreen from "../screens/Main";
import AddPropertyScreen from "../screens/AddProperty";
import AgentSignUp from "../screens/AgentSignUp";
import AgentSignIn from "../screens/AgentSignIn";
import AgentUpdatePassword from "../screens/AgentUpdatePassword";
import AgentManageProperty from "../screens/AgentManageProperty";
import AgentMessageScreen from "../screens/AgentMessage";
import AgentEditPropertyScreen from "../screens/AgentEditProperty";
import AgentPropertyDetail from "../screens/AgentPropertyDetail";
import AgentProfileScreen from "../screens/AgentProfile";
import AgentEditProfileScreen from "../screens/AgentEditProfile";

const ButtomStack = createBottomTabNavigator();
const AgentButtomStack = createBottomTabNavigator();
const UserStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const PropertyStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const AgentStack = createNativeStackNavigator();
const AgentManagePropertyStack = createNativeStackNavigator();
const AgentProfileStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
        <MainStack.Screen
          name="UserStack"
          component={UserScreen}
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
        <MainStack.Screen
          name="AgentStack"
          component={AgentScreen}
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const UserScreen = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="SignUpScreen"
        component={SignUp}
        options={{
          headerShown: false,
          animation: "none",
        }}
      />
      <UserStack.Screen
        name="SignInScreen"
        component={SignIn}
        options={{
          headerShown: false,
          animation: "none",
        }}
      />
      <UserStack.Screen
        name="UpdatePasswordScreen"
        component={UpdatePassword}
        options={{
          headerShown: false,
          animation: "none",
        }}
      />
      <UserStack.Screen
        name="ButtomTab"
        component={ButtomTab}
        options={{
          headerShown: false,
          animation: "none",
        }}
      />
    </UserStack.Navigator>
  );
};

const ButtomTab = () => (
  <ButtomStack.Navigator>
    <ButtomStack.Screen
      name="PropertyListing"
      component={PropertyStackScreen}
      options={{
        tabBarIcon: () => (
          <MaterialIcons name="explore" size={35} color="black" />
        ),
        headerShown: false,
      }}
    />
    <ButtomStack.Screen
      name="MessageScreen"
      component={MessageScreen}
      options={{
        tabBarIcon: () => (
          <MaterialIcons name="message" size={35} color="black" />
        ),
        headerShown: false,
      }}
    />
    <ButtomStack.Screen
      name="FavoriteScreen"
      component={FavoriteScreen}
      options={{
        tabBarIcon: () => (
          <MaterialIcons name="favorite-border" size={35} color="black" />
        ),
        headerShown: false,
      }}
    />
    <ButtomStack.Screen
      name="ProfileScreens"
      component={ProfileStackScreen}
      options={{
        tabBarIcon: () => <AntDesign name="user" size={35} color="black" />,
        headerShown: false,
      }}
    />
  </ButtomStack.Navigator>
);

const AgentManagePropertyStackScreen = () => (
  <AgentManagePropertyStack.Navigator>
    <AgentManagePropertyStack.Screen
      name="ManagePropertyScreen"
      component={AgentManageProperty}
      options={{
        headerShown: false,
        animation: "none",
      }}
    />
    <AgentManagePropertyStack.Screen
      name="AgentPropertyDetail"
      component={AgentPropertyDetail}
      options={{
        headerShown: false,
        animation: "none",
      }}
    />
    <AgentManagePropertyStack.Screen
      name="AgentEditPropertyScreen"
      component={AgentEditPropertyScreen}
      options={{
        headerShown: false,
        animation: "none",
      }}
    />
  </AgentManagePropertyStack.Navigator>
);
const PropertyStackScreen = () => (
  <PropertyStack.Navigator>
    <PropertyStack.Screen
      name="PropertyListingScreen"
      component={PropertyListing}
      options={{
        headerShown: false,
      }}
    />
    <PropertyStack.Screen
      name="PropertyDetailScreen"
      component={PropertyDetails}
      options={{
        headerShown: false,
      }}
    />
  </PropertyStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        headerShown: false,
        animation: "none",
      }}
    />

    <ProfileStack.Screen
      name="EditProfileScreen"
      component={EditProfileScreen}
      options={{
        headerShown: false,
        animation: "none",
      }}
    />
  </ProfileStack.Navigator>
);

const AgentScreen = () => {
  return (
    <AgentStack.Navigator>
      <AgentStack.Screen
        name="AgentSignUpScreen"
        component={AgentSignUp}
        options={{
          headerShown: false,
          animation: "none",
        }}
      />
      <AgentStack.Screen
        name="AgentSignInScreen"
        component={AgentSignIn}
        options={{
          headerShown: false,
          animation: "none",
        }}
      />

      <AgentStack.Screen
        name="AgentUpdatePasswordScreen"
        component={AgentUpdatePassword}
        options={{
          headerShown: false,
          animation: "none",
        }}
      />
      <AgentStack.Screen
        name="AgentButtomTab"
        component={AgentButtomTab}
        options={{
          headerShown: false,
          animation: "none",
        }}
      />
    </AgentStack.Navigator>
  );
};

const AgentButtomTab = () => (
  <AgentButtomStack.Navigator
    screenOptions={{
      tabBarStyle: {
        height: 65,
        alignItems: "center",
        borderTopLeftRadius: 10,
        borderTopLeftRadius: 10,
      },
    }}
    // initialRouteName="Home"
  >
    <AgentButtomStack.Screen
      name="ManageProperty"
      component={AgentManagePropertyStackScreen}
      options={{
        tabBarLabel: "",
        tabBarIcon: () => (
          <MaterialIcons name="view-list" size={40} color="black" />
        ),
        headerShown: false,
      }}
    />
    <AgentButtomStack.Screen
      name="AddPropertyScreen"
      component={AddPropertyScreen}
      options={{
        tabBarLabel: "",
        tabBarIcon: () => (
          <MaterialIcons name="add-circle" size={40} color="black" />
        ),
        headerShown: false,
      }}
    />
    <AgentButtomStack.Screen
      name="AgentMessageScreen"
      component={AgentMessageScreen}
      options={{
        tabBarLabel: "",
        tabBarIcon: () => (
          <MaterialIcons name="message" size={40} color="black" />
        ),
        headerShown: false,
      }}
    />
    <AgentButtomStack.Screen
      name="AgentProfileScreens"
      component={AgentProfileStackScreen}
      options={{
        tabBarLabel: "",
        tabBarIcon: () => <AntDesign name="user" size={40} color="black" />,
        headerShown: false,
      }}
    />
  </AgentButtomStack.Navigator>
);

const AgentProfileStackScreen = () => (
  <AgentProfileStack.Navigator>
    <AgentProfileStack.Screen
      name="AgentProfileScreen"
      component={AgentProfileScreen}
      options={{
        headerShown: false,
        animation: "none",
      }}
    />

    <AgentProfileStack.Screen
      name="AgentEditProfileScreen"
      component={AgentEditProfileScreen}
      options={{
        headerShown: false,
        animation: "none",
      }}
    />
  </AgentProfileStack.Navigator>
);

export default AppNavigator;

import React, { useContext } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AppProvider, AppContext } from './frontend/context/AppContext';
import AuthScreen from './frontend/screens/AuthScreen';
import HomeScreen from './frontend/screens/HomeScreen';
import ProfileScreen from './frontend/screens/ProfileScreen';
import CoursesScreen from './frontend/screens/CoursesScreen';
import SettingsScreen from './frontend/screens/SettingsScreen';
import CourseDetailsScreen from './frontend/screens/CourseDetailsScreen';
import { DARK_COLORS } from './frontend/styling/GlobalStyles';
import { COLORS } from './frontend/styling/GlobalStyles';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs
function MainTabs() {
  const { dark } = useContext(AppContext);
  const colors = dark ? DARK_COLORS : null;
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors?.primary || '#4B1971',
        tabBarInactiveTintColor: dark ? '#9CA3AF' : '#6B7280',
        tabBarStyle: {
          backgroundColor: dark ? '#1F2937' : '#FFFFFF',
          borderTopColor: dark ? '#374151' : '#E5E7EB',
        },
        tabBarIcon: ({ color, size }) => {
          let icon;

          if (route.name === 'Home') icon = 'home';
          else if (route.name === 'Courses') icon = 'book';
          else if (route.name === 'Profile') icon = 'account';
          else if (route.name === 'Settings') icon = 'cog';

          return <MaterialCommunityIcons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}


function AppContent() {
  const { dark, user, loading } = useContext(AppContext);

  if (loading) return null;

  const navigationContent = (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Authentication" component={AuthScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
        </>
      )}
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      {dark ? (
        <View style={{ flex: 1, backgroundColor: DARK_COLORS.background }}>
          {navigationContent}
        </View>
      ) : (
        <ImageBackground
          source={{ uri: 'https://img.freepik.com/free-vector/abstract-low-poly-mesh-background-design_1048-7440.jpg' }}
          style={styles.background}
          imageStyle={{ opacity: 0.4 }}
        >
          {navigationContent}
        </ImageBackground>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.background, 
  },
  darkContainer: {
    flex: 1,
  },
});
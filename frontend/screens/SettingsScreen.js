import React, { useState, useEffect, useMemo, useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/AppContext';
import { getGlobalStyles, COLORS, DARK_COLORS, SPACING } from '../styling/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const { dark, toggleTheme, resetData } = useContext(AppContext);

  const styles = useMemo(() => getGlobalStyles(dark), [dark]);
  const currentColors = useMemo(() => dark ? DARK_COLORS : COLORS, [dark]);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const notif = await AsyncStorage.getItem('notifications');
    setNotifications(notif !== 'false');
    const lang = await AsyncStorage.getItem('language');
    setLanguage(lang || 'en');
  };

  const toggleDark = async () => {
    await toggleTheme();
  };

  const toggleNotifications = async () => {
    const newNotif = !notifications;
    setNotifications(newNotif);
    await AsyncStorage.setItem('notifications', newNotif.toString());
  };

  const selectLanguage = () => {
    Alert.alert(
      "Select Language",
      "Choose your preferred language",
      [
        { text: "English", onPress: () => changeLanguage('en') },
        { text: "Urdu", onPress: () => changeLanguage('ur') },
        { text: "Spanish", onPress: () => changeLanguage('es') },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const changeLanguage = async (value) => {
    setLanguage(value);
    await AsyncStorage.setItem('language', value);
  };

const handleReset = () => {
  Alert.alert(
    'Reset All Data',
    'This will clear all your saved data. Are you sure?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await resetData();  // This should clear user and theme
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Authentication' }],
            })
          );
        },
      },
    ]
  );
};


  const showAbout = () => {
    Alert.alert("About", "Student App v1.0\nDeveloped for MAD Lab");
  };

  const getLanguageName = (code) => {
    const langs = { en: 'English', ur: 'Urdu', es: 'Spanish' };
    return langs[code] || 'English';
  };

  return (
    <ScrollView style={styles.container}>
      <Text></Text>
      <Text style={styles.heading}>Settings</Text>
      
      <View style={[styles.card, { marginBottom: SPACING.sm }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="theme-light-dark" size={24} color={currentColors.primary} />
            <Text style={[styles.textMain, { marginLeft: SPACING.md }]}>Dark Mode</Text>
          </View>
          <Switch value={dark} onValueChange={toggleDark} />
        </View>
      </View>

      <View style={[styles.card, { marginBottom: SPACING.sm }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="bell-outline" size={24} color={currentColors.primary} />
            <Text style={[styles.textMain, { marginLeft: SPACING.md }]}>Notifications</Text>
          </View>
          <Switch value={notifications} onValueChange={toggleNotifications} />
        </View>
      </View>

      <TouchableOpacity style={[styles.card, { marginBottom: SPACING.sm }]} onPress={selectLanguage}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="translate" size={24} color={currentColors.primary} />
            <Text style={[styles.textMain, { marginLeft: SPACING.md }]}>Language</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.textSecondary, { marginRight: SPACING.md }]}>{getLanguageName(language)}</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color={currentColors.textTertiary} />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, { marginBottom: SPACING.xl }]} onPress={showAbout}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="information-outline" size={24} color={currentColors.primary} />
            <Text style={[styles.textMain, { marginLeft: SPACING.md }]}>About</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={currentColors.textTertiary} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, { marginBottom: SPACING.xl }]} onPress={handleReset}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="refresh" size={24} color={currentColors.danger} />
            <Text style={[styles.textMain, { marginLeft: SPACING.md, color: currentColors.danger }]}>Reset All Data</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={currentColors.textTertiary} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: currentColors.danger }]} onPress={() => {
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Logout',
              onPress: async () => {
                await AsyncStorage.removeItem('user');
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Authentication' }],
                  })
                );
              },
            },
          ]
        );
      }}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
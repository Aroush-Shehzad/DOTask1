import React, { useState, useEffect, useMemo, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';
import { getGlobalStyles, COLORS, DARK_COLORS, SPACING } from '../styling/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const { user, updateUser, dark } = useContext(AppContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sap, setSap] = useState('');
  const [gpa, setGpa] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const styles = useMemo(() => getGlobalStyles(dark), [dark]);
  const currentColors = dark ? DARK_COLORS : COLORS;

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setSap(user.sap || '');
      setGpa(user.gpa || '');
      setProfileImage(user.profileImage || '');
    }
  }, [user]);

  const saveProfile = async () => {
    const updatedUser = { ...user, name, email, sap, gpa, profileImage };
    await updateUser(updatedUser);
    Alert.alert('Saved', 'Profile updated successfully.');
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text></Text>
      
      <Text style={styles.heading}>Edit Profile</Text>

      <View style={{ alignItems: 'center', marginBottom: SPACING.xl }}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profileImage }} style={[styles.avatar, { width: 100, height: 100, borderRadius: 50 }]} />
        </TouchableOpacity>
      </View>

      {[{ label: name, set: setName, icon: 'account-outline' },
        { label: email, set: setEmail, icon: 'email-outline' },
        { label: sap, set: setSap, icon: 'id-card' },
        { label: gpa, set: setGpa, icon: 'chart-line' }].map((field, i) => (
        <View key={i} style={styles.inputContainer}>
          <MaterialCommunityIcons name={field.icon} size={20} color={currentColors.primary} />
          <TextInput style={styles.input} value={field.label} onChangeText={field.set} />
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
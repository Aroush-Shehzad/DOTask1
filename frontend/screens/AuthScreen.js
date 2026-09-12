import React, { useState, useMemo, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  ImageBackground, 
  StyleSheet 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/AppContext';
import { getGlobalStyles, COLORS, DARK_COLORS, SPACING } from '../styling/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AuthScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { dark, updateUser } = useContext(AppContext);

  const styles = useMemo(() => getGlobalStyles(dark), [dark]);
  const currentColors = useMemo(() => (dark ? DARK_COLORS : COLORS), [dark]);

  const backgroundImage = { uri: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop' };

  const signup = async () => {
    if (!name || !email || !password) return Alert.alert('Error', 'Please fill all fields');
    const user = { 
      email, 
      password, 
      name, 
      semester: '6',
      sap: '55432', 
      gpa: '0.0',
      cgpa: '0.0',
      profileImage: 'https://i.pravatar.cc/150?u=Sara' 
    };
    await updateUser(user);
    navigation.replace('Main');
  };

  const login = async () => {
    const data = await AsyncStorage.getItem('user');
    if (data) {
      navigation.replace('Main');
    } else {
      Alert.alert('No user found', 'Try signing up first!');
    }
  };

  return (
    <ImageBackground 
      source={backgroundImage} 
      style={{ flex: 1 }} 
      imageStyle={{ opacity: 0.9 }}
      resizeMode="cover"
    >
      <View style={[StyleSheet.absoluteFill, { backgroundColor: dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.65)' }]} />
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.section, { width: '100%' }]}>
          <Text style={styles.heading}>Welcome Back</Text>
          <Text style={styles.subHeading}>Login to continue your learning journey</Text>
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account-outline" size={20} color={currentColors.primary} />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor={currentColors.textSecondary}
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email-outline" size={20} color={currentColors.primary} />
          <TextInput
            placeholder="Email Address"
            placeholderTextColor={currentColors.textSecondary}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock-outline" size={20} color={currentColors.primary} />
          <TextInput
            placeholder="Password"
            placeholderTextColor={currentColors.textSecondary}
            secureTextEntry={!passwordVisible}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <MaterialCommunityIcons name={passwordVisible ? "eye-off" : "eye"} size={20} color={currentColors.textSecondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: currentColors.primary, marginTop: SPACING.lg, width: '100%', maxWidth: 380, alignSelf: 'center' }]}
          onPress={login}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={signup} style={{ marginTop: SPACING.lg, alignItems: 'center' }}>
          <Text style={{ color: currentColors.textSecondary }}>
            Don't have an account?{' '}
            <Text style={{ color: currentColors.primary, fontWeight: 'bold' }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}
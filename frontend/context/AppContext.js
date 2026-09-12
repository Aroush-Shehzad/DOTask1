import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppState();
  }, []);

  const loadAppState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      const theme = await AsyncStorage.getItem('theme');
      setDark(theme === 'dark');
    } catch (error) {
      console.error('Error loading app state:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newDark = !dark;
      setDark(newDark);
      await AsyncStorage.setItem('theme', newDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  const resetData = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('theme');
      setUser(null);
      setDark(false);
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  };

  const value = {
    user,
    setUser,
    updateUser,
    dark,
    setDark,
    toggleTheme,
    loading,
    resetData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

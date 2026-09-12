import React, { useEffect, useState, useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/AppContext';
import { getGlobalStyles, COLORS, DARK_COLORS, SPACING } from '../styling/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const courses = [
  { id: '1', name: "Mobile App Dev", icon: 'cellphone', progress: 0.75, enrolled: true, timing: 'MWF 10:00 AM - 11:30 AM' },
  { id: '2', name: "Artificial Intelligence", icon: 'robot', progress: 0.5, enrolled: true, timing: 'TTh 2:00 PM - 3:30 PM' },
  { id: '3', name: "Database Systems", icon: 'database', progress: 0, enrolled: false, timing: 'MWF 1:00 PM - 2:30 PM' },
  { id: '4', name: "Operating Systems", icon: 'microsoft-windows', progress: 0, enrolled: false, timing: 'TTh 10:00 AM - 11:30 AM' },
  { id: '5', name: "UX Design", icon: 'palette', progress: 0, enrolled: false, timing: 'MWF 3:00 PM - 4:30 PM' },
  { id: '6', name: "Data Science", icon: 'chart-line', progress: 0, enrolled: false, timing: 'TTh 1:00 PM - 2:30 PM' },
  { id: '7', name: "Web Development", icon: 'web', progress: 0, enrolled: false, timing: 'MWF 11:30 AM - 1:00 PM' },
];

export default function CoursesScreen({ navigation }) {
  const { dark } = useContext(AppContext);

  const styles = useMemo(() => getGlobalStyles(dark), [dark]);
  const currentColors = dark ? DARK_COLORS : COLORS;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    });

    return unsubscribe;
  }, [navigation]);

  const enrollCourse = (courseId) => {
    alert(`Enrolled in ${courses.find(c => c.id === courseId).name}!`);
  };

  const ProgressBar = ({ progress }) => {
    return (
      <View style={{ height: 6, backgroundColor: currentColors.borderColor, borderRadius: 4, overflow: 'hidden', marginTop: SPACING.xs }}>
        <View style={{ height: '100%', width: `${progress * 100}%`, backgroundColor: currentColors.primary, borderRadius: 4 }} />
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingBottom: 40 }]}>
      <Text></Text>
      <Text style={styles.heading}>My Courses</Text>
      <Text></Text>
      <FlatList
        data={courses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, { marginBottom: SPACING.md }]}
            onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
          >
            <View style={{ width: 50, height: 50, borderRadius: 12, backgroundColor: currentColors.primary, opacity: 0.15, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.lg }}>
              <MaterialCommunityIcons name={item.icon} size={26} color={currentColors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.textMain, { fontWeight: '700' }]}>{item.name}</Text>
              <Text style={styles.textCaption}>{item.timing}</Text>
              {item.enrolled && (
                <View style={{ marginTop: SPACING.sm }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.xs }}>
                    <Text style={styles.textSmall}>Progress</Text>
                    <Text style={styles.textSmall}>{Math.round(item.progress * 100)}%</Text>
                  </View>
                  <ProgressBar progress={item.progress} />
                </View>
              )}
            </View>
            {item.enrolled ? (
              <TouchableOpacity style={[styles.buttonSecondary, { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm }]}>
                <Text style={styles.buttonSecondaryText}>Continue</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.button, { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm }]} onPress={() => enrollCourse(item.id)}>
                <Text style={styles.buttonText}>Enroll</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
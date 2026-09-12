import React, { useEffect, useState, useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';
import { getGlobalStyles, COLORS, DARK_COLORS, SPACING } from '../styling/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const courseDetails = {
  '1': { 
    name: "Mobile App Dev", 
    icon: 'cellphone',
    timing: 'MWF 10:00 AM - 11:30 AM',
    instructor: 'Dr. Ahmed Hassan',
    room: 'Lab 401',
    credits: 3,
    description: 'Learn to build cross-platform mobile applications using React Native.'
  },
  '2': {
    name: "Artificial Intelligence",
    icon: 'robot',
    timing: 'TTh 2:00 PM - 3:30 PM',
    instructor: 'Prof. Fatima Khan',
    room: 'Room 305',
    credits: 3,
    description: 'Introduction to AI principles, machine learning, and neural networks.'
  },
  '3': {
    name: "Database Systems",
    icon: 'database',
    timing: 'MWF 1:00 PM - 2:30 PM',
    instructor: 'Dr. Hassan Ali',
    room: 'Lab 201',
    credits: 3,
    description: 'Design and implementation of relational and NoSQL databases.'
  },
  '4': {
    name: "Operating Systems",
    icon: 'microsoft-windows',
    timing: 'TTh 10:00 AM - 11:30 AM',
    instructor: 'Prof. Sara Ahmed',
    room: 'Room 402',
    credits: 4,
    description: 'Study of process management, memory management, and file systems.'
  },
  '5': {
    name: "UX Design",
    icon: 'palette',
    timing: 'MWF 3:00 PM - 4:30 PM',
    instructor: 'Ms. Yara Ibrahim',
    room: 'Design Studio 101',
    credits: 3,
    description: 'User experience principles, wireframing, and design thinking.'
  },
  '6': {
    name: "Data Science",
    icon: 'chart-line',
    timing: 'TTh 1:00 PM - 2:30 PM',
    instructor: 'Dr. Khalid Mohammed',
    room: 'Data Lab 105',
    credits: 3,
    description: 'Data analysis, visualization, and predictive modeling techniques.'
  },
  '7': {
    name: "Web Development",
    icon: 'web',
    timing: 'MWF 11:30 AM - 1:00 PM',
    instructor: 'Eng. Omar Malik',
    room: 'Lab 301',
    credits: 3,
    description: 'Frontend and backend web development using modern frameworks.'
  },
};

export default function CourseDetailsScreen({ route, navigation }) {
  const { courseId } = route.params || {};
  const { dark } = useContext(AppContext);
  const styles = useMemo(() => getGlobalStyles(dark), [dark]);
  const currentColors = dark ? DARK_COLORS : COLORS;

  const course = courseDetails[courseId] || courseDetails['1'];

  const handleEnroll = () => {
    Alert.alert('Enrolled', `You have enrolled in ${course.name}!`);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: SPACING.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="chevron-left" size={28} color={currentColors.primary} />
          <Text style={[styles.textMain, { marginLeft: SPACING.sm, color: currentColors.primary }]}>Back</Text>
        </View>
      </TouchableOpacity>

      <View style={[styles.card, { backgroundColor: currentColors.primary, marginBottom: SPACING.xl, padding: SPACING.xl }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.lg }}>
          <MaterialCommunityIcons name={course.icon} size={48} color="white" />
          <View style={{ marginLeft: SPACING.lg, flex: 1 }}>
            <Text style={[styles.heading2, { color: 'white', marginBottom: SPACING.xs }]}>{course.name}</Text>
            <Text style={[styles.textCaption, { color: 'rgba(255,255,255,0.8)' }]}>{course.credits} Credit Hours</Text>
          </View>
        </View>
      </View>

      <View style={[styles.card, { marginBottom: SPACING.md }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md }}>
          <MaterialCommunityIcons name="clock-outline" size={24} color={currentColors.primary} />
          <View style={{ marginLeft: SPACING.md, flex: 1 }}>
            <Text style={styles.textCaption}>Timing</Text>
            <Text style={[styles.textMain, { marginTop: SPACING.xs }]}>{course.timing}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.card, { marginBottom: SPACING.md }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md }}>
          <MaterialCommunityIcons name="account-tie-outline" size={24} color={currentColors.primary} />
          <View style={{ marginLeft: SPACING.md, flex: 1 }}>
            <Text style={styles.textCaption}>Instructor</Text>
            <Text style={[styles.textMain, { marginTop: SPACING.xs }]}>{course.instructor}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.card, { marginBottom: SPACING.md }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md }}>
          <MaterialCommunityIcons name="map-marker-outline" size={24} color={currentColors.primary} />
          <View style={{ marginLeft: SPACING.md, flex: 1 }}>
            <Text style={styles.textCaption}>Classroom</Text>
            <Text style={[styles.textMain, { marginTop: SPACING.xs }]}>{course.room}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.card, { marginBottom: SPACING.xl }]}>
        <Text style={[styles.heading3, { marginBottom: SPACING.md }]}>Description</Text>
        <Text style={[styles.textMain, { lineHeight: 24 }]}>{course.description}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEnroll}>
        <Text style={styles.buttonText}>Enroll Now</Text>
      </TouchableOpacity>
      <Text></Text>
        <Text></Text>
        <Text></Text>
    </ScrollView>
    
  );
}

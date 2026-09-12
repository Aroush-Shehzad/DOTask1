import React, { useEffect, useState, useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, RefreshControl, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getGlobalStyles, COLORS, DARK_COLORS, SPACING } from '../styling/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState({ name: 'Guest', sap: '-----', gpa: '0.0' });
  const { dark } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const styles = useMemo(() => getGlobalStyles(dark), [dark]);
  const currentColors = dark ? DARK_COLORS : COLORS;

  const courses = [
    { id: '1', name: "Mobile App Dev", icon: 'cellphone', category: 'Programming' },
    { id: '2', name: "Artificial Intelligence", icon: 'robot', category: 'AI' },
    { id: '3', name: "Database Systems", icon: 'database', category: 'Tech' },
    { id: '4', name: "Operating Systems", icon: 'microsoft-windows', category: 'Tech' },
    { id: '5', name: "UX Design", icon: 'palette', category: 'Design' },
    { id: '6', name: "Data Science", icon: 'chart-line', category: 'Data' },
  ];

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    loadData();

    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    return unsubscribe;
  }, [navigation]);

  const loadData = async () => {
    const data = await AsyncStorage.getItem('user');
    if (data) setUser(JSON.parse(data));
    // const theme = await AsyncStorage.getItem('theme');
    // setDark(theme === 'dark');
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleViewNow = () => {
    navigation.navigate('Courses');
  };

  const handleViewAll = () => {
    navigation.navigate('Courses');
  };

  const handleCoursePress = (course) => {
    alert(`Selected: ${course.name}`);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.heading}>Loading...</Text>
        <Text style={[styles.subHeading, { textAlign: 'center' }]}>Preparing your dashboard</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[currentColors.primary]} />
        }
      >
        {/* Header with Avatar */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.xl }}>
          <View>
            <Text></Text>
            <Text></Text>
            <Text style={styles.heading}>Hello, {user.name}!</Text>
            <Text style={styles.subHeading}>Ready to start learning?</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image 
              source={{ uri: user.profileImage || 'https://i.pravatar.cc/150?u=Sara' }} 
              style={styles.avatar} 
            />
          </TouchableOpacity>
        </View>

        {/* Card */}
        <TouchableOpacity style={[styles.card, { backgroundColor: currentColors.primary, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', marginBottom: SPACING.xl }]} onPress={handleViewNow}>
          <View style={{ flex: 1.5, zIndex: 1 }}>
            <Text style={[styles.heading3, { color: 'white', marginBottom: SPACING.sm }]}>New Course!</Text>
            <Text style={[styles.textSecondary, { color: 'rgba(255,255,255,0.8)', marginBottom: SPACING.md }]}>User Experience Class</Text>
            <View style={[styles.badge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <Text style={[styles.badgeText, { color: 'white' }]}>View Now</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="rocket-launch" size={80} color="rgba(255,255,255,0.2)" style={{ position: 'absolute', right: -10 }} />
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={[styles.inputContainer, { marginBottom: SPACING.xl, backgroundColor: currentColors.cardBg }]}>
          <MaterialCommunityIcons name="magnify" size={22} color={currentColors.textSecondary} />
          <TextInput
            placeholder="Search for courses..."
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={currentColors.textTertiary}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons name="close" size={22} color={currentColors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Course Categories */}
        <View style={{ marginBottom: SPACING.xl }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md }}>
            <Text style={styles.heading2}>Featured Courses</Text>
            <TouchableOpacity onPress={handleViewAll}>
              <Text style={[styles.textMain, { color: currentColors.primary, fontWeight: '600' }]}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: SPACING.md }}>
            {['UX Design', 'Programming', 'Business', 'Marketing'].map((item, index) => (
              <TouchableOpacity key={index} style={{ backgroundColor: index === 0 ? currentColors.primary : currentColors.cardBg, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: 12, marginRight: SPACING.sm, borderWidth: 1, borderColor: currentColors.borderColor }} onPress={() => setSearchQuery(item)}>
                <Text style={[styles.textMain, { color: index === 0 ? '#FFF' : currentColors.textSecondary, fontWeight: '600' }]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Course List */}
          {filteredCourses.map((item) => (
              <TouchableOpacity key={item.id} style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]} onPress={() => handleCoursePress(item)}>
                <View style={[styles.iconButton, { marginRight: SPACING.md }]}>
                  <MaterialCommunityIcons name={item.icon} size={28} color={currentColors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.textMain, { fontWeight: '600' }]}>{item.name}</Text>
                  <Text style={styles.textCaption}>{item.category}</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color={currentColors.textSecondary} />
              </TouchableOpacity>
          ))}
        </View>

        {/* Dashboard Stats */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: SPACING.xl, gap: SPACING.md }}>
          <View style={[styles.card, { width: '48%', alignItems: 'center', padding: SPACING.lg }]}>
            <MaterialCommunityIcons name="star" size={32} color={currentColors.primary} />
            <Text style={[styles.heading2, { marginTop: SPACING.sm, fontSize: 24 }]}>{user.gpa || '3.9'}</Text>
            <Text style={[styles.textCaption, { marginTop: SPACING.xs }]}>Current GPA</Text>
          </View>
          
          <View style={[styles.card, { width: '48%', alignItems: 'center', padding: SPACING.lg }]}>
            <MaterialCommunityIcons name="book-open-variant" size={32} color={currentColors.primary} />
            <Text style={[styles.heading2, { marginTop: SPACING.sm, fontSize: 24 }]}>12</Text>
            <Text style={[styles.textCaption, { marginTop: SPACING.xs }]}>Completed</Text>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}
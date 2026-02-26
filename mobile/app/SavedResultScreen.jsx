import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  StatusBar
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Mock data based on the provided image
const SAVED_DATA = [
  {
    id: '1',
    title: 'Tomato Leaf Blight',
    date: 'Nov 10, 2025',
    confidence: '92%',
    image: 'https://placehold.co/100x100/333/white.png', // Replace with actual assets
  },
  {
    id: '2',
    title: 'Healthy Leaf',
    date: 'Nov 9, 2025',
    confidence: '98%',
    image: 'https://placehold.co/100x100/689F38/white.png',
  },
  {
    id: '3',
    title: 'Powdery Mildew',
    date: 'Nov 8, 2025',
    confidence: '88%',
    image: 'https://placehold.co/100x100/444/white.png',
  },
  {
    id: '4',
    title: 'Bacterial Spot',
    date: 'Nov 7, 2025',
    confidence: '85%',
    image: 'https://placehold.co/100x100/689F38/white.png',
  },
  {
    id: '5',
    title: 'Septorial Leaf Spot',
    date: 'Nov 6, 2025',
    confidence: '90%',
    image: 'https://placehold.co/100x100/444/white.png',
  },
];

const SavedResultsScreen = ({ navigation }) => {

  const [search, setSearch] = useState('');

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.thumbnail} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDate}>{item.date}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.confidence} confident</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Results</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={20} color="#9E9E9E" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search diagnoses..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* List Area */}
      <View style={styles.listBackground}>
        <FlatList
          data={SAVED_DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={true}
        />
      </View>

      {/* Bottom Tab Bar (Static Mockup) */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="#9E9E9E" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="bookmark-check" size={24} color="#2E7D32" />
          <Text style={[styles.tabLabel, { color: '#2E7D32' }]}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={24} color="#9E9E9E" />
          <Text style={styles.tabLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  listBackground: {
    flex: 1,
    backgroundColor: '#F1F8E9', // Light green background for the list area
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 14,
    color: '#9E9E9E',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '600',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    width: '100%',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 4,
  },
});

export default SavedResultsScreen;
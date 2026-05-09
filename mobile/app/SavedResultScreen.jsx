import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SavedResultsScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch History from Backend (Matches Web Logic)
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get('https://agro-health.onrender.com/api/scan/history', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.data.success) {
          setResults(response.data.history);
          setFilteredResults(response.data.history);
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // 2. Search Filtering Logic
  useEffect(() => {
    const filtered = results.filter(item => 
      (item.label || "").toLowerCase().includes(search.toLowerCase())
    );
    setFilteredResults(filtered);
  }, [search, results]);

  const renderItem = ({ item }) => {
    // Confidence conversion logic matching Web
    const displayConfidence = item.confidence < 1 
      ? (item.confidence * 100).toFixed(0) 
      : item.confidence;

    // Severity styling matching Web Badge logic
    const isSevere = item.severity?.toLowerCase() === 'severe';
    const isModerate = item.severity?.toLowerCase() === 'moderate';

    return (
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('DiagnosisDetails', { result: item })}
      >
        <Image 
          source={{ uri: item.imagePath || item.image }} 
          style={styles.thumbnail} 
        />
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.label}</Text>
          <Text style={styles.cardDate}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
          
          <View style={styles.badgeRow}>
            <View style={styles.confidenceBadge}>
              <Text style={styles.confidenceText}>{displayConfidence}% Match</Text>
            </View>
            
            <View style={[
              styles.severityBadge, 
              { backgroundColor: isSevere ? '#EF4444' : isModerate ? '#A3E635' : '#E5E7EB' }
            ]}>
              <Text style={[
                styles.severityText, 
                { color: isModerate ? '#1C8C36' : '#FFF' }
              ]}>
                {item.severity || "Unknown"}
              </Text>
            </View>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCC" />
      </TouchableOpacity>
    );
  };

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
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#1C8C36" />
            <Text style={styles.loadingText}>Loading history...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredResults}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.center}>
                <MaterialCommunityIcons name="inbox-outline" size={60} color="#CCC" />
                <Text style={styles.emptyText}>No saved results found.</Text>
              </View>
            }
          />
        )}
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="#9E9E9E" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="bookmark-check" size={24} color="#1C8C36" />
          <Text style={[styles.tabLabel, { color: '#1C8C36' }]}>Saved</Text>
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
    color: '#1C8C36',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
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
    backgroundColor: '#F9FAF9', 
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDate: {
    fontSize: 12,
    color: '#9E9E9E',
    marginVertical: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  confidenceBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  confidenceText: {
    color: '#166534',
    fontSize: 10,
    fontWeight: '700',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  severityText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: 10,
    color: '#6B7280',
  },
  emptyText: {
    marginTop: 10,
    color: '#9E9E9E',
    fontSize: 15,
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
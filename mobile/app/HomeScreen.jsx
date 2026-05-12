import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, ScrollView, ActivityIndicator, Image} from 'react-native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const FarmerDashboard = ({ navigation }) => {
  const [firstName, setFirstName] = useState('Farmer');
  const [userDiagnoses, setUserDiagnoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ scans: 0, saved: 0, accuracy: 0 });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // 1. Get User Name
        const storedName = await AsyncStorage.getItem('userName');
        if (storedName) {
          setFirstName(storedName.split(' ')[0]);
        }

        // 2. Get Token and Fetch History
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get('https://agro-health.onrender.com/api/scan/history', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          const history = response.data.history;
          setUserDiagnoses(history);

          // 3. Calculate Stats for the Activity Card
          const totalScans = history.length;
          const avgConfidence = totalScans > 0 
            ? (history.reduce((acc, curr) => acc + (curr.confidence < 1 ? curr.confidence * 100 : curr.confidence), 0) / totalScans).toFixed(0)
            : 0;

          setStats({
            scans: totalScans,
            saved: totalScans,
            accuracy: avgConfidence
          });
        }
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.greetingRow}>
            <Text style={styles.greetingText}>Hello, {firstName}!</Text>
            <MaterialCommunityIcons name="hand-wave" size={28} color="#EBC247" style={styles.waveIcon} />
          </View>
          <Text style={styles.subGreeting}>Diagnose your crops and get instant treatment recommendations</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={[styles.card, styles.scanCard]} onPress={() => navigation.navigate('Scanner')}>
            <View style={styles.iconCircle}>
              <Feather name="camera" size={24} color="white" />
            </View>
            <Text style={styles.cardText}>Scan Leaf</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.uploadCard]} onPress={() => navigation.navigate('Scanner')}>
            <View style={styles.iconCircleLight}>
              <Feather name="upload" size={24} color="#2E7D32" />
            </View>
            <Text style={styles.cardText}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity Card - Now with Dynamic Data */}
        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>Recent Activity</Text>
            {userDiagnoses.length > 0 && (
              <TouchableOpacity onPress={() => navigation.navigate('Saved')}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.scans}</Text>
              <Text style={styles.statLabel}>Scans</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.saved}</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#1B5E20' }]}>{stats.accuracy}%</Text>
              <Text style={styles.statLabel}>Avg. Accuracy</Text>
            </View>
          </View>

          {/* List of Recent Items inside the Card (limit 3) */}
          <View style={styles.recentList}>
            {loading ? (
              <ActivityIndicator color="#1B5E20" style={{ marginVertical: 20 }} />
            ) : userDiagnoses.length > 0 ? (
              userDiagnoses.slice(0, 3).map((item) => (
                <TouchableOpacity 
                  key={item._id} 
                  style={styles.historyItem}
                  onPress={() => navigation.navigate('Scans', { result: item })}
                >
                  <Image 
                    source={{ uri: item.imagePath || item.image }} 
                    style={styles.historyImage} 
                  />
                  <View style={styles.historyInfo}>
                    <Text style={styles.historyLabel} numberOfLines={1}>
                      {item.label || item.disease}
                    </Text>
                    <Text style={styles.historyDate}>
                      {new Date(item.createdAt || item.date).toLocaleDateString()}
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={18} color="#CCC" />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyText}>No recent scans found.</Text>
            )}
          </View>
        </View>

      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#1B5E20" />
          <Text style={[styles.tabLabel, { color: '#1B5E20' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Saved')}>
          <MaterialCommunityIcons name="bookmark-check-outline" size={24} color="#9E9E9E" />
          <Text style={styles.tabLabel}>Saved</Text>
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
    backgroundColor: '#F7FCF8',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 30,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  waveIcon: {
    marginLeft: 8,
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    lineHeight: 20,
  },
  actionContainer: {
    gap: 15,
    marginBottom: 25,
  },
  card: {
    height: 120,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scanCard: {
    backgroundColor: '#1B5E20',
  },
  uploadCard: {
    backgroundColor: '#AEEA00',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircleLight: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'between',
    alignItems: 'center',
    marginBottom: 15,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    flex: 1,
  },
  viewAllText: {
    color: '#1B5E20',
    fontSize: 12,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  statLabel: {
    fontSize: 11,
    color: '#9E9E9E',
    marginTop: 4,
  },
  recentList: {
    marginTop: 15,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FAFAFA',
  },
  historyImage: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  historyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  historyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B5E20',
  },
  historyDate: {
    fontSize: 11,
    color: '#9E9E9E',
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#9E9E9E',
    fontSize: 12,
    marginVertical: 20,
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

export default FarmerDashboard;
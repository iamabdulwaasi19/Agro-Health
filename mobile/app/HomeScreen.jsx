import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  StyleSheet, 
  StatusBar,
  ScrollView
} from 'react-native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';

const FarmerDashboard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.greetingRow}>
            <Text style={styles.greetingText}>Hello, Farmer!</Text>
            <MaterialCommunityIcons name="hand-wave" size={28} color="#EBC247" style={styles.waveIcon} />
          </View>
          <Text style={styles.subGreeting}>Ready to check your crops?</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          {/* Scan Leaf Button */}
          <TouchableOpacity style={[styles.card, styles.scanCard]} onPress={() => navigation.navigate('Scanner')}>
            <View style={styles.iconCircle}>
              <Feather name="camera" size={24} color="white" />
            </View>
            <Text style={styles.cardText}>Scan Leaf</Text>
          </TouchableOpacity>

          {/* Upload Image Button */}
          <TouchableOpacity style={[styles.card, styles.uploadCard]} onPress={() => navigation.navigate('Scanner')}>
            <View style={styles.iconCircleLight}>
              <Feather name="upload" size={24} color="#2E7D32" />
            </View>
            <Text style={styles.cardText}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity Card */}
        <View style={styles.activityCard}>
          <Text style={styles.activityTitle}>Recent Activity</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Scans</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>18</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#2E7D32' }]}>95%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Tab Bar (Static Mockup) */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#2E7D32" />
          <Text style={[styles.tabLabel, { color: '#2E7D32' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Results')}>
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
  },
  header: {
    marginBottom: 40,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  waveIcon: {
    marginLeft: 10,
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  actionContainer: {
    gap: 20,
    marginBottom: 30,
  },
  card: {
    height: 140,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  scanCard: {
    backgroundColor: '#1B5E20', // Dark green
  },
  uploadCard: {
    backgroundColor: '#AEEA00', // Lime green
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconCircleLight: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    marginBottom: 100,
  },
  activityTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 4,
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
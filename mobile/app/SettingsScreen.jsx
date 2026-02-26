import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Switch,
  ScrollView,
  StatusBar
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const SettingsScreen = ({navigation}) => {
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  const SettingItem = ({ icon, title, subtitle, value, onValueChange, isLast, isDestructive, hasChevron }) => (
    <View style={[styles.itemContainer, isLast && { borderBottomWidth: 0 }]}>
      <View style={[styles.iconBox, isDestructive && styles.destructiveIconBox]}>
        {icon}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.itemTitle, isDestructive && { color: '#D32F2F' }]}>{title}</Text>
        {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
      </View>
      {onValueChange ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#D1D1D1', true: '#2E7D32' }}
          thumbColor="#FFF"
        />
      ) : (
        hasChevron && <Feather name="chevron-right" size={20} color="#BDBDBD" />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* PREFERENCES SECTION */}
        <Text style={styles.sectionHeader}>PREFERENCES</Text>
        <View style={styles.sectionCard}>
          <SettingItem 
            icon={<Ionicons name="globe-outline" size={22} color="#2E7D32" />}
            title="Language"
            subtitle="English"
            hasChevron
          />
          <SettingItem 
            icon={<Ionicons name="notifications-outline" size={22} color="#2E7D32" />}
            title="Notifications"
            subtitle="Get alerts and updates"
            value={notifications}
            onValueChange={setNotifications}
          />
          <SettingItem 
            icon={<MaterialCommunityIcons name="wifi-off" size={22} color="#2E7D32" />}
            title="Offline Mode"
            subtitle="Save data for offline use"
            value={offlineMode}
            onValueChange={setOfflineMode}
            isLast
          />
        </View>

        {/* SUPPORT SECTION */}
        <Text style={styles.sectionHeader}>SUPPORT</Text>
        <View style={styles.sectionCard}>
          <SettingItem 
            icon={<Ionicons name="help-circle-outline" size={22} color="#2E7D32" />}
            title="Help & FAQ"
            subtitle="Get support and answers"
            hasChevron
          />
          <SettingItem 
            icon={<Ionicons name="information-circle-outline" size={22} color="#2E7D32" />}
            title="About"
            subtitle="Version 1.0.0"
            hasChevron
            isLast
          />
        </View>

        {/* ACCOUNT SECTION */}
        <Text style={styles.sectionHeader}>ACCOUNT</Text>
        <View style={styles.sectionCard}>
          <TouchableOpacity onPress= {() => navigation.navigate('Login')}>
          <SettingItem 
            icon={<Feather name="log-out" size={20} color="#D32F2F" />}
            title="Logout"
            isDestructive
            isLast
          />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>AgroHealth © 2025</Text>
          <Text style={styles.footerText}>Powered by AI Technology</Text>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar (Static Mockup) */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="#9E9E9E" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Results')}>
          <MaterialCommunityIcons name="bookmark-check-outline" size={24} color="#9E9E9E" />
          <Text style={styles.tabLabel}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="settings" size={24} color="#2E7D32" />
          <Text style={[styles.tabLabel, { color: '#2E7D32' }]}>Settings</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 120,
    backgroundColor: '#F1F8E9',
    flexGrow: 1,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9E9E9E',
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 5,
  },
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  destructiveIconBox: {
    backgroundColor: '#FFEBEE',
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 2,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9E9E9E',
    lineHeight: 18,
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

export default SettingsScreen;
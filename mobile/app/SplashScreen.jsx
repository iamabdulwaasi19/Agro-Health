import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#1C8C36', '#2D6A4F', '#1B5E20']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <View style={styles.logoContainer}>
        <View style={styles.whiteCircle}>
          <MaterialCommunityIcons name="leaf" size={80} color="#1C8C36" />
        </View>
        
        <Text style={styles.title}>AgroHealth</Text>
        <Text style={styles.subtitle}>Diagnose crop diseases instantly</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.versionText}>v1.0.0</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logoContainer: { 
    alignItems: 'center' 
  },
  whiteCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  title: { 
    fontSize: 36, 
    fontWeight: 'bold', 
    color: 'white', 
    letterSpacing: 1.5 
  },
  subtitle: { 
    fontSize: 16, 
    color: 'white', 
    marginTop: 10, 
    opacity: 0.9,
    fontWeight: '500'
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  versionText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  }
});

export default SplashScreen;
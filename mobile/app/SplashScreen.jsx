import React, { useEffect } from 'react';
import Logo from '../assets/img/logo.png'
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Replaces Splash with Onboarding in the stack
      navigation.replace('Onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#1A2F3F', '#4CAF50', '#8BC34A']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" transparent backgroundColor="transparent" />
      <View style={styles.logoContainer}>
        <View style={styles.whiteCircle}>
          <Image 
            source={Logo} style={styles.img}  
            style={styles.logo} 
          />
        </View>
        <Text style={styles.title}>AgroHealth</Text>
        <Text style={styles.subtitle}>Diagnose crop diseases instantly</Text>
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
  },
   img: {
    width: 1,
    height: 10
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: 'white', 
    letterSpacing: 1 
},
  subtitle: { 
    fontSize: 16, 
    color: 'white', 
    marginTop: 10, 
    opacity: 0.9 
}
});
export default SplashScreen;
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const OnboardingData = [
  {
    id: 1,
    title: "Welcome to AgroHealth",
    description: "Your AI-powered companion for crop health management. Help farmers identify and treat crop diseases quickly and effectively.",
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800', 
    icon: 'https://cdn-icons-png.flaticon.com/512/628/628283.png',
  },
  {
    id: 2,
    title: "Scan or Upload",
    description: "Simply capture a photo of the affected leaf or upload from your gallery. Our AI will analyze it instantly.",
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800',
    icon: 'https://cdn-icons-png.flaticon.com/512/685/685655.png',
  },
  {
    id: 3,
    // Updated text as requested
    title: "Empowering farmers with AI",
    description: "Join thousands of farmers using AgroHealth to protect their crops and increase yields with AI-powered disease detection.",
    // New reliable image URL
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=800',
    icon: 'https://cdn-icons-png.flaticon.com/512/93/93158.png',
  }
];

const OnboardingFlow = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < OnboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('Login'); 
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const currentStep = OnboardingData[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {currentIndex < OnboardingData.length - 1 && (
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.imageWrapper}>
          <Image 
            source={{ uri: currentStep.image }} 
            style={styles.heroImage} 
            resizeMode="cover" // Ensures the image fills the area correctly
          />
        </View>

        <View style={styles.iconCircle}>
          <Image 
            source={{ uri: currentStep.icon }} 
            style={styles.stepIcon} 
            resizeMode="contain"
          />
        </View>

        <View style={styles.textSection}>
          <Text style={styles.title}>{currentStep.title}</Text>
          <Text style={styles.description}>{currentStep.description}</Text>
        </View>

        <View style={styles.pagination}>
          {OnboardingData.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.dot, 
                currentIndex === index ? styles.activeDot : styles.inactiveDot
              ]} 
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === OnboardingData.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EBF5EE' },
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '600',
  },
  content: { 
    flex: 1, 
    alignItems: 'center', 
    paddingHorizontal: 30, 
    paddingBottom: 40 
  },
  imageWrapper: {
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#fff', // Fallback color while loading
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  heroImage: { width: '100%', height: '100%' },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -45,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  stepIcon: { 
    width: 45, 
    height: 45, 
    tintColor: '#2E7D32' 
  },
  textSection: { 
    alignItems: 'center', 
    marginTop: 30,
    flex: 1 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#1A2F3F', 
    marginBottom: 15, 
    textAlign: 'center' 
  },
  description: { 
    fontSize: 16, 
    color: '#555', 
    textAlign: 'center', 
    lineHeight: 24 
  },
  pagination: { 
    flexDirection: 'row', 
    marginBottom: 25 
  },
  dot: { 
    height: 8, 
    borderRadius: 4, 
    marginHorizontal: 4 
  },
  activeDot: { 
    width: 30, 
    backgroundColor: '#2E7D32' 
  },
  inactiveDot: { 
    width: 8, 
    backgroundColor: '#CCC' 
  },
  button: {
    width: '100%',
    backgroundColor: '#1C8C36',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default OnboardingFlow;
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

// const { width } = Dimensions.get('window');

// const OnboardingFlow = ({ onComplete }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     if (currentIndex < OnboardingData.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       onComplete(); // Navigate to main app
//     }
//   };

//   const currentStep = OnboardingData[currentIndex];

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         {/* Top Image Card */}
//         <View style={styles.imageWrapper}>
//           <Image source={{ uri: currentStep.image }} style={styles.heroImage} />
//         </View>

//         {/* Center Icon */}
//         <View style={styles.iconCircle}>
//           <Image source={{ uri: currentStep.icon }} style={styles.stepIcon} />
//         </View>

//         {/* Text Section */}
//         <View style={styles.textSection}>
//           <Text style={styles.title}>{currentStep.title}</Text>
//           <Text style={styles.description}>{currentStep.description}</Text>
//         </View>

//         {/* Pagination Dots */}
//         <View style={styles.pagination}>
//           {OnboardingData.map((_, index) => (
//             <View 
//               key={index} 
//               style={[styles.dot, currentIndex === index ? styles.activeDot : styles.inactiveDot]} 
//             />
//           ))}
//         </View>

//         {/* Action Button */}
//         <TouchableOpacity style={styles.button} onPress={handleNext}>
//           <Text style={styles.buttonText}>
//             {currentIndex === OnboardingData.length - 1 ? "Get Started" : "Next"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#EBF5EE' },
//   content: { flex: 1, alignItems: 'center', paddingHorizontal: 30, justifyContent: 'space-between', paddingVertical: 40 },
//   imageWrapper: {
//     width: width * 0.7,
//     height: width * 0.7,
//     borderRadius: 30,
//     overflow: 'hidden',
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//   },
//   heroImage: { width: '100%', height: '100%' },
//   iconCircle: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: -50, // Floating effect
//     elevation: 5,
//   },
//   stepIcon: { width: 50, height: 50, tintColor: '#2E7D32' },
//   textSection: { alignItems: 'center', marginVertical: 20 },
//   title: { fontSize: 24, fontWeight: 'bold', color: '#1A2F3F', marginBottom: 15, textAlign: 'center' },
//   description: { fontSize: 16, color: '#555', textAlign: 'center', lineHeight: 22 },
//   pagination: { flexDirection: 'row', marginBottom: 20 },
//   dot: { height: 8, borderRadius: 4, marginHorizontal: 4 },
//   activeDot: { width: 30, backgroundColor: '#2E7D32' },
//   inactiveDot: { width: 8, backgroundColor: '#CCC' },
//   button: {
//     width: '100%',
//     backgroundColor: '#2E7D32',
//     paddingVertical: 18,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
// });

// export default OnboardingFlow;


import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// ... (Your OnboardingData array stays the same)
const OnboardingData = [
  {
    id: 1,
    title: "Welcome to AgroHealth",
    description: "Your AI-powered companion for crop health management. Help farmers identify and treat crop diseases quickly and effectively.",
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=500', 
    icon: 'https://cdn-icons-png.flaticon.com/512/628/628283.png',
  },
  {
    id: 2,
    title: "Scan or Upload",
    description: "Simply capture a photo of the affected leaf or upload from your gallery. Our AI will analyze it instantly.",
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=500',
    icon: 'https://cdn-icons-png.flaticon.com/512/685/685655.png',
  },
  {
    id: 3,
    title: "Works Offline Too",
    description: "No internet? No problem! Access your saved results and basic diagnosis features even when offline.",
    image: 'https://images.unsplash.com/photo-1585059895312-7001996538c3?q=80&w=500',
    icon: 'https://cdn-icons-png.flaticon.com/512/93/93158.png',
  }
];

const OnboardingFlow = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < OnboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Final "Get Started" button action
      navigation.replace('Login'); 
    }
  };

  const handleSkip = () => {
    // Jump straight to Login from page 1 or 2
    navigation.replace('Login');
  };

  const currentStep = OnboardingData[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section for Skip Button */}
      <View style={styles.header}>
        {/* Only show Skip on the first two pages */}
        {currentIndex < OnboardingData.length - 1 && (
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: currentStep.image }} style={styles.heroImage} />
        </View>

        <View style={styles.iconCircle}>
          <Image source={{ uri: currentStep.icon }} style={styles.stepIcon} />
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
    justifyContent: 'flex-end', // Aligns Skip button to the right
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
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  heroImage: { width: '100%', height: '100%' },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
    elevation: 5,
  },
  stepIcon: { 
    width: 50, 
    height: 50, 
    tintColor: '#2E7D32' 
  },
  textSection: { 
    alignItems: 'center', 
    marginVertical: 20, 
    flex: 1 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1A2F3F', 
    marginBottom: 15, 
    textAlign: 'center' 
  },
  description: { 
    fontSize: 16, 
    color: '#555', 
    textAlign: 'center', 
    lineHeight: 22 
  },
  pagination: { 
    flexDirection: 'row', 
    marginBottom: 20 
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
    backgroundColor: '#2E7D32',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default OnboardingFlow;
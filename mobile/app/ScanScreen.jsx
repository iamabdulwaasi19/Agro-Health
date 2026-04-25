// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   TouchableOpacity, 
//   SafeAreaView, 
//   StyleSheet, 
//   StatusBar, 
//   Alert, 
//   Image 
// } from 'react-native';
// import { Ionicons, Feather } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';

// const ScanLeafScreen = ({ navigation }) => {
//   const [image, setImage] = useState(null);

//   // --- FEATURE 1: NATIVE SYSTEM CAMERA ---
//   const handleLaunchCamera = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
//     if (status !== 'granted') {
//       Alert.alert("Permission Denied", "AgroHealth needs camera access to scan leaves.");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.8,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   // --- FEATURE 2: NATIVE GALLERY ---
//   const handlePickImage = async () => {
//     // This triggers the native picker which handles "All" or "Selected" automatically on iOS 14+
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
//     if (status !== 'granted') {
//       Alert.alert("Permission Denied", "Gallery access is required to upload photos.");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.8,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   // --- UI STATE: PREVIEW MODE ---
//   if (image) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Review Image</Text>
//         </View>

//         <View style={styles.previewContainer}>
//           <Image source={{ uri: image }} style={styles.previewImage} />
//         </View>

//         <View style={styles.footer}>
//           <TouchableOpacity 
//             style={styles.captureButton} 
//             onPress={() => navigation.navigate('Details', { imageUri: image })}
//           >
//             <Feather name="check-circle" size={20} color="#1B5E20" style={styles.buttonIcon} />
//             <Text style={styles.captureText}>Continue to Diagnose</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.galleryButton} onPress={() => setImage(null)}>
//             <Feather name="refresh-cw" size={20} color="white" style={styles.buttonIcon} />
//             <Text style={styles.galleryText}>Take Another Picture</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // --- UI STATE: SELECTION MODE ---
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" />
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Scan Leaf</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <View style={styles.mainContent}>
//         <View style={styles.iconCircleBig}>
//            <Feather name="camera" size={80} color="#AEEA00" />
//         </View>
//         <Text style={styles.instructionLarge}>Add a photo of the affected leaf</Text>
//         <Text style={styles.instructionSmall}>Ensure the leaf is well-lit and centered</Text>
//       </View>

//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.captureButton} onPress={handleLaunchCamera}>
//           <Feather name="camera" size={20} color="#1B5E20" style={styles.buttonIcon} />
//           <Text style={styles.captureText}>Use Camera</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.galleryButton} onPress={handlePickImage}>
//           <Feather name="image" size={20} color="white" style={styles.buttonIcon} />
//           <Text style={styles.galleryText}>Upload from Gallery</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  StyleSheet, 
  StatusBar, 
  Alert, 
  Image,
  ActivityIndicator // Added for the loading spinner
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // Ensure axios is imported

const ScanLeafScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false); // New state for AI loading

  // --- FEATURE 1: NATIVE SYSTEM CAMERA ---
  const handleLaunchCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "AgroHealth needs camera access to scan leaves.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // --- FEATURE 2: NATIVE GALLERY ---
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Gallery access is required to upload photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // --- NEW FEATURE 3: SEND TO AI BACKEND ---
  const handleDiagnose = async () => {
    if (!image) return;

    setIsAnalyzing(true); // Start loading spinner

    // 1. Prepare Image Data
    const formData = new FormData();
    formData.append('image', {
      uri: image,
      name: 'leaf_scan.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post('https://agro-health.onrender.com/api/scan/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigation.navigate('Details', { 
        diagnosisData: response.data, 
        imageUri: image 
      });

    } catch (error) {
      // console.error("AI Error:", error);
      console.error("AI Error Details:", error.response?.data || error.message);
      Alert.alert("Analysis Failed", "The AI couldn't process this leaf. Please try a clearer photo.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --- UI STATE: PREVIEW MODE ---
  if (image) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Review Image</Text>
        </View>

        <View style={styles.previewContainer}>
          <Image source={{ uri: image }} style={styles.previewImage} />
        </View>

        <View style={styles.footer}>
          {/* Main Diagnose Button */}
          <TouchableOpacity 
            style={[styles.captureButton, isAnalyzing && { opacity: 0.7 }]} 
            onPress={handleDiagnose}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <ActivityIndicator color="#1B5E20" />
            ) : (
              <>
                <Feather name="check-circle" size={20} color="#1B5E20" style={styles.buttonIcon} />
                <Text style={styles.captureText}>Continue to Diagnose</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Retake Button */}
          <TouchableOpacity 
            style={styles.galleryButton} 
            onPress={() => setImage(null)}
            disabled={isAnalyzing}
          >
            <Feather name="refresh-cw" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.galleryText}>Take Another Picture</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // --- UI STATE: SELECTION MODE ---
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Leaf</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.mainContent}>
        <View style={styles.iconCircleBig}>
           <Feather name="camera" size={80} color="#AEEA00" />
        </View>
        <Text style={styles.instructionLarge}>Add a photo of the affected leaf</Text>
        <Text style={styles.instructionSmall}>Ensure the leaf is well-lit and centered</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.captureButton} onPress={handleLaunchCamera}>
          <Feather name="camera" size={20} color="#1B5E20" style={styles.buttonIcon} />
          <Text style={styles.captureText}>Use Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.galleryButton} onPress={handlePickImage}>
          <Feather name="image" size={20} color="white" style={styles.buttonIcon} />
          <Text style={styles.galleryText}>Upload from Gallery</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121B28' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 20 
  },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: '600' },
  mainContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  iconCircleBig: { marginBottom: 30 },
  instructionLarge: { color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  instructionSmall: { color: '#88929E', fontSize: 14, marginTop: 10, textAlign: 'center' },
  previewContainer: { flex: 1, padding: 25, justifyContent: 'center' },
  previewImage: { width: '100%', aspectRatio: 1, borderRadius: 20 },
  footer: { padding: 25, gap: 15 },
  captureButton: { 
    backgroundColor: '#AEEA00', 
    height: 60, 
    borderRadius: 15, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  captureText: { color: '#1B5E20', fontSize: 16, fontWeight: 'bold' },
  galleryButton: { 
    backgroundColor: '#262F3C', 
    height: 60, 
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: '#3D4756', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  galleryText: { color: 'white', fontSize: 16, fontWeight: '500' },
  buttonIcon: { marginRight: 10 }
});

export default ScanLeafScreen;
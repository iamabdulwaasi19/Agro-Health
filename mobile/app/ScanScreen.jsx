import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Alert, Image, ActivityIndicator } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure this is imported

const ScanLeafScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  // --- FEATURE 2: NATIVE GALLERY (Fixed Prompt) ---
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
      selectionLimit: 1, // Fix: Prevents the "keep selection" / "select more" prompt on iOS/Android
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // --- FEATURE 3: SEND TO AI BACKEND (Fixed Token Issue) ---
  const handleDiagnose = async () => {
    if (!image) return;

    setIsAnalyzing(true);

    try {
      // 1. Get the token from AsyncStorage (Parity with Web localStorage)
      const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        Alert.alert("Session Expired", "Please log in again.");
        navigation.navigate('Login');
        return;
      }

      // 2. Prepare Image Data
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        name: 'leaf_scan.jpg',
        type: 'image/jpeg',
      });

      // 3. Send Request with Authorization Header
      const response = await axios.post('https://agro-health.onrender.com/api/scan/diagnose', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Fixed: Included the token
        },
      });

      // 4. Navigate with proper data structure
      navigation.navigate('Result', { 
        diagnosisData: response.data, 
        imageUri: image,
        selectedFile: { uri: image, name: 'leaf_scan.jpg', type: 'image/jpeg' } 
      });

    } catch (error) {
      console.error("AI Error Details:", error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        Alert.alert("Unauthorized", "Your session has expired. Please login again.");
        navigation.navigate('Login');
      } else {
        Alert.alert("Analysis Failed", "The AI couldn't process this leaf. Please try a clearer photo.");
      }
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
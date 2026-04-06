// import React from 'react';
// import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, ImageBackground, StatusBar, } from 'react-native';
// import { Ionicons, Feather } from '@expo/vector-icons';

// const ScanLeafScreen = ({ navigation }) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Scan Leaf</Text>
//         <View style={{ width: 24 }} /> {/* Spacer for centering */}
//       </View>

//       <View style={styles.cameraContainer}>
//         {/* Camera Viewport Mockup */}
//         <ImageBackground 
//           source={{ uri: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=500' }} 
//           style={styles.viewport}
//           imageStyle={{ borderRadius: 30 }}
//         >
//           {/* Instruction Badge */}
//           <View style={styles.instructionBadge}>
//             <Text style={styles.instructionText}>Position leaf within frame</Text>
//           </View>

//           {/* Scanning Frame Overlay */}
//           <View style={styles.overlayFrame}>
//             <View style={[styles.corner, styles.topLeft]} />
//             <View style={[styles.corner, styles.topRight]} />
//             <View style={[styles.corner, styles.bottomLeft]} />
//             <View style={[styles.corner, styles.bottomRight]} />
//           </View>
//         </ImageBackground>
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.captureButton} onPress={() => navigation.navigate('Details')}>
//           <Feather name="camera" size={20} color="#1B5E20" style={styles.buttonIcon} />
//           <Text style={styles.captureText}>Capture</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.galleryButton} onPress={() => navigation.navigate('Report')}>
//           <Feather name="upload" size={20} color="white" style={styles.buttonIcon} />
//           <Text style={styles.galleryText}>Upload from Gallery</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121B28', // Dark navy background
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   cameraContainer: {
//     flex: 1,
//     paddingHorizontal: 25,
//     justifyContent: 'center',
//   },
//   viewport: {
//     width: '100%',
//     aspectRatio: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   instructionBadge: {
//     position: 'absolute',
//     top: 16,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   instructionText: {
//     color: 'white',
//     fontSize: 13,
//   },
//   overlayFrame: {
//     width: '80%',
//     height: '80%',
//     borderWidth: 2,
//     borderColor: 'rgba(174, 234, 0, 0.5)', // Transparent lime
//     position: 'relative',
//   },
//   corner: {
//     position: 'absolute',
//     width: 25,
//     height: 25,
//     borderColor: 'white',
//   },
//   topLeft: { top: -2, left: -2, borderTopWidth: 4, borderLeftWidth: 4 },
//   topRight: { top: -2, right: -2, borderTopWidth: 4, borderRightWidth: 4 },
//   bottomLeft: { bottom: -2, left: -2, borderBottomWidth: 4, borderLeftWidth: 4 },
//   bottomRight: { bottom: -2, right: -2, borderBottomWidth: 4, borderRightWidth: 4 },
//   footer: {
//     paddingHorizontal: 25,
//     paddingBottom: 40,
//     gap: 15,
//   },
//   captureButton: {
//     backgroundColor: '#AEEA00', // Lime green
//     height: 60,
//     borderRadius: 15,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   captureText: {
//     color: '#1B5E20',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   galleryButton: {
//     backgroundColor: '#262F3C',
//     height: 60,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: '#3D4756',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   galleryText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   buttonIcon: {
//     marginRight: 10,
//   }
// });

// export default ScanLeafScreen;




import React, { useState, useRef } from 'react'; // Added useState and useRef
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, Alert } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera'; // Use expo-camera
import * as ImagePicker from 'expo-image-picker'; // Use expo-image-picker

const ScanLeafScreen = ({ navigation }) => {
  // --- NEW STATE & PERMISSIONS ---
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);

  // Function to handle taking a photo
  const handleCapture = async () => {
    if (!permission) {
      const status = await requestPermission();
      if (!status.granted) return;
    }

    if (cameraRef.current) {
      try {
        setIsScanning(true);
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
        console.log('Photo captured:', photo.uri);
        // Navigate to details with the image
        navigation.navigate('Details', { imageUri: photo.uri });
      } catch (error) {
        Alert.alert("Error", "Failed to take picture");
      } finally {
        setIsScanning(false);
      }
    }
  };

  // Function to handle gallery upload
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "We need access to your gallery to upload photos.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      navigation.navigate('Details', { imageUri: result.assets[0].uri });
    }
  };

  // If permission is still loading or denied
  if (!permission) return <View style={styles.container} />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Leaf</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.cameraContainer}>
        {/* REAL Camera Viewport */}
        {permission.granted ? (
          <CameraView 
            ref={cameraRef}
            style={styles.viewport} 
            facing="back"
          >
            {/* Instruction Badge */}
            <View style={styles.instructionBadge}>
              <Text style={styles.instructionText}>
                {isScanning ? "Analyzing..." : "Position leaf within frame"}
              </Text>
            </View>

            {/* Scanning Frame Overlay */}
            <View style={styles.overlayFrame}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </CameraView>
        ) : (
          <View style={[styles.viewport, { backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }]}>
             <TouchableOpacity onPress={requestPermission} style={styles.galleryButton}>
                <Text style={{color: 'white'}}>Grant Camera Permission</Text>
             </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.captureButton, isScanning && { opacity: 0.7 }]} 
          onPress={handleCapture}
          disabled={isScanning}
        >
          <Feather name="camera" size={20} color="#1B5E20" style={styles.buttonIcon} />
          <Text style={styles.captureText}>{isScanning ? 'Processing...' : 'Capture'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.galleryButton} onPress={handlePickImage}>
          <Feather name="upload" size={20} color="white" style={styles.buttonIcon} />
          <Text style={styles.galleryText}>Upload from Gallery</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121B28', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  viewport: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 30, // Applied directly here since we removed ImageBackground
  },
  instructionBadge: {
    position: 'absolute',
    top: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  instructionText: {
    color: 'white',
    fontSize: 13,
  },
  overlayFrame: {
    width: '80%',
    height: '80%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 25,
    height: 25,
  },
  topLeft: { top: -2, left: -2, borderTopWidth: 4, borderLeftWidth: 4, borderColor: '#AEEA00' },
  topRight: { top: -2, right: -2, borderTopWidth: 4, borderRightWidth: 4, borderColor: '#AEEA00' },
  bottomLeft: { bottom: -2, left: -2, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: '#AEEA00' },
  bottomRight: { bottom: -2, right: -2, borderBottomWidth: 4, borderRightWidth: 4, borderColor: '#AEEA00' },
  footer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
    gap: 15,
  },
  captureButton: {
    backgroundColor: '#AEEA00', 
    height: 60,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureText: {
    color: '#1B5E20',
    fontSize: 18,
    fontWeight: 'bold',
  },
  galleryButton: {
    backgroundColor: '#262F3C',
    height: 60,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#3D4756',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonIcon: {
    marginRight: 10,
  }
});

export default ScanLeafScreen;
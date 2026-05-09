import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const DiagnosisResult = ({ route, navigation }) => {
  const { diagnosisData, imageUri, selectedFile } = route.params || {};
  const [isSaving, setIsSaving] = useState(false);

  if (!diagnosisData) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No diagnosis data available.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={{color: '#1C8C36'}}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const displayConfidence = Math.round(
    (diagnosisData.confidence <= 1 ? diagnosisData.confidence * 100 : diagnosisData.confidence) || 0
  );

  const handleSaveResult = async () => {
    setIsSaving(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      const formData = new FormData();
      // Handle image file for mobile upload
      if (selectedFile) {
        formData.append('image', {
          uri: selectedFile.uri,
          name: selectedFile.fileName || 'upload.jpg',
          type: selectedFile.type || 'image/jpeg',
        });
      }
      
      formData.append('label', diagnosisData.disease_name);
      formData.append('confidence', diagnosisData.confidence);
      formData.append('treatment', JSON.stringify(diagnosisData.treatment));

      const response = await axios.post('https://agro-health.onrender.com/api/scan/save', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", "Result saved permanently to cloud!");
        navigation.navigate('Home'); // Redirect to dashboard
      }
    } catch (err) {
      console.error("Save error:", err);
      Alert.alert("Error", "Failed to save result. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diagnosis Results</Text>
        <TouchableOpacity>
          <Ionicons name="share-social-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image 
          source={{ uri: imageUri || "https://images.unsplash.com/photo-1758903178566-81b9026340ae" }} 
          style={styles.heroImage} 
        />

        <View style={styles.contentContainer}>
          <View style={styles.diagnosisCard}>
            <View style={styles.titleRow}>
              <View style={{flex: 1}}>
                <Text style={styles.mainTitle}>{diagnosisData.disease_name}</Text>
                <Text style={styles.scientificName}>{diagnosisData.scientific_name}</Text>
              </View>
              <View style={[
                styles.badge, 
                { backgroundColor: diagnosisData.severity === 'Severe' ? '#EF4444' : '#1C8C36' }
              ]}>
                <Text style={styles.badgeText}>{diagnosisData.severity}</Text>
              </View>
            </View>
            
            <View style={styles.confidenceRow}>
              <Text style={styles.confidenceLabel}>Confidence Score</Text>
              <Text style={styles.confidenceValue}>{displayConfidence}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${displayConfidence}%` }]} />
            </View>

            <View style={styles.descriptionBox}>
              <Text style={styles.sectionSubTitle}>Description</Text>
              <Text style={styles.descriptionText}>{diagnosisData.description}</Text>
            </View>
          </View>

          {/* New Symptoms Section (Reference from Web) */}
          <Text style={styles.sectionTitle}>Common Symptoms</Text>
          <View style={styles.whiteCard}>
            {diagnosisData.symptoms?.map((symptom, index) => (
              <View key={index} style={styles.bulletPointRow}>
                <Ionicons name="alert-circle" size={18} color="#A3E635" />
                <Text style={styles.bulletText}>{symptom}</Text>
              </View>
            ))}
          </View>

          {/* Treatment Recommendations */}
          <Text style={styles.sectionTitle}>Immediate Actions</Text>
          {diagnosisData.treatment?.immediate_actions?.map((action, index) => (
            <View key={index} style={styles.stepCard}>
              <View style={styles.stepHeader}>
                <Ionicons name="checkmark-circle" size={22} color="#1C8C36" />
                <Text style={styles.bulletText}>{action}</Text>
              </View>
            </View>
          ))}

          {/* Prevention Tips */}
          <Text style={styles.sectionTitle}>Prevention Tips</Text>
          <View style={styles.whiteCard}>
            {diagnosisData.treatment?.prevention_tips?.map((tip, index) => (
              <View key={index} style={styles.bulletPointRow}>
                <Ionicons name="shield-checkmark" size={18} color="#A3E635" />
                <Text style={styles.bulletText}>{tip}</Text>
              </View>
            ))}
          </View>

          {/* Save Button with Loading State */}
          <TouchableOpacity 
            style={[styles.saveButton, isSaving && { opacity: 0.7 }]} 
            onPress={handleSaveResult}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="bookmark" size={20} color="#fff" />
                <Text style={styles.saveButtonText}>Save Result Permanently</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAF9' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 16, 
    alignItems: 'center', 
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1C8C36' },
  heroImage: { width: '100%', height: 280 },
  contentContainer: { padding: 16 },
  diagnosisCard: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 20, 
    marginTop: -40, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 10 
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  mainTitle: { fontSize: 24, fontWeight: 'bold', color: '#1C8C36' },
  scientificName: { fontStyle: 'italic', color: '#6B7280', marginTop: 2, fontSize: 14 },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  confidenceRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 5 },
  confidenceLabel: { color: '#4B5563', fontWeight: '500' },
  confidenceValue: { color: '#1C8C36', fontWeight: 'bold' },
  progressBarBg: { height: 10, backgroundColor: '#E5E7EB', borderRadius: 5 },
  progressBarFill: { height: 10, backgroundColor: '#1C8C36', borderRadius: 5 },
  sectionSubTitle: { color: '#1C8C36', fontWeight: 'bold', marginBottom: 5, fontSize: 16 },
  descriptionBox: { marginTop: 20, borderTopWidth: 1, borderTopColor: '#F3F4F6', pt: 15 },
  descriptionText: { color: '#4B5563', lineHeight: 22, fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1C8C36', marginTop: 25, marginBottom: 15 },
  stepCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  stepHeader: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  whiteCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  bulletPointRow: { flexDirection: 'row', gap: 10, marginBottom: 12, alignItems: 'flex-start' },
  bulletText: { fontSize: 14, color: '#4B5563', flex: 1, lineHeight: 20 },
  saveButton: { 
    backgroundColor: '#1C8C36', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 18, 
    borderRadius: 14, 
    marginTop: 25, 
    marginBottom: 50, 
    gap: 10,
    elevation: 2
  },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  emptyText: { color: '#6B7280', fontSize: 16 },
  backBtn: { marginTop: 15 }
});

export default DiagnosisResult;
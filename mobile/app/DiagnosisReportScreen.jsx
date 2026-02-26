import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DiagnosisResultScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress= {() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diagnosis Result</Text>
        <TouchableOpacity>
          <Feather name="share-2" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero Image - Tomato Leaf Detail */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1592450865800-478368545759?auto=format&fit=crop&q=80' }}
          style={styles.heroImage}
        />

        {/* Floating Diagnosis Card */}
        <View style={styles.mainCard}>
          <View style={styles.titleRow}>
            <Text style={styles.diseaseName}>Tomato Leaf Blight</Text>
            <View style={styles.confidenceBadge}>
              <Text style={styles.confidenceText}>92% Confident</Text>
            </View>
          </View>

          <Text style={styles.dateText}>Detected on November 10, 2025</Text>

          {/* Yellow Warning Box */}
          <View style={styles.alertBox}>
            <Ionicons name="alert-circle-outline" size={22} color="#D97706" />
            <Text style={styles.alertText}>
              <Text style={styles.alertHighlight}>Early Blight</Text> is a common fungal disease that affects tomato leaves. Act quickly to prevent spread.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recommended Treatment</Text>

        {/* Treatment Steps */}
        <TreatmentItem
          icon="leaf"
          title="Apply Fungicide"
          desc="Use copper-based fungicide. Spray every 7-10 days for 3 weeks."
        />
        <TreatmentItem
          icon="water-outline"
          title="Improve Drainage"
          desc="Ensure proper spacing between plants and avoid overhead watering."
        />
        <TreatmentItem
          icon="alert-octagon-outline"
          title="Remove Infected Leaves"
          desc="Prune and destroy affected leaves to prevent disease spread."
        />

        {/* Prevention Section */}
        <Text style={styles.sectionTitle}>Prevention Tips</Text>
        <View style={styles.tipsContainer}>
          <TipItem text="Rotate crops yearly to prevent soil-borne pathogens" />
          <TipItem text="Mulch around plants to reduce soil splash" />
          <TipItem text="Water at the base of plants early in the day" />
          <TipItem text="Use disease-resistant tomato varieties" />
        </View>
      </ScrollView>

      {/* Fixed Save Button at the Bottom */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.7} onPress= {() => navigation.navigate('Home')}>
          <Ionicons name="save-outline" size={20} color="#FFF" />
          <Text style={styles.saveButtonText}>Save Result</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Reusable component for treatment cards
const TreatmentItem = ({ icon, title, desc }) => (
  <View style={styles.treatmentCard}>
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons name={icon} size={24} color="#2F855A" />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.treatmentTitle}>{title}</Text>
      <Text style={styles.treatmentDesc}>{desc}</Text>
    </View>
  </View>
);

// Reusable component for prevention list items
const TipItem = ({ text }) => (
  <View style={styles.tipRow}>
    <Text style={styles.tipBullet}>•</Text>
    <Text style={styles.tipText}>{text}</Text>
  </View>
);

// --- Formatted Stylesheet ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#E8F3EB', // Matching the mint background from screenshots
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  heroImage: {
    width: '100%',
    height: 250,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: -40, // Important: Creates the overlap on the image
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  diseaseName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A365D',
  },
  confidenceBadge: {
    backgroundColor: '#2F855A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  confidenceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 16,
  },
  alertBox: {
    flexDirection: 'row',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  alertText: {
    flex: 1,
    color: '#92400E',
    fontSize: 13,
    lineHeight: 18,
    marginLeft: 10,
  },
  alertHighlight: {
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3748',
    marginTop: 25,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  treatmentCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#C6F6D5',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#F0FFF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  treatmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#276749',
    marginBottom: 4,
  },
  treatmentDesc: {
    fontSize: 13,
    color: '#4A5568',
    lineHeight: 18,
  },
  tipsContainer: {
    paddingHorizontal: 25,
    paddingBottom: 120, // Enough room to scroll past the footer
  },
  tipRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  tipBullet: {
    color: '#38A169',
    fontSize: 20,
    marginRight: 10,
    marginTop: -3,
  },
  tipText: {
    fontSize: 14,
    color: '#4A5568',
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 35 : 20, // Handle notch for iPhone
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
  },
  saveButton: {
    backgroundColor: '#228B22',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default DiagnosisResultScreen;
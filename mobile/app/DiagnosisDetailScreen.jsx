import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const DiagnosisDetails = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diagnosis Details</Text>
        <TouchableOpacity><Ionicons name="trash-outline" size={24} color="red" /></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <Image 
          source={{ uri: 'https://example.com/tomato-blight.jpg' }} 
          style={styles.heroImage} 
        />

        <View style={styles.contentContainer}>
          {/* Diagnosis Card */}
          <View style={styles.diagnosisCard}>
            <View style={styles.titleRow}>
              <Text style={styles.mainTitle}>Tomato Leaf Blight</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>92% Confident</Text></View>
            </View>
            <View style={styles.dateRow}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.dateText}>November 10, 2025</Text>
            </View>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>
                Early Blight (Alternaria solani) is a fungal disease affecting tomato plants...
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Complete Treatment Guide</Text>

          {/* Treatment Steps */}
          <TreatmentStep 
            icon="leaf-outline" 
            step="Step 1: Apply Fungicide"
            desc="Use a copper-based or chlorothalonil fungicide. Apply thoroughly to all surfaces."
            meta="Schedule: Every 7-10 days for 3 weeks"
          />

          <TreatmentStep 
            icon="alert-circle-outline" 
            step="Step 2: Remove Infected Parts"
            desc="Carefully prune affected leaves using sterilized scissors. Remove all material."
            important="Important: Do not compost infected material - dispose in sealed bags."
          />

          {/* Long Term Prevention Section */}
          <View style={styles.preventionContainer}>
             <Text style={styles.sectionTitle}>Long-term Prevention</Text>
             <PreventionItem number="1" title="Crop Rotation" desc="Don't plant tomatoes in the same location for at least 3 years." />
             <PreventionItem number="2" title="Resistant Varieties" desc="Choose tomato varieties bred for disease resistance." />
             <PreventionItem number="3" title="Garden Hygiene" desc="Clean up plant debris at end of season to remove spores." />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Sub-components for cleaner code
const TreatmentStep = ({ icon, step, desc, meta, important }) => (
  <View style={styles.stepCard}>
    <View style={styles.stepHeader}>
      <View style={styles.iconCircle}><Ionicons name={icon} size={20} color="#2D6A4F" /></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.stepTitle}>{step}</Text>
        <Text style={styles.stepDesc}>{desc}</Text>
      </View>
    </View>
    {meta && <View style={styles.metaBox}><Text style={styles.metaText}>{meta}</Text></View>}
    {important && <View style={[styles.metaBox, {backgroundColor: '#FFEBEE'}]}><Text style={styles.metaText}>{important}</Text></View>}
  </View>
);

const PreventionItem = ({ number, title, desc }) => (
  <View style={styles.preventionItem}>
    <Text style={styles.preventionNumber}>{number}</Text>
    <View style={{ flex: 1 }}>
      <Text style={styles.preventionTitle}>{title}: <Text style={styles.preventionDesc}>{desc}</Text></Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F0F7F4' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 16, 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#1B4332' 
  },
  heroImage: { 
    width: '100%', 
    height: 250 
  },
  contentContainer: { 
    padding: 16 
  },
  diagnosisCard: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 20, 
    marginTop: -30, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 10 
  },
  titleRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  mainTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#1B4332' 
  },
  badge: { 
    backgroundColor: '#2D6A4F', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 8 
  },
  badgeText: { 
    color: '#fff', 
    fontSize: 12, 
    fontWeight: 'bold' 
  },
  dateRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 8, 
    gap: 5 
  },
  dateText: { 
    color: '#666', 
    fontSize: 14 
  },
  descriptionBox: { 
    backgroundColor: '#FFFBEB', 
    padding: 12, 
    borderRadius: 12, 
    marginTop: 15, 
    borderLeftWidth: 4, 
    borderLeftColor: '#F59E0B' 
  },
  descriptionText: { 
    color: '#92400E', 
    lineHeight: 20 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1B4332', 
    marginTop: 25, 
    marginBottom: 15 
  },
  stepCard: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: '#D8E9E1' 
  },
  stepHeader: { 
    flexDirection: 'row', 
    gap: 12 
  },
  iconCircle: { 
    width: 40, 
    height: 40, 
    borderRadius: 10, 
    backgroundColor: '#E8F5E9', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  stepTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#1B4332' 
  },
  stepDesc: { 
    fontSize: 14, 
    color: '#4A4A4A', 
    marginTop: 4 
  },
  metaBox: { 
    backgroundColor: '#E8F5E9', 
    padding: 10, 
    borderRadius: 8, 
    marginTop: 12 
  },
  metaText: { 
    fontSize: 13, 
    color: '#2D6A4F' 
  },
  preventionContainer: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 16, 
    marginTop: 10 
  },
  preventionItem: { 
    flexDirection: 'row', 
    backgroundColor: '#E8F5E9', 
    padding: 12, 
    borderRadius: 10, 
    marginBottom: 10, 
    alignItems: 'center' 
  },
  preventionNumber: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#2D6A4F', 
    marginRight: 15 
},
  preventionTitle: { 
    fontWeight: 'bold', 
    color: '#1B4332' 
},
  preventionDesc: { 
    fontWeight: 'normal', 
    color: '#4A4A4A' 
}
});

export default DiagnosisDetails;
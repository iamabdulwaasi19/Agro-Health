import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const DiagnosisDetails = ({ route, navigation }) => {
  // 1. Get the diagnosis data passed from History/Dashboard
  const { result } = route.params || {};

  // 2. Parse the treatment data (handling both stringified and object formats)
  const treatment = result?.treatment ? (
    typeof result.treatment === 'string' ? JSON.parse(result.treatment) : result.treatment
  ) : null;

  if (!result) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No details found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={{color: '#1C8C36', fontWeight: 'bold'}}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const confidenceDisplay = result.confidence < 1 
    ? (result.confidence * 100).toFixed(0) 
    : result.confidence;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diagnosis Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Saved Image Preview */}
        <Image 
          source={{ uri: result.imagePath || result.image }} 
          style={styles.heroImage} 
        />

        <View style={styles.contentContainer}>
          {/* Disease Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.titleRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.mainTitle}>{result.label || result.disease}</Text>
                <Text style={styles.statusBadge}>Saved Result</Text>
              </View>
              <View style={styles.actionIcons}>
                <TouchableOpacity style={styles.iconBtn}>
                  <Feather name="download" size={20} color="#1C8C36" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <Feather name="share-2" size={20} color="#1C8C36" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Quick Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <View style={styles.statIconCircle}>
                  <Ionicons name="calendar-outline" size={18} color="#1C8C36" />
                </View>
                <View>
                  <Text style={styles.statLabel}>DATE SCANNED</Text>
                  <Text style={styles.statValue}>
                    {new Date(result.createdAt || result.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              <View style={styles.statBox}>
                <View style={styles.statIconCircle}>
                  <MaterialCommunityIcons name="trending-up" size={18} color="#1C8C36" />
                </View>
                <View>
                  <Text style={styles.statLabel}>CONFIDENCE</Text>
                  <Text style={styles.statValue}>{confidenceDisplay}%</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Treatment Steps Section */}
          {treatment?.immediate_actions && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Immediate Treatment Steps</Text>
              {treatment.immediate_actions.map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <Ionicons name="checkmark-circle" size={22} color="#1C8C36" />
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Prevention Tips Section */}
          {treatment?.prevention_tips && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Prevention Tips</Text>
              <View style={styles.preventionCard}>
                {treatment.prevention_tips.map((tip, index) => (
                  <View key={index} style={styles.tipItem}>
                    <Ionicons name="alert-circle" size={20} color="#A3E635" />
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <TouchableOpacity 
            style={styles.backFooterBtn} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backFooterBtnText}>Back to Saved Results</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F9FAF9' 
  },
  centerContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 16, 
    alignItems: 'center', 
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1C8C36' 
  },
  heroImage: { 
    width: '100%',
     height: 300, 
     backgroundColor: '#E0E0E0' 
  },
  contentContainer: { 
    padding: 20 
  },
  infoCard: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 20, 
    marginTop: -50, 
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  titleRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start' 
  },
  mainTitle: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#1C8C36', 
    flex: 1 
  },
  statusBadge: { 
    color: '#6B7280', 
    fontSize: 12, 
    marginTop: 4, 
    backgroundColor: '#F3F4F6', 
    alignSelf: 'flex-start', 
    paddingHorizontal: 8, 
    paddingVertical: 2, 
    borderRadius: 4 
  },
  actionIcons: { 
    flexDirection: 'row', 
    gap: 10 
  },
  iconBtn: { 
    padding: 8, 
    backgroundColor: '#F0FDF4', 
    borderRadius: 10 
  },
  statsGrid: { 
    flexDirection: 'row', 
    marginTop: 25, 
    paddingTop: 20, 
    borderTopWidth: 1, 
    borderTopColor: '#F3F4F6',
    gap: 15
  },
  statBox: { 
    flex: 1, 
    flexDirection: 'row', 
      alignItems: 'center', 
      gap: 10 
    },
  statIconCircle: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    backgroundColor: '#F0FDF4', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  statLabel: { 
    fontSize: 10, 
    color: '#6B7280', 
    fontWeight: 'bold' 
  },
  statValue: { 
    fontSize: 14, 
    color: '#1C8C36', 
    fontWeight: '600' 
  },
  section: { 
    marginTop: 30 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1C8C36', 
    marginBottom: 15 
  },
  stepItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  stepText: { 
    fontSize: 14, 
    color: '#4B5563', 
    flex: 1, 
    lineHeight: 20 
  },
  preventionCard: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#E5E7EB' 
  },
  tipItem: { 
    flexDirection: 'row', 
    gap: 10, 
    marginBottom: 15, 
    alignItems: 'flex-start' 
  },
  tipText: { 
    fontSize: 14, 
    color: '#4B5563', 
    flex: 1, 
    lineHeight: 20 
  },
  backFooterBtn: { 
    marginTop: 30, 
    marginBottom: 50, 
    padding: 16, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#1C8C36', 
    alignItems: 'center' 
  },
  backFooterBtnText: { 
    color: '#1C8C36', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  emptyText: { 
    color: '#6B7280', 
    marginBottom: 10 
  },
  backBtn: { 
    padding: 10 
  }
});

export default DiagnosisDetails;
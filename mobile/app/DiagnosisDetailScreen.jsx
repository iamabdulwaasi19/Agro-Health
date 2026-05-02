// import React from 'react';
// import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const DiagnosisDetails = ({ route, navigation }) => {
//   const { diagnosisData, imageUri } = route.params || {};

//   if (!diagnosisData) {
//     return (
//       <View style={styles.container}><Text>No diagnosis data available.</Text></View>
//     );
//   }

//   const displayConfidence = Math.round((diagnosisData.confidence || 0) * 100);

// const RecommendedTreatmentStep = ({ icon, step, desc, meta }) => (
//   <View style={styles.stepCard}>
//     <View style={styles.stepHeader}>
//       <View style={styles.iconCircle}>
//         <Ionicons name={icon} size={20} color="#2D6A4F" />
//       </View>
//       <View style={{ flex: 1 }}>
//         <Text style={styles.stepTitle}>{step}</Text>
//         <Text style={styles.stepDesc}>{desc}</Text>
//       </View>
//     </View>
//     {meta && (
//       <View style={styles.metaBox}>
//         <Text style={styles.metaText}>📅 {meta}</Text>
//       </View>
//     )}
//   </View>
// );

// const PreventionTipsItem = ({ number, title, desc }) => (
//   <View style={styles.preventionTipsItem}>
//     <Text style={styles.preventionTipsNumber}>{number}</Text>
//     <View style={{ flex: 1 }}>
//       <Text style={styles.preventionTipsTitle}>{title}</Text>
//       <Text style={styles.preventionTipsDesc}>{desc}</Text>
//     </View>
//   </View>
// );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Diagnosis Results</Text>
//         <TouchableOpacity>
//            <Ionicons name="share-social-outline" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         <Image source={{ uri: imageUri }} style={styles.heroImage} />

//         <View style={styles.contentContainer}>
//           <View style={styles.diagnosisCard}>
//             <View style={styles.titleRow}>
//               <Text style={styles.mainTitle}>{diagnosisData.diseaseName}</Text>
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>{displayConfidence}% Confident</Text>
//               </View>
//             </View>
            
//             <View style={styles.dateRow}>
//               <Ionicons name="calendar-outline" size={16} color="#666" />
//               <Text style={styles.dateText}>{new Date().toLocaleDateString()}</Text>
//             </View>

//             <View style={styles.descriptionBox}>
//               <Ionicons name="alert-circle-outline" size={20} color="#F59E0B" />
//               <Text style={styles.descriptionText}>{diagnosisData.description}</Text>
//             </View>
//           </View>

//           <Text style={styles.sectionTitle}>Recommended Treatment</Text>
          
//           {/* UPDATED KEY: recommended_treatments */}
//           {diagnosisData.recommended_treatments?.map((item, index) => (
//             <TreatmentStep 
//               key={index}
//               icon={item.icon || "leaf-outline"} 
//               step={item.title}
//               desc={item.instruction}
//               meta={item.schedule}
//             />
//           ))}

//           <View style={styles.preventionSection}>
//               <Text style={styles.sectionTitle}>Prevention Tips</Text>
//               {/* UPDATED KEY: prevention_tips */}
//               {diagnosisData.prevention_tips?.map((tip, index) => (
//                 <View key={index} style={styles.bulletPointRow}>
//                   <Text style={styles.bulletDot}>•</Text>
//                   <Text style={styles.bulletText}>{tip}</Text>
//                 </View>
//               ))}
//           </View>

//           <TouchableOpacity style={styles.saveButton}>
//              <Ionicons name="save-outline" size={20} color="#fff" />
//              <Text style={styles.saveButtonText}>Save Result</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };


// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: '#F0F7F4' 
//   },
//   emptyText: {
//     color: '#666',
//     fontStyle: 'italic',
//     marginBottom: 10
//   },
//   header: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     padding: 16, 
//     alignItems: 'center', 
//     backgroundColor: '#fff' 
//   },
//   headerTitle: { 
//     fontSize: 18, 
//     fontWeight: '600', 
//     color: '#1B4332' 
//   },
//   heroImage: { 
//     width: '100%', 
//     height: 250 
//   },
//   contentContainer: { 
//     padding: 16 
//   },
//   diagnosisCard: { 
//     backgroundColor: '#fff', 
//     borderRadius: 16, 
//     padding: 20, 
//     marginTop: -30, 
//     elevation: 4, 
//     shadowColor: '#000', 
//     shadowOpacity: 0.1, 
//     shadowRadius: 10 
//   },
//   titleRow: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center' 
//   },
//   mainTitle: { 
//     fontSize: 22, 
//     fontWeight: 'bold', 
//     color: '#1B4332' 
//   },
//   badge: { 
//     backgroundColor: '#2D6A4F', 
//     paddingHorizontal: 8, 
//     paddingVertical: 4, 
//     borderRadius: 8 
//   },
//   badgeText: { 
//     color: '#fff', 
//     fontSize: 12, 
//     fontWeight: 'bold' 
//   },
//   dateRow: { 
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     marginTop: 8, 
//     gap: 5 
//   },
//   dateText: { 
//     color: '#666', 
//     fontSize: 14 
//   },
//   descriptionBox: { 
//     backgroundColor: '#FFFBEB', 
//     padding: 12, 
//     borderRadius: 12, 
//     marginTop: 15, 
//     borderLeftWidth: 4, 
//     borderLeftColor: '#F59E0B' 
//   },
//   descriptionText: { 
//     color: '#92400E', 
//     lineHeight: 20 
//   },
//   sectionTitle: { 
//     fontSize: 18, 
//     fontWeight: 'bold', 
//     color: '#1B4332', 
//     marginTop: 25, 
//     marginBottom: 15 
//   },
//   stepCard: { 
//     backgroundColor: '#fff', 
//     borderRadius: 12, 
//     padding: 16, 
//     marginBottom: 16, 
//     borderWidth: 1, 
//     borderColor: '#D8E9E1' 
//   },
//   stepHeader: { 
//     flexDirection: 'row', 
//     gap: 12 
//   },
//   iconCircle: { 
//     width: 40, 
//     height: 40, 
//     borderRadius: 10, 
//     backgroundColor: '#E8F5E9', 
//     justifyContent: 'center', 
//     alignItems: 'center' 
//   },
//   stepTitle: { 
//     fontSize: 16, 
//     fontWeight: 'bold', 
//     color: '#1B4332' 
//   },
//   stepDesc: { 
//     fontSize: 14, 
//     color: '#4A4A4A', 
//     marginTop: 4 
//   },
//   metaBox: { 
//     backgroundColor: '#E8F5E9', 
//     padding: 10, 
//     borderRadius: 8, 
//     marginTop: 12 
//   },
//   metaText: { 
//     fontSize: 13, 
//     color: '#2D6A4F' 
//   },
//   preventionContainer: { 
//     backgroundColor: '#fff', 
//     borderRadius: 16, 
//     padding: 16, 
//     marginTop: 10 
//   },
//   preventionItem: { 
//     flexDirection: 'row', 
//     backgroundColor: '#E8F5E9', 
//     padding: 12, 
//     borderRadius: 10, 
//     marginBottom: 10, 
//     alignItems: 'center' 
//   },
//   preventionNumber: { 
//     fontSize: 20, 
//     fontWeight: 'bold', 
//     color: '#2D6A4F', 
//     marginRight: 15 
// },
//   preventionTitle: { 
//     fontWeight: 'bold', 
//     color: '#1B4332' 
// },
//   bulletPointRow: {
//     flexDirection: 'row',
//     marginBottom: 8,
//     paddingLeft: 5,
//   },
//   bulletDot: {
//     fontSize: 18,
//     color: '#2D6A4F',
//     marginRight: 10,
//     lineHeight: 22,
//   },
//   bulletText: {
//     fontSize: 14,
//     color: '#4A4A4A',
//     flex: 1,
//     lineHeight: 20,
//   },
//   saveButton: {
//     backgroundColor: '#2D6A4F',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     borderRadius: 12,
//     marginTop: 30,
//     marginBottom: 20,
//     gap: 10,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   preventionDesc: { 
//     fontWeight: 'normal', 
//     color: '#4A4A4A' 
//   }
// });

// export default DiagnosisDetails;

import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DiagnosisDetails = ({ route, navigation }) => {
  // Extracting data to match the React web props
  const { diagnosisData, imageUri } = route.params || {};

  if (!diagnosisData) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No diagnosis data available.</Text>
      </View>
    );
  }

  // Ensure confidence is consistently handled as 0-100
  const displayConfidence = Math.round((diagnosisData.confidence || 0) * 100);

  // Internal component for Treatment (Immediate Actions)
  const TreatmentStep = ({ icon, title, desc }) => (
    <View style={styles.stepCard}>
      <div style={styles.stepHeader}>
        <View style={styles.iconCircle}>
          <Ionicons name={icon} size={20} color="#2D6A4F" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.stepTitle}>{title}</Text>
          <Text style={styles.stepDesc}>{desc}</Text>
        </View>
      </div>
    </View>
  );

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
              <Ionicons name="information-circle-outline" size={20} color="#1C8C36" />
              <Text style={styles.descriptionText}>{diagnosisData.description}</Text>
            </View>
          </View>

          {/* Treatment Recommendations (Immediate Actions) */}
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
          <View style={styles.preventionSection}>
            <Text style={styles.sectionTitle}>Prevention Tips</Text>
            <View style={styles.whiteCard}>
              {diagnosisData.treatment?.prevention_tips?.map((tip, index) => (
                <View key={index} style={styles.bulletPointRow}>
                  <Ionicons name="shield-checkmark-outline" size={18} color="#A3E635" />
                  <Text style={styles.bulletText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton}>
            <Ionicons name="bookmark" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>Save Result</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAF9' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 16, 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1C8C36' },
  heroImage: { width: '100%', height: 250 },
  contentContainer: { padding: 16 },
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
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  mainTitle: { fontSize: 22, fontWeight: 'bold', color: '#1C8C36' },
  scientificName: { fontStyle: 'italic', color: '#4B5563', marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  confidenceRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginBottom: 5 },
  confidenceLabel: { color: '#4B5563' },
  confidenceValue: { color: '#1C8C36', fontWeight: 'bold' },
  progressBarBg: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4 },
  progressBarFill: { height: 8, backgroundColor: '#1C8C36', borderRadius: 4 },
  descriptionBox: { backgroundColor: '#F0FDF4', padding: 12, borderRadius: 12, marginTop: 15, flexDirection: 'row', gap: 8 },
  descriptionText: { color: '#4B5563', lineHeight: 20, flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1C8C36', marginTop: 25, marginBottom: 15 },
  stepCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  stepHeader: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  whiteCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  bulletPointRow: { flexDirection: 'row', gap: 10, marginBottom: 12, alignItems: 'flex-start' },
  bulletText: { fontSize: 14, color: '#4B5563', flex: 1, lineHeight: 20 },
  saveButton: { 
    backgroundColor: '#1C8C36', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16, 
    borderRadius: 12, 
    marginTop: 20, 
    marginBottom: 40, 
    gap: 10 
  },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default DiagnosisDetails;
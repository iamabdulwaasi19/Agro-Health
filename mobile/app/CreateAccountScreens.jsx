import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView
} from 'react-native';

const CreateAccountScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Logo & Slogan */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
             <Text style={{ fontSize: 30 }}>🍃</Text>
          </View>
          <Text style={styles.brandName}>AgroHealth</Text>
          <Text style={styles.slogan}>Empowering farmers with AI</Text>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us and start diagnosing</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            onChangeText={(val) => setFormData({...formData, fullName: val})}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="farmer@example.com"
            keyboardType="email-address"
            onChangeText={(val) => setFormData({...formData, email: val})}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="........"
            secureTextEntry
            onChangeText={(val) => setFormData({...formData, password: val})}
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="........"
            secureTextEntry
            onChangeText={(val) => setFormData({...formData, confirmPassword: val})}
          />
        </View>

        {/* Terms Checkbox Placeholder */}
        <View style={styles.checkboxContainer}>
          <View style={styles.checkbox} />
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.linkText}>Terms & Privacy Policy</Text>
          </Text>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerLink}>
          <Text style={styles.footerText}>
            Already have an account? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FCF8', // Very light green tint
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF',
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3436',
    marginTop: 15,
  },
  slogan: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 5,
  },
  titleSection: {
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  subtitle: {
    fontSize: 15,
    color: '#636E72',
    marginTop: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 8,
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    marginRight: 10,
  },
  termsText: {
    fontSize: 13,
    color: '#636E72',
  },
  linkText: {
    color: '#2D6A4F',
    textDecorationLine: 'underline',
  },
  createButton: {
    backgroundColor: '#2D6A4F', // Solid green from logo
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#636E72',
    fontSize: 14,
  },
  loginLink: {
    color: '#2D6A4F',
    fontWeight: 'bold',
  },
});

export default CreateAccountScreen;
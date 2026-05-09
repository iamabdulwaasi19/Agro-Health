import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { Eye, EyeOff, Leaf, LogIn } from 'lucide-react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const CreateAccountScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    state: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    const { fullName, phoneNumber, state, email, password, confirmPassword } = formData;

    // Validation
    if (!fullName || !phoneNumber || !state || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!agreed) {
      Alert.alert("Agreement Required", "You must agree to the Terms & Privacy Policy");
      return;
    }

    const cleanedFullName = fullName.trim().replace(/\s+/g, ' ');
    setLoading(true);

    try {
      const response = await axios.post('https://agro-health.onrender.com/api/auth/signup', {
        fullName: cleanedFullName,
        phoneNumber,
        state,
        email,
        password,
        confirmPassword,
      });

      if (response.status === 201 || response.status === 200) {
        // Matching frontend: navigate to verify-otp with email state
        navigation.navigate('Verify', { email: email.toLowerCase() });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      Alert.alert("Signup Failed", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Logo Section */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Leaf color="#fff" size={32} fill="#fff" />
          </View>
          <Text style={styles.brandName}>AgroHealth</Text>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join AgroHealth and start diagnosing crop diseases with AI</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={formData.fullName}
            onChangeText={(val) => setFormData({...formData, fullName: val})}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={formData.phoneNumber}
            onChangeText={(val) => setFormData({...formData, phoneNumber: val})}
          />

          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            value={formData.state}
            onChangeText={(val) => setFormData({...formData, state: val})}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(val) => setFormData({...formData, email: val})}
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(val) => setFormData({...formData, password: val})}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              {showPassword ? <EyeOff size={20} color="#636E72" /> : <Eye size={20} color="#636E72" />}
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showConfirmPassword}
              value={formData.confirmPassword}
              onChangeText={(val) => setFormData({...formData, confirmPassword: val})}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
              {showConfirmPassword ? <EyeOff size={20} color="#636E72" /> : <Eye size={20} color="#636E72" />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity 
            style={[styles.checkbox, agreed && styles.checkboxChecked]} 
            onPress={() => setAgreed(!agreed)}
          >
            {agreed && <Text style={styles.checkMark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.linkText}>Terms & Privacy Policy</Text>
          </Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={[styles.createButton, loading && { opacity: 0.7 }]} 
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <View style={styles.buttonRow}>
              <ActivityIndicator color="#fff" />
              <Text style={styles.createButtonText}> Creating Account...</Text>
            </View>
          ) : (
            <View style={styles.buttonRow}>
              <LogIn color="#fff" size={20} style={{ marginRight: 8 }} />
              <Text style={styles.createButtonText}>Create Account</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerLink} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerText}>
            Already have an account? <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    gap: 10,
  },
  logoBox: {
    backgroundColor: '#1C8C36',
    borderRadius: 8,
    padding: 8,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C8C36',
  },
  titleSection: {
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C8C36',
  },
  subtitle: {
    fontSize: 15,
    color: '#4B5563',
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 55,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#1C8C36',
    borderRadius: 6,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#1C8C36',
  },
  checkMark: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 13,
    color: '#4B5563',
  },
  linkText: {
    color: '#1C8C36',
    fontWeight: '500',
  },
  createButton: {
    backgroundColor: '#1C8C36',
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#1C8C36',
    fontWeight: 'bold',
  },
});

export default CreateAccountScreen;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    // Simulate sending email as seen on web
    setEmailSent(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header / Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1C8C36" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <MaterialCommunityIcons name="leaf" size={32} color="#fff" />
          </View>
          <Text style={styles.brandName}>AgroHealth</Text>
        </View>

        {!emailSent ? (
          /* Input View */
          <View style={styles.formContainer}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Forgot Password?</Text>
              <Text style={styles.subtitle}>
                Enter your registered email and we'll send you a reset link.
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Feather name="mail" size={20} color="#9E9E9E" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="your.email@example.com"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.backToLogin} 
              onPress={() => navigation.navigate('Login')}
            >
              <Ionicons name="arrow-back" size={16} color="#1C8C36" />
              <Text style={styles.backToLoginText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Success View (Matching Web Logic) */
          <View style={styles.successContainer}>
            <View style={styles.successCircle}>
              <MaterialCommunityIcons name="leaf" size={40} color="#1C8C36" />
            </View>
            <Text style={styles.title}>Check Your Email</Text>
            <Text style={styles.subtitle}>
              We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
            </Text>

            <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.buttonText}>Back to Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={{ marginTop: 20 }} 
              onPress={() => setEmailSent(false)}
            >
              <Text style={{ color: '#1C8C36', fontWeight: '500' }}>Try another email</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingBottom: 40,
  },
  logoContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 40,
    flexDirection: 'row',
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
  formContainer: {
    width: '100%',
  },
  titleSection: {
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1C8C36',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 25,
  },
  inputLabel: {
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    fontSize: 14,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#1C8C36',
    width: '100%',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    justifyContent: 'center',
  },
  backToLoginText: {
    color: '#1C8C36',
    marginLeft: 5,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    width: '100%',
  },
  successCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#E6F4EA',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default ForgotPasswordScreen;
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://agro-health.onrender.com/api/auth/login', {
        email: email.toLowerCase().trim(),
        password: password
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        // Syncing with Web Storage Logic
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        
        const fullName = user.fullName || "Farmer";
        await AsyncStorage.setItem('userName', fullName);

        const firstName = fullName.split(' ')[0];
        navigation.replace('Home'); 
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid credentials";
      Alert.alert("Login Failed", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
             <MaterialCommunityIcons name="leaf" size={30} color="#fff" />
          </View>
          <Text style={styles.brandName}>AgroHealth</Text>
        </View>

        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subText}>Login to your account to continue diagnosing</Text>
        </View>

        {/* Form Section */}
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Feather name="mail" size={18} color="#9E9E9E" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={18} color="#9E9E9E" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? "eye" : "eye-off"} size={18} color="#9E9E9E" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Forgot')}
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.loginButton, loading && { opacity: 0.7 }]} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={styles.buttonRow}>
                <Feather name="log-in" size={20} color="#fff" style={{marginRight: 10}} />
                <Text style={styles.loginButtonText}>Login</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* <TouchableOpacity 
            style={styles.offlineButton} 
            onPress={() => navigation.replace('Home')}
          >
            <Text style={styles.offlineText}>Try Offline</Text>
          </TouchableOpacity> */}

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    gap: 10,
  },
  logoBox: {
    backgroundColor: '#1C8C36',
    borderRadius: 8,
    padding: 8,
  },
  brandName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C8C36',
  },
  headerContainer: {
    marginBottom: 35,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C8C36',
  },
  subText: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 5,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#1C8C36',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 30,
    gap: 15,
  },
  loginButton: {
    backgroundColor: '#1C8C36',
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  offlineButton: {
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1C8C36',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offlineText: {
    color: '#1C8C36',
    fontWeight: '600',
    fontSize: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#6B7280',
    fontSize: 14,
  },
  signUpText: {
    color: '#1C8C36',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default LoginScreen;
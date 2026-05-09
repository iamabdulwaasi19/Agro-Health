import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const VerifyOTPScreen = ({ route, navigation }) => {
  // Grab email from route params (passed from SignUp)
  const { email } = route.params || {};
  
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  // Safety check: if no email, send them back
  useEffect(() => {
    if (!email) {
      Alert.alert("Error", "No email found for verification");
      navigation.navigate('SignUp');
    }
  }, [email]);

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (otp.length < 6) return;
    
    setLoading(true);
    try {
      const res = await axios.post("https://agro-health.onrender.com/api/auth/verify-otp", {
        email: email.toLowerCase(),
        otp
      });

      if (res.status === 200 || res.status === 201) {
        Alert.alert("Success", "Account verified successfully!");
        navigation.replace('Login'); 
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid OTP";
      Alert.alert("Verification Failed", msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const res = await axios.post("https://agro-health.onrender.com/api/auth/resend-otp", {
        email: email.toLowerCase()
      });

      if (res.status === 200) {
        setTimer(60);
        Alert.alert("Sent", "A new 6-digit code has been sent to your email!");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to resend code. Please try again later.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1C8C36" />
          <Text style={styles.backText}>Edit Email</Text>
        </TouchableOpacity>
        
        <View style={styles.logoRow}>
          <View style={styles.logoBox}>
            <MaterialCommunityIcons name="leaf" size={20} color="#fff" />
          </View>
          <Text style={styles.brandName}>AgroHealth</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Shield Icon Section */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="shield-check" size={45} color="#1C8C36" />
          </View>
          <Text style={styles.title}>Verify your email</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit code to{"\n"}
            <Text style={styles.emailText}>{email}</Text>
          </Text>
        </View>

        {/* OTP Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.otpInput}
            value={otp}
            onChangeText={(val) => setOtp(val.replace(/\D/g, ''))}
            placeholder="000000"
            placeholderTextColor="#E5E7EB"
            keyboardType="number-pad"
            maxLength={6}
            autoFocus={true}
          />
        </View>

        {/* Verify Button */}
        <TouchableOpacity 
          style={[styles.verifyButton, (otp.length < 6 || loading) && styles.disabledButton]} 
          onPress={handleVerify}
          disabled={otp.length < 6 || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify Account</Text>
          )}
        </TouchableOpacity>

        {/* Resend Timer */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendInfo}>Didn't receive the code?</Text>
          <TouchableOpacity 
            disabled={timer > 0} 
            onPress={handleResend}
          >
            <Text style={[styles.resendText, timer > 0 && styles.resendDisabled]}>
              {timer > 0 ? `Resend code in ${timer}s` : "Resend code now"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 5,
    color: '#6B7280',
    fontSize: 14,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBox: {
    backgroundColor: '#1C8C36',
    borderRadius: 6,
    padding: 5,
  },
  brandName: {
    fontWeight: 'bold',
    color: '#1C8C36',
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E6F4EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 15,
    lineHeight: 22,
  },
  emailText: {
    color: '#374151',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 30,
  },
  otpInput: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    height: 70,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C8C36',
    letterSpacing: 10,
  },
  verifyButton: {
    backgroundColor: '#1C8C36',
    height: 55,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1C8C36',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
    shadowOpacity: 0,
    elevation: 0,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  resendInfo: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  resendText: {
    marginTop: 8,
    color: '#1C8C36',
    fontWeight: 'bold',
    fontSize: 15,
  },
  resendDisabled: {
    color: '#D1D5DB',
  },
});

export default VerifyOTPScreen;
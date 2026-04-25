// import React, { useState } from 'react';
// import Logo from '../assets/img/logo.png'
// import { 
//   StyleSheet, 
//   Text, 
//   View, 
//   TextInput, 
//   TouchableOpacity, 
//   SafeAreaView, 
//   Image
// } from 'react-native';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
        
//         {/* Logo Section */}
//         <View style={styles.logoContainer}>
//           <View style={styles.logoCircle}>
//             {/* Simple Leaf Icon Placeholder */}
//             <Image source={Logo} style={styles.img} />  
//           </View>
//           <Text style={styles.brandName}>AgroHealth</Text>
//         </View>

//         {/* Header Section */}
//         <View style={styles.headerContainer}>
//           <Text style={styles.welcomeText}>Welcome Back</Text>
//           <Text style={styles.subText}>Sign in to continue diagnosing</Text>
//         </View>

//         {/* Form Section */}
//         <View style={styles.form}>
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="farmer@example.com"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />

//           <Text style={styles.label}>Password</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="........"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />

//           <TouchableOpacity>
//             <Text style={styles.forgotPassword} onPress={() => navigation.navigate('Forgot')}>
//               Forgot password?
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Buttons Section */}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.loginButton} onPress={() => navigation.replace('Home')}>
//             <Text style={styles.loginButtonText}>
//               Login
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('SignUp')}>
//             <Text style={styles.createAccountText}>
//               Create Account
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.offlineButton} onPress={() => navigation.replace('Home')}>
//             <Text style={styles.offlineText}>
//               Continue Offline
//             </Text>
//           </TouchableOpacity>
//         </View>

//       </View>
//     </SafeAreaView>
//   );
// };

import React, { useState } from 'react';
import Logo from '../assets/img/logo.png';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://agro-health.onrender.com/api/auth/login', {
        email: email,
        password: password
      });


      if (response.status === 200) {
        const { token, user } = response.data;

        await AsyncStorage.setItem('userToken', token);

        const fullName = user.fullName || user.name || "Farmer"; 
        const firstName = fullName.split(' ')[0];

        Alert.alert("Success", `Welcome back, ${ firstName }!`);
        navigation.replace('Home'); 
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid credentials or server down";
      Alert.alert("Login Failed", errorMsg);
      console.log("Login Error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Image source={Logo} style={styles.img} />  
          </View>
          <Text style={styles.brandName}>AgroHealth</Text>
        </View>

        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subText}>Sign in to continue diagnosing</Text>
        </View>

        {/* Form Section */}
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.loginButton, loading && { backgroundColor: '#ccc' }]} 
            onPress={handleLogin} // Calling the connection logic
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.createAccountText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.offlineButton} onPress={() => navigation.replace('Home')}>
            <Text style={styles.offlineText}>Continue Offline</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFA', // Light grey/white background
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  img: {
    width: 50,
    height: 50
  },
  brandName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  headerContainer: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#EDF2F4',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 14,
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#888',
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12, // Modern spacing
  },
  loginButton: {
    backgroundColor: '#528F65', // Green from the image
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  createAccountButton: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountText: {
    color: '#666',
    fontWeight: '500',
  },
  offlineButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  offlineText: {
    color: '#AAA',
    fontSize: 13,
  },
});

export default LoginScreen;
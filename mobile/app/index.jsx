import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AgroHealthSplash from './SplashScreen';
import OnboardingFlow from './OnboardingScreen';
import LoginPage from './LoginScreen';
import CreateAccount from './CreateAccountScreens';
import ForgotPassword from './ForgotPasswordScreen';
import HomePage from './HomeScreen';
import ScanPage from './ScanScreen';
import SavedResults from './SavedResultScreen';
import Settings from './SettingsScreen';
import DetailPage from './DiagnosisDetailScreen';
import Report from './DiagnosisReportScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    /* NO NavigationContainer here! Expo Router handles it. */
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={AgroHealthSplash} />
      <Stack.Screen name="Onboarding" component={OnboardingFlow} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="SignUp" component={CreateAccount} />
      <Stack.Screen name="Forgot" component={ForgotPassword} />
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Scanner" component={ScanPage} />
      <Stack.Screen name="Results" component={SavedResults} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Details" component={DetailPage} />
      <Stack.Screen name="Report" component={Report} />
    </Stack.Navigator>
  );
}

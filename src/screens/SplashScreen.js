import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRIMARY_COLOR = '#FFCA28'; 

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        setTimeout(async () => {
          const loginStatus = await AsyncStorage.getItem('login_status');
          const pendingStatus = await AsyncStorage.getItem('pending_status');

          if (pendingStatus === 'active') {
            navigation.replace('Pending'); 
          } else if (pendingStatus === 'deactivated' && loginStatus === 'true') {
            navigation.replace('CompanyDashboard');
          } else {
            navigation.replace('Intro');
          }
        }, 3000);
      } catch (error) {
        console.error("Error checking user status:", error);
        navigation.replace('Intro');
      }
    };

    checkUserStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* You can add your animated truck and logo here */}
      <Text style={styles.logoText}>FleetDocs</Text>
      <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1F1F1F',
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1F1F1F',
  },
});

export default SplashScreen;
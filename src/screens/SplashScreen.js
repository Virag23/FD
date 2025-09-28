import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const PRIMARY_COLOR = '#FFCA28';
const TEXT_COLOR = '#000000ff'; 

const SplashScreen = ({ navigation }) => {
  const entryAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();

    Animated.timing(entryAnim, {
      toValue: 1,
      duration: 1200, 
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    const splashDuration = 3000; 

    const checkUserStatus = () => {
      setTimeout(async () => {
        try {
          const pendingStatus = await AsyncStorage.getItem('pending_status');
          const loginStatus = await AsyncStorage.getItem('login_status');

          if (pendingStatus === 'active') {
            navigation.replace('Pending');
          } else if (loginStatus === 'true') {
            const userRole = await AsyncStorage.getItem('user_role');
            if (userRole === 'admin') {
              navigation.replace('AdminDashboard');
            } else {
              navigation.replace('CompanyDashboard');
            }
          } else {
            navigation.replace('Intro');
          }
        } catch (error) {
          console.error("Splash screen error:", error);
          navigation.replace('Intro')
        }
      }, splashDuration);
    };

    checkUserStatus();
  }, [navigation, entryAnim]);

  const translateY = entryAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentContainer, { opacity: entryAnim, transform: [{ translateY }] }]}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.logoText}>FleetDocs</Text>
        <Text style={styles.tagline}>
          Comprehensive Fleet & Driver Management System
        </Text>
      </Animated.View>
      <LottieView
        ref={animationRef}
        source={require('../assets/animations/truck_animation.json')}
        style={styles.lottie}
        loop={false}
        autoPlay={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
  },
  contentContainer: {
    alignItems: 'center', 
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: TEXT_COLOR,
    marginTop: 10,
  },
  tagline: {
    fontSize: 16,
    color: TEXT_COLOR,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  lottie: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default SplashScreen;
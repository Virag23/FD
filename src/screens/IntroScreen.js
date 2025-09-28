import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');
const PRIMARY_COLOR = '#FFCA28';
const TEXT_COLOR = '#1F1F1F';

const slides = [
  {
    key: '1',
    icon: 'compass-outline',
    title: 'What is FleetDocs?',
    subtitle: 'A complete solution to manage your trucks, drivers, and documents seamlessly.',
  },
  {
    key: '2',
    icon: 'construct-outline',
    title: 'How It Works',
    subtitle: 'Submit your company details, get approved by our team, and start managing your fleet.',
  },
  {
    key: '3',
    icon: 'list-circle-outline',
    title: 'Key Features',
    subtitle: 'Document OCR, expiry alerts, driver assignment, and detailed history logs.',
  },
  {
    key: '4',
    icon: 'cash-outline',
    title: 'Pricing',
    subtitle: 'Affordable and transparent pricing plans tailored for your business needs.',
  },
];

const IntroScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleCall = () => Linking.openURL('tel:+919325033281');
  const handleEmail = () => Linking.openURL('mailto:viragsjain1975@gmail.com');
  const handleGetInTouch = () => navigation.replace('ContactUs');
  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slideIndex);
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({ x: (activeIndex + 1) * width, animated: true });
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollViewRef.current?.scrollTo({ x: (activeIndex - 1) * width, animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skipBtn} onPress={handleGetInTouch}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide) => (
          <View key={slide.key} style={styles.slide}>
            <View style={styles.card}>
              <Icon name={slide.icon} size={40} color={PRIMARY_COLOR} />
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.subtitle}>{slide.subtitle}</Text>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleGetInTouch}>
                <Text style={styles.primaryBtnText}>Get in touch</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn} onPress={() => setModalVisible(true)}>
                <Text style={styles.secondaryBtnText}>Contact Us</Text>
              </TouchableOpacity>

            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
            style={[styles.navButton, { opacity: activeIndex === 0 ? 0 : 1 }]} 
            onPress={handlePrev}
            disabled={activeIndex === 0}
        >
          <Icon name="arrow-back-circle" size={45} color={TEXT_COLOR} />
        </TouchableOpacity>

        <View style={styles.dotsContainer}>
          {slides.map((_, i) => (
            <Animatable.View
              key={i}
              animation={activeIndex === i ? 'pulse' : undefined}
              iterationCount="infinite"
              style={[styles.dot, activeIndex === i ? styles.activeDot : styles.inactiveDot]}
            />
          ))}
        </View>
        
        <TouchableOpacity 
            style={styles.navButton}
            onPress={activeIndex === slides.length - 1 ? handleGetInTouch : handleNext}
            >
            <Icon name="arrow-forward-circle" size={45} color={TEXT_COLOR} />
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Image source={require('../assets/images/virag.jpg')} style={styles.profileImage}/>
          <Text style={styles.name}>Virag Nandgaonkar</Text>
          <Text style={styles.info}>📞 +91 9325033281</Text>
          <Text style={styles.info}>✉️ viragsjain1975@gmail.com</Text>
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleCall}>
              <Icon name="call-outline" size={22} color="#fff" />
              <Text style={styles.actionBtnText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#2196F3' }]} onPress={handleEmail}>
              <Icon name="mail-outline" size={22} color="#fff" />
              <Text style={styles.actionBtnText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_COLOR },
  skipBtn: { position: 'absolute', top: 60, right: 20, zIndex: 10 },
  skipText: { color: TEXT_COLOR, fontWeight: 'bold', fontSize: 20 },
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: width * 0.9,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  title: { fontSize: 26, fontWeight: 'bold', color: TEXT_COLOR, marginTop: 10 },
  subtitle: { fontSize: 18, color: '#555', textAlign: 'center', marginVertical: 10, minHeight: 60 },
  primaryBtn: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  primaryBtnText: { color: TEXT_COLOR, fontWeight: 'bold', fontSize: 16 },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#7e7e7eff',
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  secondaryBtnText: { color: '#000000ff', fontWeight: '600', fontSize: 16 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: { width: 10, height: 10, borderRadius: 5, marginHorizontal: 6 },
  activeDot: { backgroundColor: TEXT_COLOR },
  inactiveDot: { backgroundColor: 'rgba(0,0,0,0.2)' },
  navButton: {
    padding: 10,
  },
  modalContent: { backgroundColor: '#fff', borderRadius: 20, padding: 20, alignItems: 'center' },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold', color: TEXT_COLOR },
  info: { fontSize: 14, color: '#555', marginTop: 4 },
  modalActions: { flexDirection: 'row', marginTop: 20 },
  actionBtn: { flexDirection: 'row', backgroundColor: 'green', padding: 12, borderRadius: 30, alignItems: 'center', marginHorizontal: 10 },
  actionBtnText: { color: '#fff', fontWeight: 'bold', marginLeft: 6 },
  nextBtn: {
  backgroundColor: TEXT_COLOR,
  paddingVertical: 12,
  borderRadius: 30,
  marginTop: 10,
  width: '90%',
  alignItems: 'center',
 },
 nextBtnText: {
   color: '#fff',
   fontWeight: 'bold',
   fontSize: 18,
 },
});

export default IntroScreen;
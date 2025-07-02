import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import {useAuth} from '../context/AuthContext';

const RegisterScreen = ({navigation}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    bloodType: '',
    dateOfBirth: new Date(),
    location: '',
    weight: '',
    medicalConditions: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showBloodTypeModal, setShowBloodTypeModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const {login} = useAuth();
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    if (!formData.phone || !formData.bloodType || !formData.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleRegister = async () => {
    if (!validateStep2()) return;
    
    setLoading(true);
    
    // Mock registration - in real app, this would be an API call
    setTimeout(() => {
      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        bloodType: formData.bloodType,
        location: formData.location,
        dateOfBirth: formData.dateOfBirth.toISOString(),
        weight: formData.weight,
        medicalConditions: formData.medicalConditions,
        donationCount: 0,
        lastDonation: null,
      };
      
      login(userData);
      setLoading(false);
      Alert.alert(
        'Success',
        'Account created successfully! Welcome to Blood Donation App.',
        [{text: 'OK', onPress: () => navigation.replace('Main')}]
      );
    }, 1500);
  };

  const renderStep1 = () => (
    <>
      <Text style={styles.stepTitle}>Basic Information</Text>
      
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name *"
          placeholderTextColor="#666"
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="email" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email Address *"
          placeholderTextColor="#666"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password *"
          placeholderTextColor="#666"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}>
          <Icon
            name={showPassword ? 'visibility' : 'visibility-off'}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password *"
          placeholderTextColor="#666"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.eyeIcon}>
          <Icon
            name={showConfirmPassword ? 'visibility' : 'visibility-off'}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </>
  );

  const renderStep2 = () => (
    <>
      <Text style={styles.stepTitle}>Personal Details</Text>
      
      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number *"
          placeholderTextColor="#666"
          value={formData.phone}
          onChangeText={(text) => setFormData({...formData, phone: text})}
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowBloodTypeModal(true)}>
        <Icon name="opacity" size={20} color="#666" style={styles.inputIcon} />
        <Text style={[styles.input, styles.inputText, !formData.bloodType && styles.placeholder]}>
          {formData.bloodType || 'Blood Type *'}
        </Text>
        <Icon name="arrow-drop-down" size={24} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowDatePicker(true)}>
        <Icon name="cake" size={20} color="#666" style={styles.inputIcon} />
        <Text style={[styles.input, styles.inputText]}>
          {formData.dateOfBirth.toLocaleDateString()}
        </Text>
        <Icon name="arrow-drop-down" size={24} color="#666" />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Icon name="location-on" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Location *"
          placeholderTextColor="#666"
          value={formData.location}
          onChangeText={(text) => setFormData({...formData, location: text})}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="fitness-center" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          placeholderTextColor="#666"
          value={formData.weight}
          onChangeText={(text) => setFormData({...formData, weight: text})}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="medical-services" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Medical Conditions (if any)"
          placeholderTextColor="#666"
          value={formData.medicalConditions}
          onChangeText={(text) => setFormData({...formData, medicalConditions: text})}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentStep(1)}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.registerButton, loading && styles.disabledButton]}
          onPress={handleRegister}
          disabled={loading}>
          <Text style={styles.registerButtonText}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join our blood donation community</Text>
            
            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressStep, currentStep >= 1 && styles.activeStep]}>
                <Text style={[styles.progressText, currentStep >= 1 && styles.activeProgressText]}>1</Text>
              </View>
              <View style={[styles.progressLine, currentStep >= 2 && styles.activeLine]} />
              <View style={[styles.progressStep, currentStep >= 2 && styles.activeStep]}>
                <Text style={[styles.progressText, currentStep >= 2 && styles.activeProgressText]}>2</Text>
              </View>
            </View>
          </View>

          <View style={styles.formContainer}>
            {currentStep === 1 ? renderStep1() : renderStep2()}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modals */}
      <Modal
        isVisible={showBloodTypeModal}
        onBackdropPress={() => setShowBloodTypeModal(false)}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Blood Type</Text>
          <View style={styles.bloodTypeGrid}>
            {bloodTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.bloodTypeOption}
                onPress={() => {
                  setFormData({...formData, bloodType: type});
                  setShowBloodTypeModal(false);
                }}>
                <Text style={styles.bloodTypeOptionText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <DatePicker
        modal
        open={showDatePicker}
        date={formData.dateOfBirth}
        mode="date"
        maximumDate={new Date()}
        onConfirm={(date) => {
          setShowDatePicker(false);
          setFormData({...formData, dateOfBirth: date});
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressStep: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: '#E53E3E',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
  },
  activeProgressText: {
    color: '#fff',
  },
  progressLine: {
    width: 50,
    height: 2,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
  },
  activeLine: {
    backgroundColor: '#E53E3E',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  inputText: {
    paddingVertical: 15,
  },
  placeholder: {
    color: '#999',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  eyeIcon: {
    padding: 5,
  },
  nextButton: {
    backgroundColor: '#E53E3E',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    flex: 2,
    backgroundColor: '#E53E3E',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  footerLink: {
    color: '#E53E3E',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  bloodTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bloodTypeOption: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bloodTypeOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E53E3E',
  },
});

export default RegisterScreen;

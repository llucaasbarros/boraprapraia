import React, { useState } from 'react';
import { 
  SafeAreaView,
  Text,
  TextInput, 
  View,
  Pressable,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import styles from '../Cadastro/SignUpFormStyle';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordBorderClass, setConfirmPasswordBorderClass] = useState(styles.inputCadastro);
  const backButton = require('../../../../../assets/back-button.png');
  const defaultProfileImage = require('../../../../../assets/Profile-pick.png');
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(true);
  const [buttonText, setButtonText] = useState("CADASTRAR");
  const [emailBorderClass, setEmailBorderClass] = useState('');
  const [showWarningIcon, setShowWarningIcon] = useState(false);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordBorderClass([styles.inputCadastro, styles.inputError]);
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('telephone', telephone);
    formData.append('password', password);

    if (profileImage) {
      formData.append('profileImage', {
        uri: profileImage.uri,
        type: 'image/jpeg',
        name: profileImage.uri.split('/').pop()
      });
    }

    axios
      .post('http://192.168.15.11:5001/SignUpForm', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        if (res.data.status === "ok") {
          setButtonText("Cadastro Efetuado!");
          setTimeout(() => {
            navigation.navigate('LoginForm');
          }, 1000);
        } else {
          Alert.alert('Erro', 'Usuário já existente!');
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar. Tente novamente.');
      });
  };

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary({ noData: true }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source);
      }
    });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <LinearGradient
      colors={['#ffd39e', '#e6d6be']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <SafeAreaView style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
              <Image source={backButton} style={styles.backButtonImage} />
            </Pressable>
            <Pressable onPress={handleChoosePhoto}>
              {profileImage ? (
                <Image source={profileImage} style={styles.profileImage} />
              ) : (
                <Image source={defaultProfileImage} style={styles.profileImage} />
              )}
            </Pressable>
            <View style={styles.inputViewCadastrar}>
              <Text style={styles.inputLabel}>Usuário</Text>
              <TextInput
                style={styles.inputCadastro}
                placeholder='ex: joaozin123'
                value={username}
                onChangeText={setUsername}
                autoCorrect={false}
                autoCapitalize='none'
              />
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[styles.inputCadastro, emailBorderClass]}
                placeholder='ex: joaozin@gmail.com'
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  const hasError = !text.includes('@');
                  setEmailBorderClass(hasError ? styles.inputError : '');
                  setShowWarningIcon(hasError);
                }}
                autoCorrect={false}
                autoCapitalize='none'
              />
              {showWarningIcon && (
                <Icon name="exclamation-circle" size={20} color="red" style={styles.warningIcon} />
              )}
              <Text style={styles.inputLabel}>Telefone</Text>
              <TextInputMask
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99)'
                }}
                style={styles.inputCadastro}
                placeholder='ex: (48)91234-5678'
                value={telephone}
                onChangeText={setTelephone}
              />
              <Text style={styles.inputLabel}>Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.inputCadastro, { paddingRight: 45 }]}
                  placeholder='********'
                  secureTextEntry={isPasswordVisible}
                  value={password}
                  onChangeText={setPassword}
                  autoCorrect={false}
                  autoCapitalize='none'
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                  <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} paddingRight/>
                </TouchableOpacity>
              </View>
              <Text style={styles.inputLabel}>Confirmar Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[confirmPasswordBorderClass, { paddingRight: 45 }]}
                  placeholder='********'
                  secureTextEntry={isConfirmPasswordVisible}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setConfirmPasswordBorderClass(password !== text ? [styles.inputCadastro, styles.inputError] : styles.inputCadastro);
                  }}
                  autoCorrect={false}
                  autoCapitalize='none'
                />
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.iconContainer}>
                  <Icon name={isConfirmPasswordVisible ? 'eye-slash' : 'eye'} size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <Pressable style={styles.buttomCadastrar} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </Pressable>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

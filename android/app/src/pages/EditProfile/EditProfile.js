import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  ScrollView,
  Alert,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles from './EditProfileStyle';
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const navigation = useNavigation();
  const backButton = require('../../../../../assets/back-button.png');
  const defaultProfileImage = require('../../../../../assets/Profile-pick.png');

  useEffect(() => {
    const getUserData = async () => {
      const token = await AsyncStorage.getItem('token');
      axios
        .post('http://192.168.15.11:5001/userdata', { token: token })
        .then(res => {
          setUsername(res.data.data.username);
          setEmail(res.data.data.email);
          setTelephone(res.data.data.telephone);
          setPassword(res.data.data.password);
          if (res.data.data.profileImage) {
            setProfileImage({ uri: `http://192.168.15.11:5001/${res.data.data.profileImage.replace(/\\/g, '/')}` });
          }
        })
        .catch(error => {
          console.error(error);
          Alert.alert('Erro', 'Ocorreu um erro ao obter dados do usuário. Tente novamente.');
        });
    };
    getUserData();
  }, []);

  const handleSave = async () => {
    if (newPassword && newPassword !== confirmNewPassword) {
      Alert.alert('Erro', 'As novas senhas não coincidem!');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('telephone', telephone);
    if (newPassword) {
      formData.append('newPassword', newPassword);
    }

    if (profileImage) {
      formData.append('profileImage', {
        uri: profileImage.uri,
        type: 'image/jpeg',
        name: profileImage.uri.split('/').pop()
      });
    }

    axios.put('http://192.168.15.11:5001/Alterar', formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
      },
  })
  .then(res => {
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      navigation.goBack();
  })
  .catch(error => {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar os dados. Tente novamente.');
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

  return (
    <LinearGradient
      colors={['#ffd39e', '#e6d6be']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView style={styles.scrollView}>
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
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Usuário</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Telefone</Text>
              <TextInput
                style={styles.input}
                value={telephone}
                onChangeText={setTelephone}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Senha Atual</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, { paddingRight: 45 }]}
                  value={"********"}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity style={styles.iconContainer}>
                  <Icon name={'eye-slash'} size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Nova Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, { paddingRight: 45 }]}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={isPasswordVisible}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                  <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Confirmar Nova Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, { paddingRight: 45 }]}
                  value={confirmNewPassword}
                  onChangeText={setConfirmNewPassword}
                  secureTextEntry={isPasswordVisible}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                  <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <Pressable style={styles.buttomSave} onPress={handleSave}>
              <Text style={styles.buttonText}>SALVAR</Text>
            </Pressable>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

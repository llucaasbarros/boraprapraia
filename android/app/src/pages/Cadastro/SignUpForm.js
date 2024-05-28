import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, View , Pressable, Alert, Image, navigation} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import styles from '../Cadastro/SignUpFormStyle';
import axios from 'axios';
import LoginForm from '../Login/LoginForm';

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [usernameVerify, setUsernameVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [telephone, setTelephone] = useState("");
  const [telephoneVerify, setTelephoneVerify] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordVerify, setConfirmPasswordVerify] = useState(false);
  const backButton = require('../../../../../assets/back-button.png');
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
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
        type: 'image/jpeg', // Ajuste o tipo conforme necessário
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
          Alert.alert(
            'Sucesso', 
            'Cadastro efetuado com sucesso!', 
            [
              { text: 'ok', onPress: () => navigation.navigate('LoginForm') }
            ]
          );
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

  return (
    <SafeAreaView style={styles.container}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image source={backButton} style={styles.backButtonImage} />
        </Pressable>
        <Pressable onPress={handleChoosePhoto}>
            {profileImage ? (
                <Image source={profileImage} style={styles.profileImage} />
            ) : (
                <View style={styles.profilePlaceholder}>
                    <Text style={styles.profilePlaceholderText}>SELECIONAR IMAGEM</Text>
                </View>
            )}
        </Pressable>
        <Text style={styles.titleCadastro}>Cadastro</Text>
        <View style={styles.inputViewCadastrar}>
            <TextInput
                style={styles.inputCadastro}
                placeholder='NOME DE USUÁRIO'
                value={username}
                onChangeText={setUsername}
                autoCorrect={false}
                autoCapitalize='none'
            />
            <TextInput
                style={styles.inputCadastro}
                placeholder='EMAIL'
                value={email}
                onChangeText={setEmail}
                autoCorrect={false}
                autoCapitalize='none'
            />
            <TextInput
                style={styles.inputCadastro}
                placeholder='TELEFONE'
                value={telephone}
                onChangeText={setTelephone}
                autoCorrect={false}
                autoCapitalize='none'
            />
            <TextInput
                style={styles.inputCadastro}
                placeholder='SENHA'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCorrect={false}
                autoCapitalize='none'
            />
            <TextInput
                style={styles.inputCadastro}
                placeholder='CONFIRMAR SENHA'
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCorrect={false}
                autoCapitalize='none'
            />
        </View>
        <Pressable style={styles.buttomCadastrar} onPress={() => handleSubmit("Cadastro efetuado com sucesso!")}>
            <Text style={styles.buttonText}>CADASTRAR</Text>
        </Pressable>
    </SafeAreaView>
  );
}


import React, { useState, useEffect } from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  Switch,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import styles from '../Login/LoginFormStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

const logo = require("../../../../../assets/logo.png");
const facebook = require("../../../../../assets/facebook.png");
const google = require("../../../../../assets/google.png");
const x = require("../../../../../assets/x.png");

export default function LoginForm() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const [buttonText, setButtonText] = useState("LOGIN");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, preencha todos os campos!');
      return;
    }
  
    setLoading(true);
    console.log(email, password);
    const userData = {
      email: email,
      password: password,
    };
  
    axios.post('http://192.168.15.11:5001/LoginForm', userData)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 'ok') {
          AsyncStorage.setItem('token', res.data.data);
          AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
          if (res.data.userType) {
            AsyncStorage.setItem('userType', res.data.userType);
          } else {
            AsyncStorage.removeItem('userType');
          }
          setTimeout(() => {
            navigation.navigate('Home');
          }, 1000);
          setButtonText("LOGIN EFETUADO! 😀");
        } else {
          Alert.alert('Login Failed', 'Email ou senha inválidos!');
          setPassword('');
          setLoginError(true);
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Ocorreu um erro,', 'por favor, tente novamente mais tarde!');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data, 'at app.jsx');
  }

  useEffect(() => {
    getData();
    console.log("Hii");
    setPassword('');
    setEmail('');
    setButtonText('LOGIN');
  }, [isFocused]);

  const handleRememberMeToggle = () => {
    setRememberMe(previousState => !previousState);
  };

  return (
    <LinearGradient
    colors={['#ffd39e', '#e6d6be']}
    style={styles.container}
    >
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode='contain' />
      <Text style={styles.title}>BEM VINDO(a)!</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder='EMAIL'
          value={email}
          onChange={e => setEmail(e.nativeEvent.text)}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={[styles.input, loginError && styles.inputError, {paddingRight: 45}]}
          placeholder='SENHA'
          secureTextEntry={isPasswordVisible}
          value={password}
          onChangeText={(text) => { setPassword(text); setLoginError(false); }}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.iconContainer}>
          <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.rememberView}>
        <View style={styles.switch}>
          <Switch
          value={rememberMe}
          onValueChange={handleRememberMeToggle}
          style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}/>
          <Text style={styles.rememberText}>Lembrar de Mim</Text>
        </View>
        <View>
          <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgetText}>Esqueceu a senha?</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
        <Text style={styles.optionsText}>--------------------   OU   --------------------</Text>
      </View>
      <View style={styles.mediaIcons}>
        <Pressable onPress={() => Alert.alert("Login com Facebook")}>
          <Image source={facebook} style={styles.icons} />
        </Pressable>
        <Pressable onPress={() => Alert.alert("Login com X")}>
          <Image source={x} style={styles.icons} />
        </Pressable>
        <Pressable onPress={() => Alert.alert("Login com Google")}>
          <Image source={google} style={styles.icons} />
        </Pressable>
      </View>
      <Text style={styles.footerText}>
        Não Possui conta?
        <Text style={styles.signup} onPress={() => navigation.navigate('SignUp')}> Cadastrar</Text>
      </Text>
    </SafeAreaView>
    </LinearGradient>
  );
}

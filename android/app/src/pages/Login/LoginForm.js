import React, { useState, useEffect } from 'react';
import { Alert, Image, Pressable, SafeAreaView, Switch, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import styles from '../Login/LoginFormStyle';

const logo = require("../../../../../assets/logo.png");
const facebook = require("../../../../../assets/facebook.png");
const google = require("../../../../../assets/google.png");
const x = require("../../../../../assets/x.png");

export default function LoginForm() {
  const navigation = useNavigation();
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
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
          Alert.alert('Logged In Successfully');
          AsyncStorage.setItem('token', res.data.data);
          AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
          AsyncStorage.setItem('userType', res.data.userType);
          navigation.navigate('Home');
        } else {
          Alert.alert('Login Failed', 'Invalid email or password');
          setPassword('');
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('An error occurred', 'Please try again later.');
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
  }, []);

  const handleRememberMeToggle = () => {
    setRememberMe(previousState => !previousState);
  };

  return (
    <LinearGradient
    colors={['#e3d4ba', '#fff1e0']}
    style={styles.container}
    >
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode='contain' />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder='EMAIL OU USUÁRIO'
          value={email}
          onChange={e => setEmail(e.nativeEvent.text)}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder='SENHA'
          secureTextEntry
          value={password}
          onChange={e => setPassword(e.nativeEvent.text)}
          autoCorrect={false}
          autoCapitalize='none'
        />
      </View>
      <View style={styles.rememberView}>
        <View style={styles.switch}>
          <Switch value={rememberMe} onValueChange={handleRememberMeToggle} trackColor={{ true: "green", false: "gray" }} />
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
          <Text style={styles.buttonText}>{loading ? 'LOADING...' : 'LOGIN'}</Text>
        </Pressable>
        <Text style={styles.optionsText}>OU LOGIN COM</Text>
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

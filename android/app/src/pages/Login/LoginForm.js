import React, { useState } from 'react';
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../Login/LoginFormStyle';
import axios from 'axios';

const logo = require("../../../../../assets/logo.png")
const facebook = require("../../../../../assets/facebook.png");
const google = require("../../../../../assets/google.png");
const x = require("../../../../../assets/x.png");

export default function LoginForm() {
  const navigation = useNavigation();
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")

  function handelSubmit() {
    console.log(email, password);
    const userData = {
      email: email,
      password,
    };
    axios
      .post("http://192.168.15.11:5001/LoginForm", userData)
      .then(res=>console.log(res.data))
  }

  return (
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
          <Switch value={click} onValueChange={setClick} trackColor={{ true: "green", false: "gray" }} />
          <Text style={styles.rememberText}>Lembrar de Mim</Text>
        </View>
        <View>
          <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgetText}>Esqueceu a senha?</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={() => handelSubmit()}>
          <Text style={styles.buttonText}>LOGIN</Text>
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
  );
}

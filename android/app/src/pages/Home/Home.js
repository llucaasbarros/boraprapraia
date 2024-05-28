import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, Text, View, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles from '../Home/HomeStyle';

export default function Home() {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  async function getData() {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    axios
      .post('http://192.168.15.11:5001/userdata', { token: token })
      .then(res => {
        console.log(res.data);
        setUserData(res.data.data);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Ocorreu um erro ao obter dados do usuário. Tente novamente.');
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Deslogado com sucesso!');
      navigation.navigate('LoginForm');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao deslogar. Tente novamente.');
    }
  };

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Nome de usuário: {userData?.username}</Text>
      <Text>Email: {userData?.email}</Text>
      <Text>Telefone: {userData?.telephone}</Text>
      {userData?.profileImage && (
        <Image
          source={{ uri: `http://192.168.15.11:5001/${userData?.profileImage}` }}
          style={styles.profileImage}
        />
      )}
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Voltar</Text>
      </Pressable>
    </SafeAreaView>
  );
}

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Pressable,
  Image,
  Alert
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from './ConfigStyle';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const profilePick = require('./../../../../../assets/Profile-pick.png');
const backButton = require('../../../../../assets/back-button.png');

export default function Config() {
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
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
    };

    getData();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: () => confirmLogout() },
      ],
      { cancelable: false }
    );
  };

  const confirmLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('LoginForm');
  };

  return (
    <LinearGradient
      colors={['#ffd39e', '#e6d6be']}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerAction}>
              <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={backButton} style={styles.backButtonImage} />
              </Pressable>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={[styles.section, { paddingTop: 4 }]}>
              <Text style={styles.sectionTitle}>Conta</Text>
              <View style={styles.sectionBody}>
                <Pressable
                  onPress={() => navigation.navigate('EditProfile')}
                  style={styles.profile}
                >
                  <Image
                    source={userData && userData.profileImage ? { uri: `http://192.168.15.11:5001/${userData.profileImage.replace(/\\/g, '/')}` } : profilePick}
                    style={styles.profileAvatar}
                  />
                  <View style={styles.profileBody}>
                    <Text style={styles.profileName}>{userData ? userData.username : 'Carregando...'}</Text>
                    <Text style={styles.profileHandle}>{userData ? userData.email : 'Carregando...'}</Text>
                  </View>
                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={22}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preferências</Text>
              <View style={styles.sectionBody}>
                <View style={[styles.rowWrapper, styles.rowFirst]}>
                  <TouchableOpacity
                    onPress={() => { }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>Linguagem</Text>
                    <View style={styles.rowSpacer} />
                    <Text style={styles.rowValue}>Português</Text>
                    <FeatherIcon
                      color="#bcbcbc"
                      name="chevron-right"
                      size={19}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.rowWrapper}>
                  <TouchableOpacity
                    onPress={() => { }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>Localização</Text>
                    <View style={styles.rowSpacer} />
                    <Text style={styles.rowValue}>Florianópolis, SC</Text>
                    <FeatherIcon
                      color="#bcbcbc"
                      name="chevron-right"
                      size={19}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.rowWrapper}>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>Notificações por email</Text>
                    <View style={styles.rowSpacer} />
                    <Switch
                      onValueChange={emailNotifications =>
                        setForm({ ...form, emailNotifications })
                      }
                      style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                      value={form.emailNotifications}
                    />
                  </View>
                </View>
                <View style={[styles.rowWrapper, styles.rowLast]}>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>Notificações</Text>
                    <View style={styles.rowSpacer} />
                    <Switch
                      onValueChange={pushNotifications =>
                        setForm({ ...form, pushNotifications })
                      }
                      style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                      value={form.pushNotifications}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recursos</Text>
              <View style={styles.sectionBody}>
                <View style={[styles.rowWrapper, styles.rowFirst]}>
                  <TouchableOpacity
                    onPress={() => { }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>Contate-nos</Text>
                    <View style={styles.rowSpacer} />
                    <FeatherIcon
                      color="#bcbcbc"
                      name="chevron-right"
                      size={19}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.rowWrapper}>
                  <TouchableOpacity
                    onPress={() => { }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>Reportar Bug</Text>
                    <View style={styles.rowSpacer} />
                    <FeatherIcon
                      color="#bcbcbc"
                      name="chevron-right"
                      size={19}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.rowWrapper}>
                  <TouchableOpacity
                    onPress={() => { }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>Avaliar na Play Store</Text>
                    <View style={styles.rowSpacer} />
                    <FeatherIcon
                      color="#bcbcbc"
                      name="chevron-right"
                      size={19}
                    />
                  </TouchableOpacity>
                </View>
                <View style={[styles.rowWrapper, styles.rowLast]}>
                  <TouchableOpacity
                    onPress={() => { }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>Termos e Privacidade</Text>
                    <View style={styles.rowSpacer} />
                    <FeatherIcon
                      color="#bcbcbc"
                      name="chevron-right"
                      size={19}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <View style={styles.sectionBody}>
                <View
                  style={[
                    styles.rowWrapper,
                    styles.rowFirst,
                    styles.rowLast,
                    { alignItems: 'center' },
                  ]}>
                  <TouchableOpacity
                    onPress={handleLogout}
                    style={styles.row}>
                    <Text style={[styles.rowLabel, styles.rowLabelLogout]}>
                      Sair
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

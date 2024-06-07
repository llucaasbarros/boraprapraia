import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Dimensions, Platform, PermissionsAndroid, Image, Pressable } from 'react-native';
import styles from './HomeStyle';
import React, { useState, useEffect, useRef } from 'react';
import Geolocation from '@react-native-community/geolocation';
import mapStyle from '../../../../../assets/MapStyle.json';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('screen');

const HOME_REGION = {
  latitude: -27.597156,
  longitude: -48.481265,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5
};

const BOUNDARIES = {
  north: -27.357136,
  south: -27.882788,
  east: -48.321964,
  west: -48.655673
};

export default function Home() {
  const [region, setRegion] = useState(HOME_REGION);
  const [showMenu, setShowMenu] = useState(false); // State para controlar a exibição do menu
  const mapRef = useRef(null);

  useEffect(() => {
    getMyLocation();
  }, []);

  function getMyLocation() {
    Geolocation.getCurrentPosition(info => {
      const { latitude, longitude } = info.coords;
      if (isWithinBoundaries(latitude, longitude)) {
        setRegion({
          ...HOME_REGION,
          latitude,
          longitude
        });
      } else {
        setRegion(HOME_REGION);
      }
    });
  }

  function isWithinBoundaries(latitude, longitude) {
    return (
      latitude >= BOUNDARIES.south &&
      latitude <= BOUNDARIES.north &&
      longitude >= BOUNDARIES.west &&
      longitude <= BOUNDARIES.east
    );
  }

  function handleRegionChangeComplete(newRegion) {
    if (isWithinBoundaries(newRegion.latitude, newRegion.longitude)) {
      setRegion(newRegion);
    } else {

      let adjustedRegion = { ...newRegion };
      if (newRegion.latitude > BOUNDARIES.north) {
        adjustedRegion.latitude = BOUNDARIES.north;
      }
      if (newRegion.latitude < BOUNDARIES.south) {
        adjustedRegion.latitude = BOUNDARIES.south;
      }
      if (newRegion.longitude > BOUNDARIES.east) {
        adjustedRegion.longitude = BOUNDARIES.east;
      }
      if (newRegion.longitude < BOUNDARIES.west) {
        adjustedRegion.longitude = BOUNDARIES.west;
      }
      setRegion(adjustedRegion);
      mapRef.current.animateToRegion(adjustedRegion, 1000);
    }
  }

  function handleMenuPress() {
    setShowMenu(!showMenu); // Alterna a exibição do menu ao pressionar o botão
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ width: width, height: height }}
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}
        zoomEnabled={true}
        loadingEnabled={true}
        minZoomLevel={10}
        showsUserLocation={true}
        customMapStyle={mapStyle}
        toolbarEnabled={false}
        onMapReady={() => {
          if (Platform.OS === 'android') {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ).then(() => {
              console.log('Usuário aceitou!');
            });
          }
        }}
      />
      <Pressable
        style={styles.button}
        onPress={handleMenuPress} // Altere para a função que controla a exibição do menu
      >
        <Animatable.View style={styles.shapesContainer} animation={showMenu ? 'slideOutUp' : 'slideInDown'}>
          <Animatable.View style={styles.circle} animation={showMenu} />
          <Animatable.View style={styles.square} animation={showMenu} />
          <Animatable.View style={styles.triangle} animation={showMenu} />
        </Animatable.View>
      </Pressable>
      <Pressable
        style={styles.centerButton}
        onPress={getMyLocation}
      >
        <Image
          source={require('../../../../../assets/center.png')}
          style={styles.centerIcon}
        />
      </Pressable>
    </View>
  );
}

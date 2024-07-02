import React, { useState, useEffect, useRef, Fragment } from 'react';
import { View, Dimensions, Platform, PermissionsAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import styles from './HomeStyle';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import mapStyle from '../../../../../assets/MapStyle.json';
import FabButton from '../../Components/FabButton';
import MarkerBL from '../../Components/MarkerBL';

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
  const [zoom, setZoom] = useState(10); // Estado para armazenar o nível de zoom
  const mapRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    getMyLocation();
  }, []);

  function getMyLocation() {
    Geolocation.getCurrentPosition(
      info => {
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
      },
      error => {
        console.error(error);
        setRegion(HOME_REGION);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
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

    // Obtenha o nível de zoom atual
    mapRef.current.getCamera().then(camera => {
      setZoom(camera.zoom);
    });
  }

  function navigateToConfig() {
    navigation.navigate('Config');
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
      >
        <Marker coordinate={{ latitude: -27.573341, longitude: -48.425181 }}>
          <MarkerBL zoom={zoom} title={"Barra da Lagoa"} description={"Praia"} />
        </Marker>
      </MapView>
      <Fragment>
        <FabButton navigateToConfig={navigateToConfig} />
      </Fragment>
    </View>
  );
}

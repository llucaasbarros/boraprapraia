import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const MarkerBL = () => {
  return (
    <View style={styles.marker}>
      <Image
        source={require('../../../../assets/barra-da-lagoa.jpg')}
        style={styles.markerImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 30,
    backgroundColor: "#FFA825",
  },
  markerImage: {
    width: 31,
    height: 31,
    borderRadius: 30,
  },
});

export default MarkerBL;

import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    height: 75,
    width: width * 0.2,
    left: width * 0.4,
    borderRadius: 30,
    backgroundColor: "#FFA825",
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3
  },
  shapesContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    bottom: 18,
    left: 18,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#fff1e0'
  },
  square: {
    position: 'absolute',
    bottom: 18,
    right:18,
    width: 15,
    height: 15,
    backgroundColor: '#fff1e0'
  },
  triangle: {
    position: 'absolute',
    top: 15,
    left: '50%',
    marginLeft: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white'
  },
  centerButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#FFA825',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    opacity: 1
  },
  centerIcon: {
    width: 30,
    height: 30,
  },
});

export default styles;

import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: 10,
    top: 5,
    position: 'absolute',
    right: 5
  },
  scrollView : {
    flex : 1
  },
  inputView: {
    marginBottom: 16,
  },
  input : {
    height : 50,
    width: 300,
    paddingHorizontal : 20,
    borderColor : "#FFA825",
    borderWidth : 1,
    borderRadius: 7,
    backgroundColor : 'white',
    justifyContent: 'center',
    marginTop : 3,
  },
  inputLabel: {
    fontSize: 16,
    color: "#FFA825",
    marginBottom: 0,
    marginTop: 0,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop : 0,
    borderColor : "#FFA825",
    borderWidth : 3,
  },
  profilePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop : 0,
    borderColor : "#FFA825",
    borderWidth : 3,
  },
  buttomSave : {
    backgroundColor : "#FFA825",
    height : 45,
    width : 290,
    borderColor : "white",
    borderWidth  : 1,
    borderRadius : 5,
    alignItems : "center",
    justifyContent : "center",
    marginTop: 15
  },
  buttonText : {
    color : "white",
    fontSize: 18,
    fontWeight : "bold"
  },
  backButton : {
    position: 'absolute',
    top: 15,
    left: 0,
    zIndex: 1,
    height : 45,
    width : 45,
  },
  backButtonImage : {
    width: 35,
    height: 35,
  },
});

export default styles;
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    
    container : {
      alignItems : "center",
      paddingTop : 0,
      justifyContent : 'center',
      marginTop : 0 ,

    },
    scrollView : {
      flex : 1
    },
    inputLabel: {
      fontSize: 16,
      color: "#FFA825",
      marginBottom: -15,
      marginTop: 2,
    },
    image : {
      height : 150,
      width : 150
    },
    defaultImage: {
      height: 150,
      width: 150
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 100,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 35,
      marginTop : 55,
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
      marginBottom: 35,
      marginTop : 55,
      borderColor : "#FFA825",
      borderWidth : 3,
    },
    title : {
      fontSize : 30,
      fontWeight : "bold",
      textTransform : "uppercase",
      textAlign: "center",
      paddingVertical : 40,
      color : "#FFA825"
    },
    buttonText : {
      color : "white"  ,
      fontSize: 18,
      fontWeight : "bold"
    }, 
    buttomCadastrar : {
      backgroundColor : "#FFA825",
      height : 45,
      width : 290,
      borderColor : "white",
      borderWidth  : 1,
      borderRadius : 5,
      alignItems : "center",
      justifyContent : "center",
      left: 5
    },
    backButton : {
      position: 'absolute',
      top: 47,
      left: 15,
      zIndex: 1,
      height : 45,
      width : 45,
    },
    backButtonImage : {
      width: 35,
      height: 35,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    iconContainer: {
      padding: 10,
      position: 'absolute',
      right: 5
    },
    inputCadastro : {
      height : 50,
      width: 300,
      paddingHorizontal : 20,
      borderColor : "#FFA825",
      borderWidth : 1,
      borderRadius: 7,
      backgroundColor : 'white',
      justifyContent: 'center',
      marginTop : 3
    },
    inputViewCadastrar : {
      gap : 15,
      width : "100%",
      left: 6,
      justifyContent: 'center',
      paddingHorizontal : 40,
      marginBottom  : 25,
      marginTop: -20
    },
    inputError: {
      borderColor: 'red',
      borderWidth: 1,
    },
    warningIcon: {
      position: 'absolute',
      right: 52,
      top: '32%',
      transform: [{ translateY: -10 }],
      zIndex: 1
    },    
  })

export default styles;
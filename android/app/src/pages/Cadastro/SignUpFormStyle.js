import { ScrollView, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    
    container : {
      alignItems : "center",
      paddingTop : 0,
      justifyContent : 'center',
      marginTop : 0 ,
      height: 770
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
      height : 160,
      width : 170
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 100,
      backgroundColor: '#ded3c1',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 35,
      marginTop : 20,
      borderColor : "#FFA825",
      borderWidth : 3,
    },
    profilePlaceholder: {
      width: 150,
      height: 150,
      borderRadius: 100,
      backgroundColor: '#ded3c1',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 35,
      marginTop : 20,
      borderColor : "#FFA825",
      borderWidth : 3,
    },
    profilePlaceholderText: {
      color: "#FFFFFF",
      textAlign: 'center',
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
      top: 40,
      left: 25,
      zIndex: 1,
      height : 45,
      width : 45,
    },
    backButtonImage : {
      width: 65,
      height: 65,
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
    }
  })

export default styles;
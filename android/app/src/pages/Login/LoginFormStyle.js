import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    
    container : {
      alignItems : "center",
      paddingTop : 70,
      justifyContent : 'center',
      backgroundColor : '#fff1e0',
      marginTop : 0 ,
      height: 736
    },
    image : {
      height : 160,
      width : 170
    },
    profileImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: '#DBDBDB',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 700,
      marginTop : -50,
      borderColor : "#FFA825",
      borderWidth : 3,
    },
    profilePlaceholder: {
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: '#DBDBDB',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 700,
      marginTop : -50,
      borderColor : "#FFA825",
      borderWidth : 3,
    },
    profilePlaceholderText: {
      color: '#fff',
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
    inputView : {
      gap : 15,
      width : "100%",
      paddingHorizontal : 40,
      marginBottom  : 5
    },
    input : {
      height : 50,
      paddingHorizontal : 20,
      borderColor : "#FFA825",
      borderWidth : 1,
      borderRadius: 7,
      backgroundColor : 'white'
    },
    rememberView : {
      width : "100%",
      paddingHorizontal : 50,
      justifyContent: "space-between",
      alignItems : "center",
      flexDirection : "row",
      marginBottom : 8
    },
    switch :{
      flexDirection : "row",
      gap : 1,
      justifyContent : "center",
      alignItems : "center",
      marginTop: 10
      
    },
    rememberText : {
      fontSize: 13,
      marginTop: -1
    },
    forgetText : {
      fontSize : 11,
      color : "#FFA825",
      marginTop: 10
    },
    button : {
      backgroundColor : "#FFA825",
      height : 45,
      width : 290,
      borderColor : "white",
      borderWidth  : 1,
      borderRadius : 5,
      alignItems : "center",
      justifyContent : "center",
      marginTop: 20
    },
    buttonText : {
      color : "white"  ,
      fontSize: 18,
      fontWeight : "bold"
    }, 
    buttonView :{
      width :"100%",
      paddingHorizontal : 50
    },
    optionsText : {
      textAlign : "center",
      paddingVertical : 10,
      color : "gray",
      fontSize : 13,
      marginBottom : 6,
      marginTop: 7
    },
    mediaIcons : {
      flexDirection : "row",
      gap : 15,
      alignItems: "center",
      justifyContent : "center",
      marginBottom : 23
    },
    icons : {
      width : 40,
      height: 40,
    },
    footerText : {
      textAlign: "center",
      color : "gray",
      marginTop: -10
    },
    signup : {
      color : "#FFA825",
      fontSize : 13
    },
    titleCadastro : {
      fontSize : 30,
      fontWeight : "bold",
      textTransform : "uppercase",
      textAlign: "center",
      paddingVertical : 40,
      color : "#FFA825",
      marginTop: -725
    },
    buttomCadastrar : {
      backgroundColor : "#FFA825",
      height : 45,
      width : 290,
      borderColor : "white",
      borderWidth  : 2,
      borderRadius : 5,
      alignItems : "center",
      justifyContent : "center",
      marginBottom: 0
    },
    backButton : {
      position: 'absolute',
      top: 0,
      left: 10,
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
      paddingHorizontal : 20,
      borderColor : "#FFA825",
      borderWidth : 1,
      borderRadius: 7,
      backgroundColor : 'white',
      marginTop : 3
    },
    inputViewCadastrar : {
      gap : 15,
      width : "100%",
      paddingHorizontal : 40,
      marginBottom  : 25,
      marginTop: -20
    }
  })

export default styles;
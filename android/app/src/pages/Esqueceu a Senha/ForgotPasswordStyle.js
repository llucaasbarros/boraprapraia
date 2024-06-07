import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#fff1e0'
    },
    title: {
        fontSize : 30,
        fontWeight : "bold",
        textTransform : "uppercase",
        textAlign: "center",
        paddingVertical : 40,
        color : "#FFA825"
    },
    input: {
      width: '100%',
      padding: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      marginBottom: 0,
      marginTop : -15,
      backgroundColor : "white"
    },
    button : {
        backgroundColor : "#FFA825",
        height : 45,
        width : 290,
        borderColor : "gray",
        borderWidth  : 1,
        borderRadius : 5,
        alignItems : "center",
        justifyContent : "center",
        marginTop: 30
      },
    buttonText : {
        color : "white"  ,
        fontSize: 18,
        fontWeight : "bold"
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
  });



export default styles;
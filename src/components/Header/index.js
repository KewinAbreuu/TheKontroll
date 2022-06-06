import react, {} from "react";
import {View,Text, StyleSheet,Button,SafeAreaView, StatusBar, Image, Appearance}from 'react-native'
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

import Logo from '../../assets/Logo.png'


export default function Header({}){

    

    return(
    <>
    <StatusBar/>

    <View style={styles.container}>
        <View style={styles.containerHeader}>
            <Text style={styles.nameApp}>The Kontroll</Text>
            <Image source={Logo} style={{width:50, height:50}}/>
        </View>

        <Text style={styles.version}>Version:1.6.3</Text>
    </View>
        
    </>
    )
}
const colorScheme = Appearance.getColorScheme();


const styles = StyleSheet.create({
    container: {
      width:"100%",
      height:72,
      paddingBottom:5,
      backgroundColor:colorScheme==="light"?"#222":"#222",
      justifyContent:"center",
      alignItems: 'center',
      marginTop:0,
      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    containerHeader:{
        width:"100%",
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row",
        paddingHorizontal:20
    },
    nameApp:{
        fontSize:20,
        fontWeight:"bold",
        color:colorScheme==="light"?"#fff":"#fff",
    },
    version:{
        color:colorScheme==="light"?"#fff":"#fff",
    }
    
  });
  
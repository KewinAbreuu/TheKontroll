import react, {} from "react";
import {View,Text, StyleSheet,Button,SafeAreaView, StatusBar, Image}from 'react-native'

import Logo from '../../assets/Logo.png'


export default function Header({}){

    

    return(
    <>
    <StatusBar/>

    <View style={styles.container}>
        <View style={styles.containerHeader}>
            <Text style={{fontSize:20, fontWeight:"bold", color:"#000"}}>The Kontroll</Text>
            <Image source={Logo} style={{width:50, height:50}}/>
        </View>

        <Text style={{color:"#000"}}>Version:1.5.4</Text>
    </View>
        
    </>
    )
}

const styles = StyleSheet.create({
    container: {
      width:"100%",
      height:72,
      backgroundColor: '#fff',
      justifyContent:"center",
      alignItems: 'center',
      marginTop:0,
    },
    containerHeader:{
        width:"100%",
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row",
        paddingHorizontal:20
    }
    
  });
  
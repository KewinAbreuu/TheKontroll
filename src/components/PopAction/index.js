import react, {useState, useEffect} from "react";
import {View,Text, StyleSheet,Button,SafeAreaView, StatusBar, Image, Appearance, TouchableOpacity, Linking}from 'react-native'

import Logo from '../../assets/Logo.png'
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Config from '../../assets/config.png'
import Replace from '../../assets/replace.png'
import Adm from '../../assets/adm.png'


export default function PopAction({navigation}){

    function IrAdm(){
        navigation.navigate('Adm')
    }

    
    function Plantao(){
        navigation.navigate('ScanPlantao')
    }

    function Perfil(){
        navigation.navigate('UserPerfil')
    }

    return(
    <>
    <StatusBar/>

    <Animatable.View animation='zoomIn' easing="ease-in-out" useNativeDriver={true} duration={200} style={styles.container}>

        <View>
           <Text style={styles.NameLinks}>TheKontroll</Text>
        </View>

        <TouchableOpacity style={styles.viewPop} onPress={IrAdm}>
            <Image source={Adm} style={styles.icons}/>
           <Text style={styles.NameLinks}>Administrador</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewPop} onPress={Plantao}>
            <Image source={Replace} style={styles.icons}/>
           <Text style={styles.NameLinks}>Trocar Plantão</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewPop} onPress={Perfil}>
            <Image source={Config} style={styles.icons}/>
           <Text style={styles.NameLinks}>Configurações</Text>
        </TouchableOpacity>
             
    </Animatable.View >
        
    </>
    )
}

const colorScheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
    container: {
      width:200,
      height:200,
      backgroundColor: '#222',
      alignItems: 'center',
      marginTop:90,
      paddingTop:10,
      marginRight:10,
      zIndex:9,
      position:"absolute",
      right:0,
      flexDirection:"column",
       shadowColor: "#FFF",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius:20
    },
    NameLinks:{
        color:"#fff",
        fontWeight:"bold",
        marginBottom:10
    },
    icons:{
        width:25,
        height:25,
        resizeMode:"contain",
        marginRight:10,
    },
    viewPop:{
        flexDirection:"row", backgroundColor:"#4c4c4c", width:"100%", alignItems:"center", height:45,
        justifyContent:"center",
        marginBottom:1
    }
   
    
  });
  
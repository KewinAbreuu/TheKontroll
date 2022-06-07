import react, {useState, useEffect} from "react";
import {View,Text, StyleSheet,Button,SafeAreaView, StatusBar, Image, Appearance, TouchableOpacity}from 'react-native'

import Logo from '../../assets/Logo.png'
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PopAction from "../PopAction";



export default function HeaderHome({navigation}){

    const [funcionario, setFuncionario]= useState(null);
    const [funcionarioName, setFuncionarioName]= useState(false);
    const [nameCondomino, setNameCondominio] =useState()
    const [ estado, setEstado] =useState(false)

    useEffect(()=>{
        getData()
    },[funcionarioName])

    const getData = async () => {
          const funcionario = await AsyncStorage.getItem('Funcionario')
         if(funcionario !== null || funcionario === funcionario){
            setFuncionario(funcionario)
            setFuncionarioName(!funcionarioName)
         }else{alert('nao tem nd no local')}
      }

    async function FnameCondominio(){
       const nome= await AsyncStorage.getItem('Empresa')
       setNameCondominio(nome)
    }
    FnameCondominio()

    function Pop(){
      setEstado(!estado)
    }

    return(
    <>
    <StatusBar/>
    {estado && <PopAction navigation={navigation}/>  }
    <View style={styles.container}>
        <View style={styles.containerHeader}>
            <Text style={styles.nameApp}>The Kontroll</Text>
            <TouchableOpacity style={styles.borderLogo} onPress={Pop}>
             <Image source={Logo} style={{width:40, height:40}}/>
            </TouchableOpacity>
        </View>

        <Text style={{color:"#cdcdcd", marginTop:20}}>Version:1.6.3</Text>
        <Text style={{marginLeft:20,marginTop:20, fontSize:14, color:"#fff", fontWeight:"bold"}}>Condominio: {nameCondomino}</Text>
    </View>
        
    </>
    )
}

const colorScheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
    container: {
      width:"100%",
      height:180,
      backgroundColor: '#4169E1',
    //   justifyContent:"center",
      alignItems: 'center',
      borderBottomLeftRadius:40,
      paddingTop:30,
      zIndex:7,
      marginBottom:-40
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
    borderLogo:{
      width:50,
      height:50,
      backgroundColor:"#fff",
      justifyContent:"center",
      alignItems:"center",
      borderRadius:50
    }
    
  });
  
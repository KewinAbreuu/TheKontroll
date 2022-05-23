

import react, {useState, useEffect} from "react";
import {StyleSheet,SafeAreaView, StatusBar, Text, TextInput }from 'react-native'

import Header from "../../components/Header";

import AsyncStorage from '@react-native-async-storage/async-storage';




export default function UserPerfil({navigation}){

    const [empresa, setEmpresa]= useState(null);
    const [funcionario, setFuncionario]= useState(null);
    const [cargo, setCargo]= useState(null);

    useEffect(()=>{
        getData()
    },[])

    const getData = async () => {
          const empresa = await AsyncStorage.getItem('Empresa')
          const funcionario = await AsyncStorage.getItem('Funcionario')
          const cargo = await AsyncStorage.getItem('Cargo')
         if(empresa !== null){
            setEmpresa(empresa)
         }if(funcionario !== null){
            setFuncionario(funcionario)
         }if(cargo !== null){
            setCargo(cargo)
         }
      }

    

    return(
    <>
    <StatusBar/>
    <Header/>
        <SafeAreaView style={styles.container} > 
            <Text style={{color:"#000", fontSize:20,fontWeight:"bold", marginBottom:30}}>Configurações</Text>

            <Text style={styles.texto}>Empresa:</Text>
            <TextInput placeholder={empresa} style={styles.input} editable={false} selectTextOnFocus={false} ></TextInput>
            <Text style={styles.texto}>Funcionário:</Text>
            <TextInput placeholder={funcionario} style={styles.input} editable={false} selectTextOnFocus={false} ></TextInput>
            <Text style={styles.texto}>Cargo:</Text>
            <TextInput placeholder={cargo} style={styles.input} editable={false} selectTextOnFocus={false} ></TextInput>
        </SafeAreaView>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop:30,
    },
    input:{
        backgroundColor:"#cdcdcd",
        width:"90%",
        padding:10,
        borderRadius:10,
        marginBottom:20
    },
    texto:{
        alignSelf:"flex-start",
        marginLeft:30,
        fontSize:16,
        color:"#000",
        marginBottom:5
    }
    
  });
  
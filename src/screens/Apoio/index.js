import react, {useState, useEffect} from "react";
import {StyleSheet,SafeAreaView, StatusBar, Linking, ScrollView, Text, Image, TouchableOpacity, TextInput }from 'react-native'


import Header from "../../components/Header";

import AsyncStorage from '@react-native-async-storage/async-storage';

import CardApoio from "../../components/CardApoio";
import Ronda from  '../../assets/ronda.png'
import Sindico from '../../assets/sindico.png'
import Bombeiro from '../../assets/bombeiro.png'
import Police from '../../assets/police.png'
import Samu from '../../assets/samu.png'

import firebase from '../../firebaseConnection'

export default function Apoio({navigation}){

    const [funcionario, setFuncionario]= useState(null);
    const [funcionarioName, setFuncionarioName]= useState(false);

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



    function HandlleSindico(){
        Linking.openURL(`tel:+5582981129518`);
    }

    function HandlleBombeiro(){
        Linking.openURL(`tel:193`);
    }

    function HandllePolice(){
        Linking.openURL(`tel:190`);
    }

    function HandlleSamu(){
        Linking.openURL(`tel:192`);
    }

    return(
    <>
    <StatusBar/>
    <Header/>
        <SafeAreaView style={styles.container} > 
            <ScrollView style={styles.containerScroll}>

                <Text style={{alignSelf:"center", fontSize:26}}>Solicitar Apoio</Text>
                <Text style={{fontSize:16, color:"#4169E1", alignSelf:"center"}}>The Kontroll</Text>

                <CardApoio name="Supervisor" icon={Sindico}  press={HandlleSindico}/>
                <CardApoio name="Seguranças" icon={Ronda}  press={HandlleSindico}/>
                <CardApoio name="Bombeiro" icon={Bombeiro} press={HandlleBombeiro} />
                <CardApoio name="Samu" icon={Samu} press={HandlleSamu} />
                <CardApoio name="Policia" icon={Police} press={HandllePolice} />

                <Text style={{alignSelf:"center", fontSize:26, marginTop:50}}></Text>
                
            </ScrollView>
        </SafeAreaView>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    containerScroll: {
        flex: 1 ,
        width:"100%",
        backgroundColor: '#fff',
        marginTop:0,
        paddingTop:30},

  });
  
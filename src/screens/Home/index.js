import react, {useState, useEffect} from "react";
import {StyleSheet,SafeAreaView, StatusBar, Linking, ScrollView, Text, Image, TouchableOpacity, TextInput }from 'react-native'

import Card from "../../components/Card";
import Card2 from '../../components/CardHome2'


import Ronda from "../../assets/ronda.png"
import Ocorrencia from "../../assets/ocorrencia.png"
import Adm from '../../assets/adm.png'
import Suport from '../../assets/suport.png'
import Config from '../../assets/config.png'
import Replace from '../../assets/replace.png'
import Star from '../../assets/star.png'
import Draw from '../../assets/bg2.png'

import BtnFluter from '../../components/BtnFlutter'
import WebL from '../../assets/web.png'

import Header from "../../components/Header";

import AsyncStorage from '@react-native-async-storage/async-storage';

import firebase from '../../firebaseConnection'

export default function Home({navigation}){

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


    function PageScan(){
        navigation.navigate('Ronda')
    }

    function Ocorrencias(){
        navigation.navigate('Ocorrencia')
    }

    function IrAdm(){
        navigation.navigate('Adm')
    }

    function Web(){
        Linking.openURL(`https://shimmering-pithivier-dbee84.netlify.app`);
    }
 
    function Perfil(){
        navigation.navigate('UserPerfil')
    }

    function SuporteWhats(){
        Linking.openURL(`https://api.whatsapp.com/send?phone=5582981129518&text=Preciso%20de%20Ajuda!`);
    }

    function Avaliacao(){
        alert('Avaliação')
    }

    function Plantao(){
        navigation.navigate('Plantao')
    }

    // function REMOVEASYNC(){
    //     AsyncStorage.removeItem('Empresa')
    // }

    return(
    <>
    <StatusBar/>
    <Header/>
        <SafeAreaView style={styles.container} > 
        <ScrollView style={styles.containerScroll}>

            <Text style={{marginLeft:20, fontSize:26}}>Olá,</Text>
            <Text style={{marginLeft:20, fontSize:26, fontWeight:"bold"}}>{funcionario}</Text>
            <Text style={{marginLeft:20, fontSize:16, color:"#4169E1"}}>Condomínio Life Kontroll</Text>

            <SafeAreaView style={styles.banner}>
                <Image source={Draw} style={{width:270, height:170}}/>
            </SafeAreaView>
        
            <TouchableOpacity style={styles.search} onPress={SuporteWhats}>
                <Text style={{fontWeight:"bold"}}> Precisa de Ajuda? </Text>
                <Image source={Suport} style={{width:30,height:30}}/>
            </TouchableOpacity>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:"95%",marginLeft:7, marginBottom:20 }}>
                {/* <Card name={"REMOVER EMPRESA"} icon={Ronda} press={REMOVEASYNC}/> */}
                <Card name={"Vigilante"} icon={Ronda} press={PageScan}/>
                <Card name={"Livro de ocorrências"} icon={Ocorrencia} press={Ocorrencias}/>
                <Card name={"Avaliação"} icon={Star} press={Avaliacao}/>
                {/* <Card name={"Configurações"} icon={Config} press={Perfil}/> */}
            </ScrollView>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:"95%",marginLeft:7, marginBottom:20 }}>
                <Card2 name='Trocar Plantão' icon={Replace} press={Plantao}/>
                <Card2 name='Adm' icon={Adm} press={IrAdm}/>
                <Card2 name='Configurações' icon={Config} press={Perfil}/>
            </ScrollView>
            
            
        </ScrollView>
            <BtnFluter press={Web} icon={WebL}/>
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
        width:"105%",
        backgroundColor: '#fff',
        marginTop:0,
        paddingTop:30},
    
    banner:{
        width:"93%",
        height:180,
        backgroundColor: '#4169E1',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius:20,
        marginLeft:7,
        marginTop:10
    },
    search:{
        flexDirection:"row",
        width:"93%",
        height:50,
        backgroundColor: '#BFBFBF',
        alignItems: 'center',
        justifyContent: "space-between",
        borderRadius:10,
        paddingHorizontal:10,
        marginLeft:7,
        marginBottom:20,
        marginTop:20
    }
  });
  
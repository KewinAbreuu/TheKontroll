import react, {useState, useEffect} from "react";
import {StyleSheet,SafeAreaView, StatusBar, Linking, ScrollView, Text, Image, TouchableOpacity, TextInput }from 'react-native'

import Card from "../../components/Card";
import Card2 from '../../components/CardHome2'
import CardRed from '../../components/CardRed'


import Ronda from "../../assets/ronda.png"
import OcorrenciaImg from "../../assets/ocorrencia.png"
import Adm from '../../assets/adm.png'
import Suport from '../../assets/suport.png'
import Config from '../../assets/config.png'
import Replace from '../../assets/replace.png'
import Star from '../../assets/star.png'
import Draw from '../../assets/bg2.png'
import Sirene from '../../assets/sirene.png'
import Calendar from '../../assets/calendar.png'
import ApoioImg from '../../assets/apoio.png'
import Devices from '../../assets/devices.png'
import Mail from '../../assets/mail.png'

import BtnFluter from '../../components/BtnFlutter'
import WebL from '../../assets/web.png'

import Header from "../../components/Header";

import AsyncStorage from '@react-native-async-storage/async-storage';

import firebase from '../../firebaseConnection'

import * as Animatable from 'react-native-animatable';


export default function Home({navigation}){

    const [funcionario, setFuncionario]= useState(null);
    const [funcionarioName, setFuncionarioName]= useState(false);
    const [nameCondomino, setNameCondominio] =useState()

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


    function PageScan(){
        navigation.navigate('Ronda')
    }

    function Ocorrencias(){
        navigation.navigate('ListOcorrencia')
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

    function Correspondencia(){
        navigation.navigate('Correspondencia')
    }

    function Plantao(){
        navigation.navigate('ScanPlantao')
    }

    function Panico(){
        Linking.openURL(`tel:190`);
    }


    function Apoio(){
        navigation.navigate('Apoio')
    }

    function Reservas(){
        navigation.navigate('Reservas')
    }

    function Dispositivos(){
        navigation.navigate('Dispositivos')
    }
    // 
    function REMOVEASYNC(){
        AsyncStorage.removeItem('Empresa')
    }



    return(
    <>
    <StatusBar/>
    <Header/>
        <SafeAreaView style={styles.container} > 
        <ScrollView style={styles.containerScroll}>

            <Animatable.Text animation="fadeIn" duration={4000} delay={1000}  useNativeDriver={true}
             style={{marginLeft:20, fontSize:26}}>Olá,</Animatable.Text>
            <Animatable.Text animation="fadeIn" duration={4000} delay={2000} useNativeDriver={true}
             style={{marginLeft:20, fontSize:26, fontWeight:"bold"}}>{funcionario}</Animatable.Text>
            <Text style={{marginLeft:20, fontSize:16, color:"#4169E1"}}>{nameCondomino}</Text>

            <SafeAreaView style={styles.banner}>
                <Image source={Draw} style={{width:270, height:170}}/>
            </SafeAreaView>

            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" duration={2500}  useNativeDriver={true}>
              <TouchableOpacity style={styles.search} onPress={SuporteWhats}>
              <Text style={{fontWeight:"bold", color:"#fff"}}> Precisa de Ajuda? </Text>
              <Image source={Suport} style={{width:30,height:30}}/>
             </TouchableOpacity>
            </Animatable.View>
           

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:"95%",marginLeft:7, marginBottom:20 }}>
                <Card name={"Ronda   "} icon={Ronda} press={PageScan}/>
                <Card name={"Livro de ocorrências"} icon={OcorrenciaImg} press={Ocorrencias}/>
                <Card name={"Dispositivos"} icon={Devices} press={Dispositivos}/>
                <Card name={"Reservas"} icon={Calendar} press={Reservas}/>
                <Card name={"Correspondência"} icon={Mail} press={Correspondencia}/>
                <Card name={"Solicitar apoio"} icon={ApoioImg} press={Apoio}/>
                {/* <Card name={"REMOVER EMPRESA"}  press={REMOVEASYNC}/> */}

            </ScrollView>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:"95%",marginLeft:7, marginBottom:20 }}>
                <Card2 name='Trocar Plantão' icon={Replace} press={Plantao}/>
                <Card2 name='Adm' icon={Adm} press={IrAdm}/>
                <CardRed name='Pânico' icon={Sirene} press={Panico}/>
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
  
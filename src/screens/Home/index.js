import react, {useState, useEffect} from "react";
import {StyleSheet,SafeAreaView, StatusBar, Linking, ScrollView, Text, Image, TouchableOpacity,View, Appearance  }from 'react-native'

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

import Header from "../../components/HeaderHome";

import AsyncStorage from '@react-native-async-storage/async-storage';

import firebase from '../../firebaseConnection'

import * as Animatable from 'react-native-animatable';

import PopAction from "../../components/PopAction";


export default function Home({navigation}){

    const [funcionario, setFuncionario]= useState(null);
    const [funcionarioName, setFuncionarioName]= useState(false);
    const [nameCondomino, setNameCondominio] =useState()

    const [estado, setEstado]=useState(true)


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
    {/* {estado ===true && <PopAction/>  } */}
    <Header navigation={navigation}/>
    
    <ScrollView>
        <View style={styles.container } > 
            <View style={{marginTop:20}}>
                <Animatable.Text animation="fadeIn" duration={4000} delay={1000}  useNativeDriver={true}
                style={styles.texto1}>Olá,</Animatable.Text>
                <Animatable.Text animation="fadeIn" duration={4000} delay={2000} useNativeDriver={true}
                style={styles.texto2}>{funcionario}</Animatable.Text>
                <Text style={{marginLeft:20, fontSize:16, color:"#4169E1"}}>{nameCondomino}</Text>
            </View>
        
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" duration={2500}  useNativeDriver={true}>
              <TouchableOpacity style={styles.search} onPress={SuporteWhats}>
              <Text style={{fontWeight:"bold", color:"#fff"}}> Precisa de Ajuda? </Text>
              <Image source={Suport} style={{width:30,height:30}}/>
             </TouchableOpacity>
            </Animatable.View>

            <View style={styles.viewCards}>
                <Card name={"Ronda   "} icon={Ronda} press={PageScan}/>
                <Card name={"Ocorrências"} icon={OcorrenciaImg} press={Ocorrencias}/>
                <Card name={"Solicitar apoio"} icon={ApoioImg} press={Apoio}/>
            </View>

            <View style={styles.viewCards}>
                <Card name={"Reservas"} icon={Calendar} press={Reservas}/>
                <Card name={"Correspondências"} icon={Mail} press={Correspondencia}/>
                <Card name={"Dispositivos"} icon={Devices} press={Dispositivos}/>
            </View>
{/* 
            <View style={styles.viewCards}>
                <Card name={"Trocar Plantão"} icon={Replace} press={Plantao}/>
            </View>
       
            <View style={styles.viewCards}>
                <Card name={"Adm"} icon={Adm} press={IrAdm}/>
                <Card name={"Configurações"} icon={Config} press={Perfil}/>
                <Card name={"Pânico"} icon={Sirene} press={Panico}/>
            </View>
             */}
            
        </View>
        </ScrollView>
        <BtnFluter press={Web} icon={WebL}/>
    </>
    )
}
const colorScheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      flexDirection:"column",
      backgroundColor:colorScheme==="light"?"#222222":"#222222",
      marginTop:-20,
      zIndex:8,
      paddingTop:60,
      paddingBottom:"50%"
    },
    viewCards:{
        flexDirection:"row",
        marginBottom:10,
        marginLeft:10,
    },
    search:{
        flexDirection:"row",
        width:"97%",
        height:60,
        backgroundColor:colorScheme==="light"?"#4c4c4c":"#4c4c4c",
        alignItems: 'center',
        justifyContent: "space-between",
        borderRadius:50,
        paddingHorizontal:10,
        marginLeft:5,
        marginBottom:20,
        marginTop:20,
        // tes
    },
    texto1:{
     marginLeft:20,
     fontSize:26,
     color:colorScheme==="light"?"#fff":"#fff",
    },
    texto2:{
        color:colorScheme==="light"?"#fff":"#fff",
        marginLeft:20,
        fontSize:26,
        fontWeight:"bold"
    }
   
  });
  
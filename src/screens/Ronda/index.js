import react, {} from "react";
import {StyleSheet,SafeAreaView, StatusBar,Text, View, Image}from 'react-native'
import BtnFlutter from "../../components/BtnFlutter";

import Header from "../../components/Header";

import Ronda2 from '../../assets/ronda2.png'

import Cruz from '../../assets/cruz.png'

import * as Animatable from 'react-native-animatable';


export default function Ronda({navigation}){

    function OpenScan(){
        navigation.navigate('Scan')
    }

    return(
    <>
    <StatusBar/>
    <Header/>
        <SafeAreaView style={styles.container} >

            <Animatable.Text  animation="zoomIn" duration={500} delay={500} useNativeDriver={true}
            style={styles.textoRonda}>1° Passo - Presione o botao no canto inferior direito.</Animatable.Text>

             <Animatable.Text  animation="zoomIn" duration={500} delay={1000} useNativeDriver={true}
              style={styles.textoRonda}>2° Passo - Leia o QR Code.</Animatable.Text>

             <Animatable.Text  animation="zoomIn" duration={500} delay={1500} useNativeDriver={true}
             style={styles.textoRonda}>3° Passo - Após selecionado pressione enviar.</Animatable.Text>

            <BtnFlutter press={OpenScan} icon={Cruz}/>

            <Animatable.View animation="slideInDown" iterationCount="infinite" direction="alternate" duration={1500}  useNativeDriver={true}
             style={styles.fotoRonda}>
                <Image source={Ronda2} style={styles.imageRonda2}/>
            </Animatable.View>
        </SafeAreaView>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop:50
    },
    textoRonda:{
        fontSize:20,
        color:"#000",
        marginBottom:15,
        marginTop:30,
        fontWeight:"bold"
    },
    fotoRonda:{
        width:"95%",
        justifyContent:"center",
        alignItems:"center",
        marginTop:45
    },
    imageRonda2:{
        width: 450,
        resizeMode: 'contain',

        
    }
    
  });
  
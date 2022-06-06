import react, {} from "react";
import {StyleSheet,SafeAreaView, StatusBar,Text, View, Image, Appearance}from 'react-native'
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

            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" duration={2500}  useNativeDriver={true}
             style={styles.fotoRonda}>
                <Image source={Ronda2} style={styles.imageRonda2}/>
            </Animatable.View>
        </SafeAreaView>
    </>
    )
}
const colorScheme = Appearance.getColorScheme();


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:colorScheme==="light"?"#222":"#222",
      alignItems: 'center',
      paddingTop:50
    },
    textoRonda:{
        fontSize:20,
        color:colorScheme==="light"?"#FFF":"#FFF",
        marginBottom:15,
        marginTop:30,
        fontWeight:"bold"
    },
    fotoRonda:{
        width:"95%",
        justifyContent:"center",
        alignItems:"center",
        marginTop:20
    },
    imageRonda2:{
        width: 450,
        resizeMode: 'contain',

        
    }
    
  });
  
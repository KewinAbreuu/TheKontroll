import react, {} from "react";
import {StyleSheet,SafeAreaView, StatusBar,Text, View, Image}from 'react-native'
import BtnFlutter from "../../components/BtnFlutter";

import Header from "../../components/Header";

import Ronda2 from '../../assets/ronda2.png'

import Cruz from '../../assets/cruz.png'

export default function Ronda({navigation}){

    function OpenScan(){
        navigation.navigate('Scan')
    }

    return(
    <>
    <StatusBar/>
    <Header/>
        <SafeAreaView style={styles.container} > 
            <Text style={styles.textoRonda}>1° Passo - Presione o botao no canto inferior direito.</Text>
            <Text style={styles.textoRonda}>2° Passo - Leia o QR Code.</Text>
            <Text style={styles.textoRonda}>3° Passo - Após selecionado pressione enviar.</Text>

            <BtnFlutter press={OpenScan} icon={Cruz}/>

            <View style={styles.fotoRonda}>
                <Image source={Ronda2} style={styles.imageRonda2}/>
            </View>
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
        alignItems:"center"
    },
    imageRonda2:{
        width: 450,
        resizeMode: 'contain',

        
    }
    
  });
  
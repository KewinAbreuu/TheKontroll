import react, {} from "react";
import {StyleSheet,SafeAreaView, StatusBar,Text, View, Image}from 'react-native'
import BtnFlutter from "../../components/BtnFlutter";

import Header from "../../components/Header";

import Card from "../../components/Card"

import firebase from "../../firebaseConnection";

import * as Animatable from 'react-native-animatable';


export default function Dispositivos({navigation}){

    function Ligar(){
        firebase.database().ref('/').update({
            L1:'0'
          });
    }

    function desligar(){
        firebase.database().ref('/').update({
            L1:'1'
          });
    }

    return(
    <>
    <StatusBar/>
    <Header/>
        <SafeAreaView style={styles.container} >
            <Text>Dispositivos</Text>

            <View style={{flexDirection:"row", marginTop:20}}>
                <Card name="On" press={Ligar}/>
                <Card name="Off" press={desligar}/>
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
    
  });
  
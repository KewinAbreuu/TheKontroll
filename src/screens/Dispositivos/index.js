import react, {useState,useEffect} from "react";
import {StyleSheet,SafeAreaView, StatusBar,Text, View, ScrollView}from 'react-native'
import BtnFlutter from "../../components/BtnFlutter";

import Header from "../../components/Header";

import Card from "../../components/Devices"
import CardFIXO from '../../components/Card'

import firebase from "../../firebaseConnection";

import Btnf from "../../components/BtnFlutter"

import Cruz from "../../assets/cruz.png"

import Icon from "../../assets/Logo.png"

import * as Animatable from 'react-native-animatable';


export default function Dispositivos({navigation}){

    const [posts, setPosts]=useState([])

    useEffect(()=>{
        function loadPost(){
  
          firebase.firestore().collection('devices')
        .onSnapshot((doc)=>{
          let meusPosts=[];
  
          doc.forEach((item)=>{
            meusPosts.push({
              id:item.id,
              Name: item.data().name,
              Comando: item.data().comando,
            })
          });
          
  
          setPosts(meusPosts)
  
        })
  
      }
      
      loadPost();
  
    },[])

    function AddDevice(){
        navigation.navigate('AddDevice')
    }

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

            <Text style={{color:"#000", fontSize:20,fontWeight:"bold", marginBottom:30, alignSelf:"center"}}>Dispositivos</Text>
            <ScrollView style={styles.containerScroll}>
              {/* CASA PARIPUEIRA */}
             <Text style={{color:"#000",fontWeight:"bold", marginBottom:20, alignSelf:"center"}}>Casa_Paripueira</Text>
                <View style={{flexDirection:"row", marginBottom:20}}>
                  <CardFIXO name="On" icon={Icon}  press={Ligar} />
                  <CardFIXO name="Off" icon={Icon}  press={desligar} />
                </View>
              {/* CASA PARIPUEIRA */}

                    {posts.map((post)=>{
                        return(
                        <View style={{flexDirection:"row", marginTop:20}}>
                            <Card name={post.Name} on="On" off="Off" comando={post.Comando}  pressOff="Desligar" />
                        </View>
                        )
                    })}

          </ScrollView>
            <Btnf icon={Cruz} press={AddDevice}/>
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
    containerScroll: {
        flex: 1 ,
        // width:"100%",
        backgroundColor: '#fff',
        marginTop:0,
    }
    
  });
  
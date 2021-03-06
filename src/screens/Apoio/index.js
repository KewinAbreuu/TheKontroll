import react, {useState, useEffect} from "react";
import {StyleSheet,SafeAreaView, StatusBar, ScrollView, Text,Appearance }from 'react-native'


import Header from "../../components/Header";

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from 'react-native-animatable';

import firebase from '../../firebaseConnection'

import Card from '../../components/CardApoio'

export default function Correspondencia({navigation}){


    const [posts, setPosts]=useState([])

    useEffect(()=>{
          function loadPost(){
    
            firebase.firestore().collection('apoio')
          .orderBy('DataCreat','desc')
          .onSnapshot((doc)=>{
            let meusPosts=[];
    
            doc.forEach((item)=>{
              meusPosts.push({
                id:item.id,
                Nome: item.data().Nome,
                Contato: item.data().Contato
              })
            });
            
    
            setPosts(meusPosts)
    
          })
    
        }
        
        loadPost();
    
      },[])

    

    return(
    <>
    
    <StatusBar/>
    <Header/>
        <SafeAreaView style={styles.container} > 
            <ScrollView style={styles.containerScroll}>

            <Text style={styles.texto}>Solicitar Apoio</Text>
                   
          {posts.map((post)=>{
            
            return(
                <Card key={post.id}
                id={post.id}
                name={post.Nome}
                contato={post.Contato}
                />
            )
          })}
                
            </ScrollView>
        </SafeAreaView>
    </>
    )
}

const colorScheme = Appearance.getColorScheme();


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    containerScroll: {
        flex: 1 ,
        width:"100%",
        backgroundColor:colorScheme==="light"?"#222":"#222",
        marginTop:0,
        paddingTop:30},

    input:{
            backgroundColor:"#cdcdcd",
            width:"80%",
            padding:10,
            borderRadius:10, 
            justifyContent:"center"
            // alignSelf:"center"
        },
    
    inputForm:{
        backgroundColor:"#cdcdcd",
            width:"92%",
            padding:10,
            borderRadius:10, 
            justifyContent:"center"
    },
    texto:{
      color:colorScheme==="light"?"#fff":"#fff",
      fontSize:20,
      fontWeight:"bold",
      marginBottom:20,
      alignSelf:"center"
    },
      paragraph: {
        marginTop:10,
        marginBottom:20,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color:"#000"
      },
      BtnTroca:{
        width:300,
        height:56,
        backgroundColor:"#4169E1",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:30,
        marginTop:20,
        marginBottom:50,
        alignSelf:"center"
    },
    viewInput:{
        width:"100%", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:20
    }

  });
  
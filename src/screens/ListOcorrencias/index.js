import react, {useState, useEffect} from "react";
import {StyleSheet,SafeAreaView, StatusBar, ScrollView, Text, TextInput, Button, Platform, View, TouchableOpacity, Image, FlatList, Alert }from 'react-native'


import Header from "../../components/Header";

import * as Animatable from 'react-native-animatable';

import firebase from '../../firebaseConnection'

import Card from '../../components/CardOcorrencia'

import BtnFlutter from '../../components/BtnFlutter'

import Cruz from '../../assets/cruz.png'

export default function ListOcorrencia({navigation}){


    const [posts, setPosts]=useState([])

    useEffect(()=>{
          function loadPost(){
    
            firebase.firestore().collection('ocorrencias')
          .orderBy('Data','desc')
          .onSnapshot((doc)=>{
            let meusPosts=[];
    
            doc.forEach((item)=>{
              meusPosts.push({
                id:item.id,
                Titulo: item.data().Titulo,
                Tipo: item.data().Tipo,
                Descricao: item.data().Descricao,
                Bloco: item.data().Bloco,
                Cargo: item.data().Cargo,
                Date: item.data().Date,
                Funcionario: item.data().Funcionario,
                Hora: item.data().Hora,
              })
            });
            
    
            setPosts(meusPosts)
    
          })
    
        }
        
        loadPost();
    
      },[])

    
    function AddOcorrencia(){
      navigation.navigate('Ocorrencia')
    }

    return(
    <>
    
    <StatusBar/>
    <Header/>
        <SafeAreaView style={styles.container} > 
            <ScrollView style={styles.containerScroll}>

            <Text style={{color:"#000", fontSize:20,fontWeight:"bold", marginBottom:20, alignSelf:"center"}}>Livro de Ocorrências</Text>
                   
          {posts.map((post)=>{
            
            return(
                <Card key={post.id}
                id={post.id}
                Titulo={post.Titulo}
                Tipo={post.Tipo}
                Descricao={post.Descricao}
                Bloco={post.Bloco}
                Cargo={post.Cargo}
                Funcionario={post.Funcionario}
                Hora={post.Hora}
                Date={post.Date}
                />
            )
          })}
                
            </ScrollView>
            <BtnFlutter press={AddOcorrencia} icon={Cruz}/>
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
        alignSelf:"flex-start",
        marginLeft:20,
        fontSize:16,
        color:"#000",
        marginBottom:5
    },

    containerSelect: {
      
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
  
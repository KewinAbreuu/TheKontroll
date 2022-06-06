import react, {useState, useEffect} from "react";
import {StyleSheet,SafeAreaView, StatusBar,Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert, Appearance}from 'react-native'

import Header from "../../components/Header";

import {KeyboardAvoidingView} from 'react-native';

import firebase from '../../firebaseConnection';

import * as Animatable from 'react-native-animatable';

import { RadioButton} from 'react-native-paper';


export default function AddDevice({navigation}){

    const [name,setName] = useState();
    const [value, setValue] = useState('D1');


      function HandlleOcorrencia(){
         firebase.firestore().collection('devices')
        .add({
            name:name,
            comando:value
        })
        .then(()=>{
            Alert.alert(
            'TheKontroll',
            'Dispositivo Adicionado com Sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Dispositivos')
        },
      ],
        )
            // navigation.navigate('Home')
        })
        .catch((e)=>{
            alert(e)
        })

      }

    return(
    <>
    <StatusBar/>
    <Header/>
    <ScrollView >
        <SafeAreaView style={styles.container} > 
    
         <Text style={styles.Titulo}>Adicionar Dispositivo</Text>


            <Animatable.View animation="fadeIn"   duration={2500} useNativeDriver={true} delay={300}>

                <Text style={styles.texto}>Nome:</Text>
                <TextInput style={styles.input} placeholder="Escolha um nome para o dispositivo" onChangeText={setName}  value={name}></TextInput>
                
                <Text style={styles.texto}>Dispositivo:</Text>
                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                    <View style={{flexDirection:"row", marginBottom:30}}>
                        <Animatable.View animation="fadeInRightBig"   duration={800} useNativeDriver={true} delay={0} style={styles.btnRadio}>
                            <RadioButton value="D1"  color="#4169E1"  uncheckedColor="#cdcdcd"/>
                            <Text style={styles.texto2}>D1</Text>
                        </Animatable.View>
                        <Animatable.View animation="fadeInRightBig"   duration={800} useNativeDriver={true} delay={100} style={styles.btnRadio}>
                            <RadioButton value="D2"  color="#4169E1"  uncheckedColor="#cdcdcd"/>
                            <Text style={styles.texto2}>D2</Text>
                        </Animatable.View>
                        <Animatable.View animation="fadeInRightBig"   duration={800} useNativeDriver={true} delay={200} style={styles.btnRadio}>
                            <RadioButton value="D3"  color="#4169E1"  uncheckedColor="#cdcdcd"/>
                            <Text style={styles.texto2}>D3</Text>
                        </Animatable.View>
                        <Animatable.View animation="fadeInRightBig"   duration={800} useNativeDriver={true} delay={300} style={styles.btnRadio}>
                            <RadioButton value="D4"  color="#4169E1"  uncheckedColor="#cdcdcd"/>
                            <Text style={styles.texto2}>D4</Text>
                        </Animatable.View>
                    </View>
                </RadioButton.Group>

                <TouchableOpacity style={styles.BtnTroca} onPress={HandlleOcorrencia} >
                    <Text style={{color:"#fff"}}>Adicionar</Text>
                </TouchableOpacity>
            </Animatable.View>
               
        </SafeAreaView>
    </ScrollView>
    </>
    )
}

const colorScheme = Appearance.getColorScheme();


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:colorScheme==="light"?"#222":"#222",
      alignItems: 'center',
      paddingTop:50,
    },
     input:{
        backgroundColor:"#cdcdcd",
        width:300,
        padding:10,
        borderRadius:10,
        marginBottom:20
    },
   
    texto:{
        alignSelf:"flex-start",
        fontSize:16,
        color:colorScheme==="light"?"#fff":"#fff",
        marginBottom:5
    },
    
    texto2:{
        alignSelf:"flex-start",
        color:colorScheme==="light"?"#fff":"#fff",
        marginBottom:5,
        marginLeft:10
    },
    BtnTroca:{
        width:300,
        height:56,
        backgroundColor:"#4169E1",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:30,
        marginTop:15,
        marginBottom:400,
        alignSelf:"center"
    },
    btnRadio:{
        marginRight:30,
    },
    Titulo:{
        color:colorScheme==="light"?"#fff":"#fff",
        fontSize:20,
        fontWeight:"bold",
        marginBottom:30,
        alignSelf:"center"
    }
    
  });
  
import react, {useState, useEffect} from "react";
import {StyleSheet,SafeAreaView, StatusBar,Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert}from 'react-native'
import BtnFlutter from "../../components/BtnFlutter";

import Header from "../../components/Header";

import AsyncStorage from '@react-native-async-storage/async-storage';

import {KeyboardAvoidingView} from 'react-native';

export default function Plantao({navigation}){

    const [empresa, setEmpresa]= useState(null);
    const [funcionario, setFuncionario]= useState(null);
    const [cargo, setCargo]= useState(null);
    const [adm, setAdm]= useState(null);
    const [cAdm, setCAdm]= useState(null);

    useEffect(()=>{
        getData()
    },[])

    const getData = async () => {
          const empresa = await AsyncStorage.getItem('Empresa')
          const funcionario = await AsyncStorage.getItem('Funcionario')
          const cargo = await AsyncStorage.getItem('Cargo')
         if(empresa !== null){
            setEmpresa(empresa)
         }if(funcionario !== null){
            setFuncionario(funcionario)
         }if(cargo !== null){
            setCargo(cargo)
         }
      }


    async function UpdatePlantao(){
         if(adm !== null){
            if(adm==='251225'){
                if(cAdm===adm){
                    await AsyncStorage.setItem('Empresa', empresa)
                    await AsyncStorage.setItem('Funcionario', funcionario )
                    await AsyncStorage.setItem('Cargo', cargo )

                    // 
                    Alert.alert(
                        'TheKontroll',
                        'Plantão Trocado com Sucesso!', [
                        {
                          text: 'OK',
                          onPress: () => navigation.navigate('Home')
                        },
                      ],
                        )
                    // 
                   
                }else{
                    // 
                    Alert.alert(
                        'TheKontroll',
                        'As senhas não Corespondem!', [
                        {
                          text: 'OK',
                        },
                      ],
                        )
                    // 
                }

             }else{
                 // 
                 Alert.alert(
                    'TheKontroll',
                    'Senha Adm Incorreta :(', [
                    {
                      text: 'OK',
                    },
                  ],
                    )
                // 
                }
         }else{
             // 
             Alert.alert(
                'TheKontroll',
                'Insira a Senha Adm', [
                {
                  text: 'OK',
                },
              ],
                )
            // 
            }
         
    }

    return(
    <>
    <StatusBar/>
    <Header/>
    <ScrollView>
        <SafeAreaView style={styles.container} > 
        <Text style={{color:"#000", fontSize:20,fontWeight:"bold", marginBottom:30}}>Trocar Plantão</Text>
    
    <KeyboardAvoidingView contentContainerStyle={{width:300, flex:1}} behavior="position" enabled>
            <Text style={styles.texto}>Empresa:</Text>
            <TextInput placeholder={empresa} style={styles.input} editable={false} selectTextOnFocus={false} ></TextInput>
            <Text style={styles.texto}>Funcionário:</Text>
            <TextInput placeholder={funcionario} style={styles.input} onChangeText={setFuncionario} value={funcionario} ></TextInput>
            <Text style={styles.texto}>Cargo:</Text>
            <TextInput placeholder={cargo} style={styles.input} onChangeText={setCargo} value={cargo}></TextInput>
            <Text style={styles.texto}>Adm:</Text>
            <TextInput placeholder="Password Adm" style={styles.input} keyboardType="numeric" onChangeText={setAdm} value={adm} secureTextEntry={true} ></TextInput>
            <Text style={styles.texto}>Confirm Adm:</Text>
            <TextInput placeholder="Confirm Password Adm" style={styles.input} keyboardType="numeric" onChangeText={setCAdm} value={cAdm} secureTextEntry={true} ></TextInput>

            <TouchableOpacity style={styles.BtnTroca} onPress={UpdatePlantao}>
                    <Text style={{color:"#fff"}}>Trocar Plantão</Text>
                </TouchableOpacity>
    </KeyboardAvoidingView>
               
        </SafeAreaView>
    </ScrollView>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop:50,
    },
    textoRonda:{
        fontSize:20,
        color:"#000",
        marginBottom:20,
        fontWeight:"bold"
    },
    fotoRonda:{
        width:"95%",
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"row"
    },
    imageRonda2:{
        width:75,
        height:75,
        
    }, 
     input:{
        backgroundColor:"#cdcdcd",
        width:"100%",
        padding:10,
        borderRadius:10,
        marginBottom:20
    },
    texto:{
        alignSelf:"flex-start",
        // marginLeft:20,
        fontSize:16,
        color:"#000",
        marginBottom:5
    },
    BtnTroca:{
        width:300,
        height:56,
        backgroundColor:"#4169E1",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:30,
        marginTop:20,
        marginBottom:5
    },
 
  });
  
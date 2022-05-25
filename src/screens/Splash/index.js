import react, {useEffect} from "react";
import {View,Text,  StyleSheet, Image, TouchableOpacity, Alert}from 'react-native'

import Logo from '../../assets/Logo.png'

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Splash({navigation}){

    useEffect(()=>{
        getData()
    },[])

    function SetSplash(){
        setTimeout(()=>{
          Alert.alert(
            'TheKontroll',
            'Configure Seu Aplicativo!', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('EmpresaConfig')
            },
          ],
            )
        },2000);
    }


    const getData = async () => {
        try {
          const empresa = await AsyncStorage.getItem('Empresa')
          if(empresa !== null) {
             navigation.navigate('Home')
          }else{
            SetSplash()
          }
        } catch(e) {
          alert('Erro')
          
        }
      }
      

      const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('Empresa', value)
        } catch (e) {
          // saving error
        }
      }

      function seta(){
        storeData("Empresa Undefined")
      }

     async function removeTeste(){
        await AsyncStorage.removeItem('Empresa')
      }


    return(
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo}/>
            <Text style={styles.tLogo}>The Kontroll</Text>
            {/* <TouchableOpacity onPress={removeTeste}><Text>Remover local</Text></TouchableOpacity>
            <TouchableOpacity onPress={seta}><Text>Setar local</Text></TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#202427',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
        width:180,
        height:180
    },
    tLogo:{
        alignSelf:"center",
        fontSize:20,
        fontWeight:"bold",
        color:"#fff",
        position:"absolute",
        bottom:20
        
    }
    
  });
  
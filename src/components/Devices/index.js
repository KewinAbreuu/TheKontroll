import react,{useState, useEffect}from 'react'
import {View,Text,  StyleSheet, Image, TouchableOpacity, Appearance}from 'react-native'

import firebase from "../../firebaseConnection";
import { Audio } from 'expo-av';


export default function Devices({on,off,pressOn,pressOff,name,comando,id, status}){
    const [sound, setSound] =useState();

    function Ligar(){
        
        firebase.database().ref(`/${comando}`).update({
            L1:'0'
            // L2:'0'
          });

          StatusOn()
          SoundOn()
    }

    function desligar(){
        firebase.database().ref(`/${comando}`).update({
            L1:'1'
            // L2:'1'S
          });

          StatusOff()
          SoundOn()
    }

   function StatusOn(){
       firebase.firestore().collection('devices')
       .doc(id)
       .update({
           status:"on"
       })
   }

   
   function StatusOff(){
    firebase.firestore().collection('devices')
    .doc(id)
    .update({
        status:"off"
    })
}

// AUDIO CLICK
async function SoundOn() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../../audios/mouseClick.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);
// AUDIO CLICK


    function Delete(){
        firebase.firestore().collection('devices')
        .doc(id)
        .delete()
    }
 

    return(
        <View style={{flexDirection:"column", justifyContent:"center", alignItems:"center", flex:1}}>
                <View style={status === 'off' ? {backgroundColor:"red", height:30, width:"100%", alignItems:"center", justifyContent:"flex-start", marginBottom:20, borderRadius:5, flexDirection:"row" ,marginRight:10}:
                                                 {backgroundColor:"green", height:30, width:"100%", alignItems:"center", justifyContent:"flex-start", marginBottom:20, borderRadius:5, flexDirection:"row" ,marginRight:10}}>
                     <TouchableOpacity onPress={Delete} style={{backgroundColor:"#fff", width:20,height:20,borderRadius:50,justifyContent:"center",alignItems:"center", marginRight:50, marginLeft:10}}>
                        <Text style={{fontWeight:"bold"}}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>{name}</Text>
                   
                </View>
                
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={styles.container} onPress={Ligar}>
                    <View style={styles.button}>
                        <Text style={{fontSize:16, color:"#fff", fontWeight:"bold"}}>{on}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container} onPress={desligar}>
                    <View style={styles.button}>
                        <Text style={{fontSize:16, color:"#fff", fontWeight:"bold"}}>{off}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const colorScheme = Appearance.getColorScheme();


const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      width:150,
      height:56,
      backgroundColor: '#4169E1',
      alignItems: 'center',
      justifyContent: "center",
      borderRadius:20,
      paddingHorizontal:10,
      marginRight:10,
    },
    button:{
        width:33,
        height:34,
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        // fontSize:16,
        color:colorScheme==="light"?"#fff":"#fff",
        fontWeight:"bold",
    }
    
  });
  
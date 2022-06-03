import {View,Text,  StyleSheet, Image, TouchableOpacity}from 'react-native'

import firebase from "../../firebaseConnection";


export default function Devices({on,off,pressOn,pressOff,name,comando}){

    
    function Ligar(){
        
        firebase.database().ref(`/${comando}`).update({
            // L1:'0'
            A:'0'
          });
    }

    function desligar(){
        firebase.database().ref(`/${comando}`).update({
            // L1:'1'
            A:'1'
          });
    }
   


    return(
        <View style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <Text style={{fontWeight:"bold", marginBottom:10}}>{name}</Text>
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

const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      width:76,
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
    }
    
  });
  
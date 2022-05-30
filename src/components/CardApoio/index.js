
import {View,Text,  StyleSheet, Image, TouchableOpacity, Linking}from 'react-native'

import firebase from '../../firebaseConnection'




export default function CardApoio({id,name,contato,press}){

    function Msg(){
        firebase.firestore().collection('moradores')
        .doc(id)
        Linking.openURL(`https://api.whatsapp.com/send?phone=${contato}&&text=Solicito%20Apoio!`);
    }

    function Ligar(){
        firebase.firestore().collection('moradores')
        .doc(id)
         Linking.openURL(`tel:${contato}`);
    }

    return(
        <TouchableOpacity style={styles.container} >
            
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", paddingHorizontal:20}} >
                <Text style={{fontSize:16, color:"#fff", fontWeight:"bold"}}>{name}</Text>

                <View style={{justifyContent:"center", flexDirection:"row"}}>
                    <TouchableOpacity style={styles.btn1} onPress={Ligar}>
                        <Text>Ligar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn1} onPress={Msg} >
                        <Text>Msg</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection:'column',
      width:'auto',
      height:76,
      backgroundColor: '#4169E1',
    //   alignItems: 'center',
      justifyContent: "center",
      borderRadius:20,
      paddingHorizontal:10,
      marginRight:10,
      marginBottom:20
    },
    btn1:{
        width:50,
        height:50,
        backgroundColor:"#fff",
        justifyContent:"center",
        alignItems:"center",
        marginRight:10
    }
    
  });
  

import {View,Text,  StyleSheet, Image, TouchableOpacity, Linking}from 'react-native'

import firebase from '../../firebaseConnection'




export default function CardCorresp({id,name,contato,press}){

    function EnviarCorresp(){
        firebase.firestore().collection('moradores')
        .doc(id)
         alert(contato)
         Linking.openURL(`tel:${contato}`);
    }

    return(
        <TouchableOpacity style={styles.container} onPress={EnviarCorresp}>
            
            <View style={{flexDirection:"row", alignItems:"center"}} >
                <Text style={{fontSize:16, color:"#fff", fontWeight:"bold"}}>{name}</Text>
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
      alignItems: 'center',
      justifyContent: "center",
      borderRadius:20,
      paddingHorizontal:10,
      marginRight:10,
      marginBottom:20
    },
    icon:{
        width:33,
        height:34,
        marginRight:10,
        resizeMode:"contain"
    }
    
  });
  
import react, {} from "react";
import {StyleSheet,TouchableOpacity, Image}from 'react-native'
import Position from "react-native/Libraries/Components/Touchable/Position";




export default function BtnFlutter({press, icon}){

    return(
    <>
        <TouchableOpacity style={styles.container} onPress={press} > 
            <Image source={icon} style={{width:30, height:30}}/>
        </TouchableOpacity>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
      width:52,
      height:52,
      backgroundColor: '#2F2E41',
      alignItems: 'center',
      justifyContent:"center",
      borderRadius:50,
      position:"absolute",
      bottom:50,
      right:20,
      zIndex:9
    },
    
  });
  
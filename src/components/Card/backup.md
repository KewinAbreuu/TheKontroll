import {View,Text,  StyleSheet, Image, TouchableOpacity}from 'react-native'



export default function Card({name, icon, press}){


    return(
        <TouchableOpacity style={styles.container} onPress={press}>
            
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <Image source={icon} style={styles.icon}/>
                <Text style={{fontSize:16, color:"#fff", fontWeight:"bold"}}>{name}</Text>
            </View>
            
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      width:'auto',
      height:76,
      backgroundColor: '#4169E1',
      alignItems: 'center',
      justifyContent: "center",
      borderRadius:20,
      paddingHorizontal:10,
      marginRight:10,
    },
    icon:{
        width:33,
        height:34,
        marginRight:10,
        resizeMode:"contain"
    }
    
  });
  
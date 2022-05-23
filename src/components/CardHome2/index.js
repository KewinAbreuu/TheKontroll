import {View,Text,  StyleSheet, Image, TouchableOpacity}from 'react-native'



export default function CardHome2({name, icon, press}){


    return(
        <TouchableOpacity style={styles.container} onPress={press}>
            
            <View style={{flexDirection:"column", alignItems:"center"}}>
                <Image source={icon} style={styles.icon}/>
                <Text style={{fontSize:16, color:"#fff", fontWeight:"bold"}}>{name}</Text>
            </View>
            
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection:'column',
      width:200,
      height:250,
      backgroundColor: '#4169E1',
      alignItems: 'center',
      justifyContent: "center",
      borderRadius:20,
      
      marginRight:10,
    },
    icon:{
        width:40,
        height:45,
        marginBottom:40,
        resizeMode:"contain"
    }
    
  });
  
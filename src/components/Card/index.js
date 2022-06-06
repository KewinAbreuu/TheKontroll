import {View,Text,  StyleSheet, Image, TouchableOpacity, Appearance}from 'react-native'



export default function Card({name, icon, press}){


    return(
        <TouchableOpacity style={styles.container} onPress={press}>
            
            <View style={{flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <View style={styles.borderCard}>
                     <Image source={icon} style={styles.icon}/>
                </View>
                <Text style={{fontSize:14, color:"#4678F2", fontWeight:"bold", marginTop:5}}>{name}</Text>
            </View>
            
            
        </TouchableOpacity>
    )
}

const colorScheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      flex:1,
      height:120,
    //   backgroundColor: '#fff',
      backgroundColor:colorScheme==="light"?"#1B1B1B":"#1B1B1B",
      alignItems: 'center',
      justifyContent: "center",
      borderRadius:20,
      marginRight:10,
      borderColor:"red",
      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    borderCard:{
        backgroundColor:"#707070",
        padding:10,
        borderRadius:50
    },
    icon:{
        width:33,
        height:33,
        resizeMode:"contain",
    }
    
  });
  
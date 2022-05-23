import {View,Text,  StyleSheet, Image, TouchableOpacity}from 'react-native'



export default function CardApoio({name, icon, press}){

    return(
        <TouchableOpacity style={styles.container} onPress={press} >
            
            <View style={styles.cont}>
                <Image source={icon} style={styles.icon}/>
                <Text style={{fontSize:26, color:"#fff", fontWeight:"bold"}}>{name}</Text>

            </View>

            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      width:"98%",
      height:100,
      backgroundColor:'#BFBFBF',
      alignItems: 'center',
      borderRadius:20,
      marginTop:10,
      marginLeft:5,
      paddingHorizontal:30
    },

    cont: {
        flexDirection:'row',
        width:"90%",
        alignItems: 'center',
        // justifyContent: "space-around",
        marginTop:10,
        marginRight:10,
      },
    icon:{
        width:45,
        height:50,
        resizeMode:"contain",
        marginRight:30
    },
    icon2:{
        width:30,
        height:35,
        resizeMode:"contain",
        marginRight:30,
    }
    
  });
  
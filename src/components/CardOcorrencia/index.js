
import {View,Text,  StyleSheet,TouchableOpacity, Linking, Alert}from 'react-native'

import firebase from '../../firebaseConnection'




export default function CardOcorrencia({id,Titulo,Tipo,Descricao,Bloco,Cargo,Funcionario,Date,Hora,press}){

    function Ver(){
        firebase.firestore().collection('ocorrencias')
        .doc(id)

        Alert.alert(
            'TheKontroll',
            `Descrição:\n${Descricao}\n\nBloco: ${Bloco}\nAutor: ${Cargo} ${Funcionario}\nData/Hora: ${Date} ${Hora}`, [
            {
              text: 'OK',
            //   onPress: () => navigation.navigate('ListOcorrencia')
            },
          ],
            )
    }


    return(
        <TouchableOpacity style={styles.container} >
            
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", paddingHorizontal:20}} >
                <Text style={{fontSize:16, color:"#fff", fontWeight:"bold"}}>{Titulo}</Text>
                    <Text style={{color:"#4169E1"}}>({Tipo})</Text>
                <View style={{justifyContent:"center", flexDirection:"row"}}>
                    <TouchableOpacity style={styles.btn1} onPress={Ver} >
                        <Text>Ver</Text>
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
      backgroundColor: '#4F4F4F',
    //   alignItems: 'center',
      justifyContent: "center",
    //   borderRadius:20,
      paddingHorizontal:10,
    //   marginLeft:10,
    //   marginRight:10,
      marginBottom:5
    },
    btn1:{
        width:50,
        height:50,
        backgroundColor:"#fff",
        justifyContent:"center",
        alignItems:"center",
        marginRight:10,
        borderRadius:10
    }
    
  });
  
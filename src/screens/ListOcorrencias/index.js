import react, {useState, useEffect} from "react";
import {StyleSheet,SafeAreaView, StatusBar, ScrollView, Text, TextInput, Button, Platform, View, TouchableOpacity, Image, FlatList, Alert }from 'react-native'


import Header from "../../components/Header";

import * as Animatable from 'react-native-animatable';

import firebase from '../../firebaseConnection'

import Card from '../../components/CardOcorrencia'

import BtnFlutter from '../../components/BtnFlutter'

import Cruz from '../../assets/cruz.png'

import Calendario from '../../assets/calendar.png'
import DateTimePicker from '@react-native-community/datetimepicker'


export default function ListOcorrencia({navigation}){

    const [posts, setPosts]=useState([])

// CALENDARIO
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)

    const onChange = (event, selectedDate) =>{
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios')
      setDate(currentDate)

      let tempDate = new Date (currentDate);
      let fDate = tempDate.getDate()+ '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      let fTime = tempDate.getHours() + ':' + tempDate.getMinutes()

          setDataDia(fDate)
  }
// CALENDARIO


  const showMode = (currentMode) =>{
      setShow(true);
      setMode(currentMode)
  }

      // Obtém a data/hora atual
      var data = new Date();

      // Guarda cada pedaço em uma variável
      var dia     = data.getDate();           // 1-31
      var dia_sem = data.getDay();            // 0-6 (zero=domingo)
      var mes     = data.getMonth();          // 0-11 (zero=janeiro)
      var ano2    = data.getYear();           // 2 dígitos
      var ano4    = data.getFullYear();       // 4 dígitos
      var hora    = data.getHours();          // 0-23
      var min     = data.getMinutes();        // 0-59
      var seg     = data.getSeconds();        // 0-59
      var mseg    = data.getMilliseconds();   // 0-999
      var tz      = data.getTimezoneOffset(); // em minutos
  
      // Formata a data e a hora (note o mês + 1)
      var str_data = dia + '/' + (mes+1) + '/' + ano4;
      var str_hora = hora + ':' + min + ':' + seg;

      const [dataDia, setDataDia] =useState(str_data);

    useEffect(()=>{
          function loadPost(){
    
            firebase.firestore().collection('ocorrencias')
          .where('Date','==',dataDia)
          .orderBy('Data','desc')

          .onSnapshot((doc)=>{
            let meusPosts=[];
    
            doc.forEach((item)=>{
              meusPosts.push({
                id:item.id,
                Titulo: item.data().Titulo,
                Tipo: item.data().Tipo,
                Descricao: item.data().Descricao,
                Bloco: item.data().Bloco,
                Cargo: item.data().Cargo,
                Date: item.data().Date,
                Funcionario: item.data().Funcionario,
                Hora: item.data().Hora,
              })
            });
            
    
            setPosts(meusPosts)
    
          })
    
        }
        
        loadPost();
    
      },[dataDia])

    
    function AddOcorrencia(){
      navigation.navigate('Ocorrencia')
    }

    return(
    <>
    
    <StatusBar/>
    <Header/>
        <SafeAreaView style={styles.container} > 
            <ScrollView style={styles.containerScroll}>

            <Text style={{color:"#000", fontSize:20,fontWeight:"bold", marginBottom:20, alignSelf:"center"}}>Livro de Ocorrências</Text>
           
            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", marginBottom:20}}>
              <Text style={{color:"#000", fontSize:14,fontWeight:"bold"}}>{dataDia}</Text>
              <TouchableOpacity style={{backgroundColor:"#447CE0", width:30, height:30, borderRadius:10, marginLeft:5, justifyContent:"center", alignItems:"center"}}  onPress={()=> showMode('date')}>
                  <Image source={Calendario} style={{width:20, height:20}}/>
              </TouchableOpacity>
            </View>


            
            
          {posts.map((post)=>{
            return(
                <Card key={post.id}
                id={post.id}
                Titulo={post.Titulo}
                Tipo={post.Tipo}
                Descricao={post.Descricao}
                Bloco={post.Bloco}
                Cargo={post.Cargo}
                Funcionario={post.Funcionario}
                Hora={post.Hora}
                Date={post.Date}
                />
            )
          })}
                
            </ScrollView>
            <BtnFlutter press={AddOcorrencia} icon={Cruz}/>
            {show && (<DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                />)}
        </SafeAreaView>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    containerScroll: {
        flex: 1 ,
        width:"100%",
        backgroundColor: '#fff',
        marginTop:0,
        paddingTop:30},

    input:{
            backgroundColor:"#cdcdcd",
            width:"80%",
            padding:10,
            borderRadius:10, 
            justifyContent:"center"
            // alignSelf:"center"
        },
    
    inputForm:{
        backgroundColor:"#cdcdcd",
            width:"92%",
            padding:10,
            borderRadius:10, 
            justifyContent:"center"
    },
    texto:{
        alignSelf:"flex-start",
        marginLeft:20,
        fontSize:16,
        color:"#000",
        marginBottom:5
    },

    containerSelect: {
      
      },
      paragraph: {
        marginTop:10,
        marginBottom:20,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color:"#000"
      },
      BtnTroca:{
        width:300,
        height:56,
        backgroundColor:"#4169E1",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:30,
        marginTop:20,
        marginBottom:50,
        alignSelf:"center"
    },
    viewInput:{
        width:"100%", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:20
    }

  });
  
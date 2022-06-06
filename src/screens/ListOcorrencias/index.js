import react, {useState, useEffect} from "react";
import {StyleSheet,SafeAreaView, StatusBar, ScrollView, Text, Platform, View, TouchableOpacity, Image, Appearance }from 'react-native'


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
      const dia = String(tempDate.getDate()).padStart(2, '0');
      const mes = String(tempDate.getMonth() + 1).padStart(2, '0');
      const ano = String(tempDate.getFullYear()).padStart(2, '0');
      let Dataok = dia + '/' + mes + '/' + ano
          setDataDia(Dataok)
          console.log(Dataok)
  }
// CALENDARIO


  const showMode = (currentMode) =>{
      setShow(true);
      setMode(currentMode)
  }

      // Obtém a data/hora atual
      let data = new Date ();

      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = String(data.getFullYear()).padStart(2, '0');
      let Dataok = dia + '/' + mes + '/' + ano
  
     
      const [dataDia, setDataDia] =useState(Dataok);

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

            <Text style={styles.Titulo}>Livro de Ocorrências</Text>
           
            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", marginBottom:20}}>
              <Text style={styles.data}>{dataDia}</Text>
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

const colorScheme = Appearance.getColorScheme();


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    containerScroll: {
        flex: 1 ,
        width:"100%",
        backgroundColor:colorScheme==="light"?"#222":"#222",
        marginTop:0,
        paddingTop:30},

    input:{
            backgroundColor:"#cdcdcd",
            width:"80%",
            padding:10,
            borderRadius:10, 
            justifyContent:"center"
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
        color:colorScheme==="light"?"#fff":"#fff",
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
    },
    Titulo:{
      color:colorScheme==="light"?"#fff":"#fff",
      fontSize:20,
      fontWeight:"bold",
      marginBottom:20,
      alignSelf:"center"
    },
    data:{
      color:colorScheme==="light"?"#fff":"#fff",
      fontSize:14,
      fontWeight:"bold"
    }

  });
  
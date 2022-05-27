import react, {useState, useEffect} from "react";
import {StyleSheet,SafeAreaView, StatusBar, ScrollView, Text, TextInput, Button, Platform, View, TouchableOpacity, Image, FlatList, Alert }from 'react-native'


import Header from "../../components/Header";

import AsyncStorage from '@react-native-async-storage/async-storage';

import DateTimePicker from '@react-native-community/datetimepicker'

import Calendario from '../../assets/calendar.png'

import Clock from '../../assets/clock.png'

import DropDownPicker from 'react-native-dropdown-picker'
import Constants from 'expo-constants';

import * as Animatable from 'react-native-animatable';

import firebase from '../../firebaseConnection'

export default function Reservas({navigation}){



    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [text, setText] = useState('DD/MM/YYY')
    const [text2, setText2] = useState('Hora')

    const onChange = (event, selectedDate) =>{
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios')
        setDate(currentDate)

        let tempDate = new Date (currentDate);
        let fDate = tempDate.getDate()+ '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = tempDate.getHours() + ':' + tempDate.getMinutes()

            setText(fDate)
            setText2(fTime)
    }
 
    const showMode = (currentMode) =>{
        setShow(true);
        setMode(currentMode)
    }

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        // {label: 'Piscina', value: 'Piscina', key:123},
        // {label: 'Salão de festas', value: 'Salão de festas', key:1234},
        // {label: 'Parque', value: 'Parque', key:1235},
        // {label: 'Academia', value: 'Academia', key:1236},
      
    ]);

    const [posts, setPosts]=useState([])

    useEffect(()=>{
         async function loadPost(){
    
           await firebase.firestore().collection('ambientes')
          .orderBy('Data','desc')
          .onSnapshot((doc)=>{
            let meusPosts=[];
    
            doc.forEach((item)=>{
              meusPosts.push({
                id:item.id,
                label:item.data().label,
                value:item.data().Value,
                Data:item.data().Data,
              })
            });
            
    
            setPosts(meusPosts)
    
          })
    
        }
        
        loadPost();
    
      },[])

      function handdleBd(){
          if(value !== null){
            firebase.firestore().collection('reservas')
        .add({
          Data: firebase.firestore.FieldValue.serverTimestamp(),
          Ambiente: value,
        })
        .then(()=>{
          Alert.alert(
            'TheKontroll',
            'Reserva Realizada com Sucesso!', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home')
            },
          ],
            )

        })
        .catch(()=>{
          Alert.alert(
            'TheKontroll',
            'Error, Tente Novamente!', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home')
            },
          ],
            )
        })
          }else{
            Alert.alert(
                'TheKontroll',
                'Escolha um Ambiente', [
                {
                  text: 'OK',
                },
              ],
                )
          }
    
      }

    return(
    <>
    
    <StatusBar/>
    <Header/>
        <SafeAreaView style={styles.container} > 
            <ScrollView style={styles.containerScroll}>

            <Text style={{color:"#000", fontSize:20,fontWeight:"bold", marginBottom:20, alignSelf:"center"}}>Reservas</Text>
                   
                <View style={styles.containerSelect}>
                    <Text style={styles.paragraph}>
                        Ambientes
                        {posts.date}
                    </Text>

                    <DropDownPicker
                    open={open}
                    value={value}
                    items={posts}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Selecione um Ambiente"
                    itemKey={posts.id}
                    searchable={true}
                    searchPlaceholder="Digite o nome de um ambiente"
                    listMode="MODAL"
                    />
                    
                </View>

                <Animatable.View animation="fadeInRightBig"   duration={1000} useNativeDriver={true}
                 style={{width:"100%", flexDirection:"row", justifyContent:"center", alignItems:"center", marginTop:20}}>
                    <TextInput placeholder={text} style={styles.input} editable={false} selectTextOnFocus={false} ></TextInput>

                    <TouchableOpacity style={{backgroundColor:"#447CE0", width:50, height:50, borderRadius:10, marginLeft:5, justifyContent:"center", alignItems:"center"}}  onPress={()=> showMode('date')}>
                        <Image source={Calendario} style={{width:30, height:30}}/>
                    </TouchableOpacity>

                </Animatable.View>


                <Animatable.View animation="fadeInRightBig"   duration={1200} useNativeDriver={true}
                 style={{width:"100%", flexDirection:"row", justifyContent:"center", alignItems:"center", marginTop:20}}>
                    <TextInput placeholder={text2} style={styles.input} editable={false} selectTextOnFocus={false} ></TextInput>

                    <TouchableOpacity style={{backgroundColor:"#447CE0", width:50, height:50, borderRadius:10, marginLeft:5, justifyContent:"center", alignItems:"center"}}  onPress={()=> showMode('time')}>
                        <Image source={Clock} style={{width:30, height:30}}/>
                    </TouchableOpacity>

                </Animatable.View>

                <Animatable.View animation="fadeInRightBig"   duration={1400} useNativeDriver={true}
                 style={{width:"100%", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:20}}>
                    <Text style={styles.texto}>Nome:</Text>
                    <TextInput placeholder="Nome" style={styles.inputForm}  ></TextInput>
                </Animatable.View>

                <Animatable.View animation="fadeInRightBig"   duration={1600} useNativeDriver={true}
                 style={{width:"100%", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:20}}>
                    <Text style={styles.texto}>CPF:</Text>
                    <TextInput placeholder="CPF" keyboardType="numeric" style={styles.inputForm}  ></TextInput>
                </Animatable.View>

                <Animatable.View animation="fadeInRightBig"   duration={1800} useNativeDriver={true}
                 style={{width:"100%", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:20}}>
                    <Text style={styles.texto}>Bloco:</Text>
                    <TextInput placeholder="Bloco" style={styles.inputForm}  ></TextInput>
                </Animatable.View>


                <Animatable.View animation="fadeInRightBig"   duration={2000} useNativeDriver={true}
                 style={{width:"100%", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:20}}>
                    <Text style={styles.texto}>Apt:</Text>
                    <TextInput placeholder="Apt" style={styles.inputForm}  ></TextInput>
                </Animatable.View>
                
                <TouchableOpacity style={styles.BtnTroca}  onPress={handdleBd} >
                    <Text style={{color:"#fff"}}>Reservar</Text>
                </TouchableOpacity>
                
               
                {show && (<DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                />)}

            
                
            </ScrollView>
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

  });
  
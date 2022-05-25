import react, {useState, useEffect} from "react";
import {StyleSheet,SafeAreaView, StatusBar, ScrollView, Text, TextInput, Button, Platform, View, TouchableOpacity, Image }from 'react-native'


import Header from "../../components/Header";

import AsyncStorage from '@react-native-async-storage/async-storage';

import DateTimePicker from '@react-native-community/datetimepicker'

import Calendario from '../../assets/calendar.png'

import Clock from '../../assets/clock.png'

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

    return(
    <>
    <StatusBar/>
    <Header/>
        <SafeAreaView style={styles.container} > 
            <ScrollView style={styles.containerScroll}>

            <Text style={{color:"#000", fontSize:20,fontWeight:"bold", marginBottom:30, alignSelf:"center"}}>Reservas</Text>

                <View style={{width:"100%", flexDirection:"column", justifyContent:"center", alignItems:"center", marginBottom:30}}>
                    <Text style={styles.texto}>Ambiente:</Text>
                    <TextInput placeholder="Escolha o Ambiente" style={styles.inputForm}  ></TextInput>
                </View>

                <View style={{width:"100%", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                    <TextInput placeholder={text} style={styles.input} editable={false} selectTextOnFocus={false} ></TextInput>

                    <TouchableOpacity style={{backgroundColor:"#447CE0", width:50, height:50, borderRadius:10, marginLeft:5, justifyContent:"center", alignItems:"center"}}  onPress={()=> showMode('date')}>
                        <Image source={Calendario} style={{width:30, height:30}}/>
                    </TouchableOpacity>

                </View>

                <View style={{width:"100%", flexDirection:"row", justifyContent:"center", alignItems:"center", marginTop:20}}>
                    <TextInput placeholder={text2} style={styles.input} editable={false} selectTextOnFocus={false} ></TextInput>

                    <TouchableOpacity style={{backgroundColor:"#447CE0", width:50, height:50, borderRadius:10, marginLeft:5, justifyContent:"center", alignItems:"center"}}  onPress={()=> showMode('time')}>
                        <Image source={Clock} style={{width:30, height:30}}/>
                    </TouchableOpacity>

                </View>

                <View style={{width:"100%", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:20}}>
                    <Text style={styles.texto}>Nome:</Text>
                    <TextInput placeholder="Nome" style={styles.inputForm}  ></TextInput>
                </View>

                <View style={{width:"100%", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:20}}>
                    <Text style={styles.texto}>CPF:</Text>
                    <TextInput placeholder="CPF" keyboardType="numeric" style={styles.inputForm}  ></TextInput>
                </View>

                <View style={{width:"100%", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:20}}>
                    <Text style={styles.texto}>Bloco Apt:</Text>
                    <TextInput placeholder="Bloco Apt" style={styles.inputForm}  ></TextInput>
                </View>

                
               
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

  });
  
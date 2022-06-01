import react, {useState, useEffect} from "react";
import {StyleSheet,SafeAreaView, StatusBar,Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert}from 'react-native'

import Header from "../../components/Header";

import AsyncStorage from '@react-native-async-storage/async-storage';

import {KeyboardAvoidingView} from 'react-native';

import firebase from '../../firebaseConnection';

import { RadioButton} from 'react-native-paper';

import * as Animatable from 'react-native-animatable';


export default function Ocorrencia({navigation}){

    const [empresa, setEmpresa]= useState(null);
    const [funcionario, setFuncionario]= useState(null);
    const [cargo, setCargo]= useState(null);
    const [desc, setDesc]= useState(null);
    const [titulo, setTitulo]= useState(null);
    const [ocorrencia, setOcorrencia]= useState(null);

    const [date, setDate]= useState(null);
    const [hora, setHora]= useState(null);
    const [bloco, setBloco]= useState(null);

    const [value, setValue] = useState('Baixa');

    useEffect(()=>{
        getData()
        Datehora()
    },[])

    const getData = async () => {
          const empresa = await AsyncStorage.getItem('Empresa')
          const funcionario = await AsyncStorage.getItem('Funcionario')
          const cargo = await AsyncStorage.getItem('Cargo')
         if(empresa !== null){
            setEmpresa(empresa)
         }if(funcionario !== null){
            setFuncionario(funcionario)
         }if(cargo !== null){
            setCargo(cargo)
         }
      }

      function Datehora(){
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
        var str_hora = hora + ':' + min + ':' + seg;

        let data2 = new Date ();

        const dia2 = String(data2.getDate()).padStart(2, '0');
        const mes2 = String(data2.getMonth() + 1).padStart(2, '0');
        const ano = String(data2.getFullYear()).padStart(2, '0');
        let Dataok = dia2 + '/' + mes2 + '/' + ano
        setDate(Dataok)
        setHora(str_hora)
      }

      function HandlleOcorrencia(){
         firebase.firestore().collection('ocorrencias')
        .add({
        Funcionario: funcionario,
        Cargo:cargo,
        Date: date,
        Hora: hora,
        Descricao: desc,
        Titulo: titulo,
        Tipo: value,
        Bloco: bloco,
        Data: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(()=>{
            setDesc('')
            // alert("Ocorrência Feita com Sucesso!")

        Alert.alert(
        'TheKontroll',
        'Ocorrência Realizada com Sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('ListOcorrencia')
        },
      ],
        )
            // navigation.navigate('Home')
        })
        .catch((e)=>{
            alert(e)
        })

      }

    return(
    <>
    <StatusBar/>
    <Header/>
    <ScrollView>
        <SafeAreaView style={styles.container} > 
    
    <KeyboardAvoidingView contentContainerStyle={{ flex:1}} behavior="position" enabled>
    <Text style={{color:"#000", fontSize:20,fontWeight:"bold", marginBottom:30, alignSelf:"center"}}>Livro de Ocorrências</Text>

            
            <View style={{flexDirection:"row", width:"90%", marginBottom:10}}>
                <View style={{flexDirection:"column", width:"50%", marginRight:5}}>
                    <Text style={styles.texto}>Data:</Text>
                    <TextInput placeholder={date} style={styles.inputX} onChangeText={setCargo}   editable={false} selectTextOnFocus={false}></TextInput>
                </View>
                <View style={{flexDirection:"column", width:"50%"}}>
                    <Text style={styles.texto}>Bloco:</Text>
                    <TextInput placeholder="Bloco" style={styles.inputX} onChangeText={setBloco} value={bloco}></TextInput>
                </View>
                
            </View>

            <Text style={styles.texto}>Prioridade:</Text>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                <View style={{flexDirection:"row", marginBottom:30}}>
                    <Animatable.View animation="fadeInRightBig"   duration={800} useNativeDriver={true} delay={0} style={styles.btnRadio}>
                        <RadioButton value="Baixa"  color="#4169E1"  uncheckedColor="#cdcdcd"/>
                        <Text>Baixa</Text>
                    </Animatable.View>
                    <Animatable.View animation="fadeInRightBig"   duration={800} useNativeDriver={true} delay={100} style={styles.btnRadio}>
                        <RadioButton value="Média"  color="#4169E1"  uncheckedColor="#cdcdcd"/>
                        <Text>Média</Text>
                    </Animatable.View>
                    <Animatable.View animation="fadeInRightBig"   duration={800} useNativeDriver={true} delay={200} style={styles.btnRadio}>
                        <RadioButton value="Alta"  color="#4169E1"  uncheckedColor="#cdcdcd"/>
                        <Text>Alta</Text>
                    </Animatable.View>
                    <Animatable.View animation="fadeInRightBig"   duration={800} useNativeDriver={true} delay={300} style={styles.btnRadio}>
                        <RadioButton value="Urgente"  color="#4169E1"  uncheckedColor="#cdcdcd"/>
                        <Text>Urgente</Text>
                    </Animatable.View>
                </View>
            </RadioButton.Group>

            <Animatable.View animation="fadeIn"   duration={2500} useNativeDriver={true} delay={300}>
                <TextInput style={styles.inputY} onChangeText={setOcorrencia} placeholder={value} editable={false} selectTextOnFocus={false}></TextInput>

                <Text style={styles.texto}>Titulo:</Text>
                <TextInput style={styles.input} onChangeText={setTitulo}  value={titulo}></TextInput>
                
                <Text style={styles.texto}>Descrição:</Text>
                <TextInput style={styles.inputArea}  multiline={true} onChangeText={setDesc} value={desc}></TextInput>

                <TouchableOpacity style={styles.BtnTroca} onPress={HandlleOcorrencia} >
                    <Text style={{color:"#fff"}}>Salvar</Text>
                </TouchableOpacity>
            </Animatable.View>
    </KeyboardAvoidingView>
               
        </SafeAreaView>
    </ScrollView>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop:50,
    },
    textoRonda:{
        fontSize:20,
        color:"#000",
        marginBottom:20,
        fontWeight:"bold"
    },
    fotoRonda:{
        width:"95%",
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"row"
    },
    imageRonda2:{
        width:75,
        height:75,
        
    }, 
     input:{
        backgroundColor:"#cdcdcd",
        width:"70%",
        padding:10,
        borderRadius:10,
        marginBottom:20
    },
    inputX:{
        backgroundColor:"#cdcdcd",
        width:"100%",
        padding:10,
        borderRadius:10,
        marginBottom:20,
    },
    inputY:{
        backgroundColor:"#cdcdcd",
        width:"100%",
        padding:10,
        borderRadius:10,
        marginBottom:20,
    },
    inputArea:{
        backgroundColor:"#cdcdcd",
        width:360,
        padding:10,
        borderRadius:10,
        marginBottom:20,
        height:150,
        fontSize:20,
        color:"#000",
        textAlign:"justify",
    },
    texto:{
        alignSelf:"flex-start",
        // marginLeft:30,
        fontSize:16,
        color:"#000",
        marginBottom:5
    },
    BtnTroca:{
        width:300,
        height:56,
        backgroundColor:"#4169E1",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:30,
        marginTop:15,
        marginBottom:5,
        alignSelf:"center"
    },
    btnRadio:{
        marginRight:30
    }
 
  });
  

import react, {useState, useEffect} from "react";
import {StyleSheet,SafeAreaView, StatusBar, ScrollView, Text, TextInput, Button, Platform, View, TouchableOpacity, Image, Linking, Alert, Appearance }from 'react-native'


import Header from "../../components/Header";

import AsyncStorage from '@react-native-async-storage/async-storage';

import DateTimePicker from '@react-native-community/datetimepicker'

import DropDownPicker from 'react-native-dropdown-picker'
// import Constants from 'expo-constants';

import * as Animatable from 'react-native-animatable';

import firebase from '../../firebaseConnection'

export default function Correspondencia({navigation}){



    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    // const [data, setText] = useState('DD/MM/YYY')
    // const [hora, setText2] = useState('Hora')

    const [origem, setOrigem] = useState('')
    const [destino, setDestino] = useState('')
    const [bloco, setBloco] = useState('')
    const [apt, setApt] = useState('')
    const [desc, setDesc] = useState('')

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const [posts, setPosts]=useState([])

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


    useEffect(()=>{
         async function loadPost(){
    
           await firebase.firestore().collection('moradores')
          .orderBy('DataCreat','desc')
          .onSnapshot((doc)=>{
            let meusPosts=[];
    
            doc.forEach((item)=>{
              meusPosts.push({
                id:item.id,
                label:item.data().Nome,
                value:item.data().Contato,
                Data:item.data().DataCreat,
              })
            });
            
    
            setPosts(meusPosts)
    
          })
    
        }
        
        loadPost();
    
      },[])


    function HandlleCorresp(){
      if(value !== null){
        firebase.firestore().collection('correspondencia')
    .add({
      DataCreat: firebase.firestore.FieldValue.serverTimestamp(),
      Origem: origem,
      Destino: destino,
      Contato: value,
      Bloco: bloco,
      Apt: apt,
      Desc: desc
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

    var contato = JSON.stringify(value)

    function WhatsEnv(){
    HandlleCorresp()
    Linking.openURL(`https://api.whatsapp.com/send?phone=${contato}&&text=Olá%20${destino},%0AVocê%20Tem%20Uma%20Correspondência!%0A%0AOrigem:%20*${origem}*%0A%0ADescrição:%20*${desc}*%0A%0A*Retirar%20na%20portaria.*%0A${str_data}%20${str_hora}`);
    }

 

    return(
    <>
   
    <StatusBar/>
    <Header/>
        <SafeAreaView style={styles.container} > 
            <ScrollView style={styles.containerScroll}>

            <Text style={styles.paragraph}>Correspondência</Text>
                   

                <Animatable.View animation="fadeInRightBig"   duration={1400} useNativeDriver={true}
                 style={styles.viewInput}>
                    <Text style={styles.texto}>De:</Text>
                    <TextInput placeholder="Origem" style={styles.inputForm} onChangeText={setOrigem} value={origem} ></TextInput>
                </Animatable.View>

                <Animatable.View animation="fadeInRightBig"   duration={1600} useNativeDriver={true}
                 style={styles.viewInput}>
                    <Text style={styles.texto}>Para:</Text>
                    <DropDownPicker
                    open={open}
                    value={value}
                    items={posts}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Selecione um Morador"
                    itemKey={posts.id}
                    searchable={true}
                    searchPlaceholder="Digite o nome de um Morador"
                    listMode="MODAL"
                    />
                </Animatable.View>

                <Animatable.View animation="fadeInRightBig"   duration={1800} useNativeDriver={true}
                  style={styles.viewInput}>
                      <Text style={styles.texto}>Descrição:</Text>
                      <TextInput placeholder="Descreva o que se trata" style={styles.inputForm} onChangeText={setDesc} value={desc}  ></TextInput>
                  </Animatable.View>

                <View style={{flexDirection:"row"}}>
                  <Animatable.View animation="fadeInRightBig"   duration={1800} useNativeDriver={true}
                  style={styles.viewInput2}>
                      <Text style={styles.texto}>Bloco:</Text>
                      <TextInput placeholder="Bloco" style={styles.inputForm} onChangeText={setBloco} value={bloco}  ></TextInput>
                  </Animatable.View>


                  <Animatable.View animation="fadeInRightBig"   duration={2000} useNativeDriver={true}
                  style={styles.viewInput2}>
                      <Text style={styles.texto}>Apt:</Text>
                      <TextInput placeholder="Apt" style={styles.inputForm} onChangeText={setApt} value={apt} ></TextInput>
                  </Animatable.View>
                </View>

                <Animatable.View animation="fadeInRightBig"   duration={1400} useNativeDriver={true}
                 style={styles.viewInput}>
                    <Text style={styles.texto}>Quem Recebe:</Text>
                    <TextInput placeholder="Destino" style={styles.inputForm} onChangeText={setDestino} value={destino} ></TextInput>
                </Animatable.View>

                <TouchableOpacity style={styles.BtnTroca} onPress={WhatsEnv} >
                    <Text style={{color:"#fff"}}>Enviar Correspondência</Text>
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
        color:colorScheme==="light"?"#fff":"#fff",
        marginBottom:5
    },

    containerSelect: {
      
      },
      paragraph: {
        fontSize:20,
        fontWeight:"bold",
        marginBottom:20,
        alignSelf:"center",
        color:colorScheme==="light"?"#fff":"#fff",
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
    viewInput2:{
      width:"50%", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:20
  }

  });
  































































// import react, {useState, useEffect} from "react";
// import {StyleSheet,SafeAreaView, StatusBar, ScrollView, Text, TextInput, Button, Platform, View, TouchableOpacity, Image, FlatList, Alert }from 'react-native'


// import Header from "../../components/Header";

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import * as Animatable from 'react-native-animatable';

// import firebase from '../../firebaseConnection'

// import Card from '../../components/CardCorrespondencia'

// export default function Correspondencia({navigation}){


//     const [posts, setPosts]=useState([])

//     useEffect(()=>{
//           function loadPost(){
    
//             firebase.firestore().collection('moradores')
//           .orderBy('DataCreat','desc')
//           .onSnapshot((doc)=>{
//             let meusPosts=[];
    
//             doc.forEach((item)=>{
//               meusPosts.push({
//                 id:item.id,
//                 Nome: item.data().Nome,
//                 Contato: item.data().Contato
//               })
//             });
            
    
//             setPosts(meusPosts)
    
//           })
    
//         }
        
//         loadPost();
    
//       },[])

    

//     return(
//     <>
    
//     <StatusBar/>
//     <Header/>
//         <SafeAreaView style={styles.container} > 
//             <ScrollView style={styles.containerScroll}>

//             <Text style={{color:"#000", fontSize:20,fontWeight:"bold", marginBottom:20, alignSelf:"center"}}>Correspondencia</Text>
                   
//           {posts.map((post)=>{
            
//             return(
//                 <Card key={post.id}
//                 id={post.id}
//                 name={post.Nome}
//                 contato={post.Contato}
//                 />
//             )
//           })}
                
//             </ScrollView>
//         </SafeAreaView>
//     </>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     },

//     containerScroll: {
//         flex: 1 ,
//         width:"100%",
//         backgroundColor: '#fff',
//         marginTop:0,
//         paddingTop:30},

//     input:{
//             backgroundColor:"#cdcdcd",
//             width:"80%",
//             padding:10,
//             borderRadius:10, 
//             justifyContent:"center"
//             // alignSelf:"center"
//         },
    
//     inputForm:{
//         backgroundColor:"#cdcdcd",
//             width:"92%",
//             padding:10,
//             borderRadius:10, 
//             justifyContent:"center"
//     },
//     texto:{
//         alignSelf:"flex-start",
//         marginLeft:20,
//         fontSize:16,
//         color:"#000",
//         marginBottom:5
//     },

//     containerSelect: {
      
//       },
//       paragraph: {
//         marginTop:10,
//         marginBottom:20,
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         color:"#000"
//       },
//       BtnTroca:{
//         width:300,
//         height:56,
//         backgroundColor:"#4169E1",
//         alignItems:"center",
//         justifyContent:"center",
//         borderRadius:30,
//         marginTop:20,
//         marginBottom:50,
//         alignSelf:"center"
//     },
//     viewInput:{
//         width:"100%", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:20
//     }

//   });
  
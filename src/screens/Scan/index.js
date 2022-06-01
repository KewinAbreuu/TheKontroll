
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import firebase from '../../firebaseConnection';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { RadioButton} from 'react-native-paper';
// import Position from 'react-native/Libraries/Components/Touchable/Position';



export default function Scan({navigation}) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qr,setQr] = useState("Aponte a camera para o Qr Code")
  const [desc,setDesc] =useState('');
  // States Da config do usuario
  const [empresa, setEmpresa]= useState(null);
  const [funcionario, setFuncionario]= useState(null);
  const [cargo, setCargo]= useState(null);
  // Value do radio button
  const [value, setValue] = useState('');

  let dados = qr.split("-")

  console.log(dados)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(()=>{
    getData()
},[])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setQr(data);
    Alert.alert(
      'TheKontroll',
      'Selecionado!', [
      {
        text: 'OK',
      },
    ],
      )
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

 

async function getData(){
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

    let data2 = new Date ();

    const dia2 = String(data2.getDate()).padStart(2, '0');
    const mes2 = String(data2.getMonth() + 1).padStart(2, '0');
    const ano = String(data2.getFullYear()).padStart(2, '0');
    let Dataok = dia2 + '/' + mes2 + '/' + ano

  function handdleBd(){
    firebase.firestore().collection('ronda')
    .add({
      Local: qr,
      Date: Dataok,
      Hora: str_hora,
      Data: firebase.firestore.FieldValue.serverTimestamp(),
      Descricao: desc,
      Funcionario:funcionario,
      Cargo:cargo,
      Condicoes:value
    })
    .then(()=>{
      Alert.alert(
        'TheKontroll',
        'Ronda Realizada com Sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Ronda')
        },
      ],
        )
        setDesc('')
        setQr('Aponte a camera para o QR Code')
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

  }

  return (
      <>
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Toque para scanear novamente'} onPress={() => setScanned(false)} />}
      
      <View>
        <TouchableOpacity  style={styles.Textbtn}>
            <Text style={{color:"#fff"}}>{qr}</Text>
        </TouchableOpacity>
    </View>

    <View style={{backgroundColor:"#fff", position:"absolute", bottom:0, width:"100%"}}>
    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                <Text style={{marginLeft:15}}>Condições:</Text>
                  <View style={{flexDirection:"row", justifyContent:"space-around", marginBottom:5}}>
                      <View tyle={styles.btnRadio}>
                          <RadioButton value="Ótimo"  color="#4169E1"  uncheckedColor="#cdcdcd"/>
                          <Text>Ótimo</Text>
                      </View>
                      <View  style={styles.btnRadio}>
                          <RadioButton value="Bom"  color="#4169E1"  uncheckedColor="#cdcdcd"/>
                          <Text>  Bom</Text>
                      </View>
                      <View  style={styles.btnRadio}>
                          <RadioButton value="Regular"  color="#4169E1"  uncheckedColor="#cdcdcd"/>
                          <Text>Regular</Text>
                      </View>
                      <View  style={styles.btnRadio}>
                          <RadioButton value="Ruim"  color="#4169E1"  uncheckedColor="#cdcdcd"/>
                          <Text> Ruim</Text>
                       </View>
                       <View  style={styles.btnRadio}>
                          <RadioButton value="Péssima"  color="#4169E1"  uncheckedColor="#cdcdcd"/>
                          <Text>Péssima</Text>
                       </View>
                  </View>
              </RadioButton.Group>
      </View>

    </View>

   

    <View>
            <TextInput style={{color:"#000", padding:20}} placeholder="Observações" onChangeText={setDesc} value={desc}/>
    </View>

    <View>
        <TouchableOpacity  style={styles.btn} onPress={handdleBd}>
            <Text style={styles.textoButtons}>Enviar</Text>
        </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  btn:{
      width:"100%",
      paddingVertical:20,
      backgroundColor:"#1E90FF",
      justifyContent:"center",
      alignItems:"center"
  },
  Textbtn:{
    width:"100%",
    paddingVertical:15,
    backgroundColor:"#4f4f4f80",
    justifyContent:"center",
    alignItems:"center",
    marginTop:1
},
textoButtons:{
    color:"#fff",
    fontWeight:"700"
},
  btnRadio:{
        // marginLeft:20,
        // justifyContent:"center"
    }

});

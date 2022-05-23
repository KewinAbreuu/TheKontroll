


import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import firebase from '../../firebaseConnection';

import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Scan({navigation}) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qr,setQr] = useState("Aponte a camera para o QR Code")
  const [desc,setDesc] =useState('');
  // States Da config do usuario
  const [empresa, setEmpresa]= useState(null);
  const [funcionario, setFuncionario]= useState(null);
  const [cargo, setCargo]= useState(null);



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
    alert("Selecionado")
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

  function handdleBd(){
    firebase.firestore().collection('ronda')
    .add({
      Local: qr,
      Date: str_data,
      Hora: str_hora,
      Data: firebase.firestore.FieldValue.serverTimestamp(),
      Descricao: desc,
      Funcionario:funcionario,
      Cargo:cargo
    })
    .then(()=>{
        alert('sucesso')
        setDesc('')
        setQr('Aponte a camera para o QR Code')
    })
    .catch(()=>{
        alert('Erro')
    })

    // navigation.navigate('Home')
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

    </View>

   

    <View>
            <TextInput style={{color:"#000", padding:20}} placeholder="Descrição" onChangeText={setDesc} value={desc}/>
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
    // height:"100%",
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
}

});

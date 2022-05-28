
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ScanPlantao({navigation}) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qr,setQr] = useState("")
  const [desc,setDesc] =useState('');
 
  let dados = qr.split("-")

    useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

 
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
    await AsyncStorage.setItem('Funcionario', dados[0])
    await AsyncStorage.setItem('Cargo', dados[1])

    navigation.navigate('Home')
    
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
            <Text style={{color:"#fff"}}>Aponte a camera para o Qr Code</Text>
        </TouchableOpacity>
      </View>

      <View style={{position:"absolute", bottom:0, width:"100%"}}>
            <TextInput style={{color:"#000", padding:20, backgroundColor:"#cdcdcd"}} placeholder="Funcionario" editable={false} selectTextOnFocus={false} value={dados[0]}/>
            <TextInput style={{color:"#000", padding:20, backgroundColor:"#cdcdcd"}} placeholder="Cargo" editable={false} selectTextOnFocus={false} value={dados[1]}/>
      </View>

    </View>

   

    

    <View>
        <TouchableOpacity  style={styles.btn} onPress={getData}>
            <Text style={styles.textoButtons}>Trocar Plantão</Text>
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
    backgroundColor:"#1E90FF"
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

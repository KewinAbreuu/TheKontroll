


import react, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Config({navigation}) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
// State q pega o nome da empresa pelo qr code
  const [configEmpresa, setConfigEmpresa]= useState(null);
// State q pega o inpuText
  const [funcionario,setFuncionario] = useState(null);
  const [cargo, setCargo]= useState(null)
 

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setConfigEmpresa(data);
    Alert.alert(
      'TheKontroll',
      'Qr Code Selecionado!', [
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
                                                  // && configEmpresa === 'The Kontrol'
  async function setDados(){
    if(configEmpresa !== null && configEmpresa !== '' ){
        if(funcionario !== null && funcionario !== ''){
            if(cargo !==null && cargo !== ''){
                await AsyncStorage.setItem('Empresa', configEmpresa)
                await AsyncStorage.setItem('Funcionario', funcionario)
                await AsyncStorage.setItem('Cargo', cargo)
                // Se tudo estiver ok ele me leva pra pagina home
                alert('Configurações Feitas com Sucesso!')
                navigation.navigate('Home')
            }else{alert('Preencha o Campo Cargo')}
        }else {alert ('Preencha o Campo Funcionário')}
    }else{alert('Qr Code Não Autorizado')}

  }
  

  return (
      <>
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
        <Text style={{color:"#fff", marginBottom:10, alignSelf:"center"}}>Leia o Qr Code de Configurações</Text>
      {scanned && <Button title={'Toque para scanear novamente'} onPress={() => setScanned(false)} />}
      
      <View>
        <TouchableOpacity  style={styles.Textbtn}>
            <Text style={{color:"#fff"}}>{configEmpresa}</Text>
        </TouchableOpacity>
    </View>

    </View>

   

    <View>
            <TextInput style={{color:"#fff", padding:20, color:"#4f4f4f"}} placeholder="Nome do Funcionário" onChangeText={setFuncionario} value={funcionario}/>
            <TextInput style={{color:"#fff", padding:20, color:"#4f4f4f"}} placeholder="Cargo" onChangeText={setCargo} value={cargo}/>
    </View>

    <View>
        <TouchableOpacity  style={styles.btn} onPress={setDados} >
            <Text style={styles.textoButtons}>Enviar</Text>
        </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor:"#4f4f4f"
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

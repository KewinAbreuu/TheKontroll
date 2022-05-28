


import react, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Config({navigation}) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
// State q pega o nome da empresa pelo qr code
  const [configEmpresa, setConfigEmpresa]= useState("");
// State q pega o inpuText
  const [funcionario,setFuncionario] = useState(null);
  const [cargo, setCargo]= useState(null)
 
  let dados = configEmpresa.split("-")

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

  async function setDados(){
    if(configEmpresa !== null && configEmpresa !== '' ){
        if(funcionario !== null && funcionario !== ''){
            if(cargo !==null && cargo !== ''){
                await AsyncStorage.setItem('Empresa', dados[0])
                await AsyncStorage.setItem('Funcionario', dados[1])
                await AsyncStorage.setItem('Cargo', dados[2])
                // Se tudo estiver ok ele me leva pra pagina home
                alert('Configurações Feitas com Sucesso!')
                navigation.navigate('Home')
            }else{alert('Preencha o Campo Cargo')}
        }else {alert ('Preencha o Campo Funcionário')}
    }else{alert('Qr Code Não Autorizado')}

  }
  
  async function setDados(){
    if(configEmpresa !== null && configEmpresa !== '' ){
            await AsyncStorage.setItem('Empresa', dados[0])
            await AsyncStorage.setItem('Funcionario', dados[1])
            await AsyncStorage.setItem('Cargo', dados[2])
            // Se tudo estiver ok ele me leva pra pagina home
            alert('Sucesso! Reinicie o Aplicativo Para Concluir as Configurações')
            navigation.navigate('Home')
          }else{alert('Leia o Qr Code')}
           
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
            <Text style={{color:"#fff"}}>Empresa: {dados[0]}</Text>
        </TouchableOpacity>
    </View>

    </View>

   

    <View>
            <TextInput style={{color:"#fff", padding:20, color:"#4f4f4f"}} placeholder="Nome do Funcionário"  value={dados[1]}/>
            <TextInput style={{color:"#fff", padding:20, color:"#4f4f4f"}} placeholder="Cargo"  value={dados[2]}/>
    </View>

    <View>
        <TouchableOpacity  style={styles.btn} onPress={setDados} >
            <Text style={styles.textoButtons}>Salvar</Text>
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

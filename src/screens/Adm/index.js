import react, {useState} from "react";
import {StyleSheet,SafeAreaView, StatusBar,Text}from 'react-native'
import { WebView } from 'react-native-webview';



import Header from "../../components/Header";

export default function Adm({navigation}){

    const [url,setUrl]=useState('https://shimmering-pithivier-dbee84.netlify.app/')



    return(
    <>
    <StatusBar/>
    {/* <Header/> */}
        
        <WebView
        source={{ uri: url }}
      />
        
    </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#202427',
      alignItems: 'center',
      marginTop:0,
      paddingTop:30

    },
    
  });
  
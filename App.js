
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Alert, LogBox } from 'react-native-web';

import firebase from './src/firebaseConnection';
import { Routes } from './src/routes';

export default function App() {


  LogBox.ignoreAllLogs(true)

  return (
    
    <Routes/>
    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn:{
    width:"100%",
    backgroundColor:"red",
    justifyContent:"center",
    alignItems:"center",
    paddingVertical:20
  }
});


import firebase from  'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';


/* CODES COMPANYS
  123= loginsGeral
  352847= Life
*/ 
// company firebase config object

  const companysConfig = {
    TheKontrol: {
      apiKey: "AIzaSyB8WpaHjzv2WLdM812retS2F5Dk0hSYgCM",
      authDomain: "appportaria-b0a1b.firebaseapp.com",
      projectId: "appportaria-b0a1b",
      storageBucket: "appportaria-b0a1b.appspot.com",
      messagingSenderId: "43910768183",
      appId: "1:43910768183:web:33c4d28029359f570c41b2"
    },
    life: {
      apiKey: "AIzaSyAl82OCwHzXeeI9H5pF1nBTGTBS3k2rktQ",
      authDomain: "kontrolllife-b4a16.firebaseapp.com",
      projectId: "kontrolllife-b4a16",
      storageBucket: "kontrolllife-b4a16.appspot.com",
      messagingSenderId: "412857269676",
      appId: "1:412857269676:web:bcdf4d4f5aaff2c3a04e09"
    }
  }

  const companyIds = async ()=>{
    const codigo = await AsyncStorage.getItem('Empresa');
    const config = companysConfig[codigo];
  
    console.log(config)
    if(!firebase.apps.length){
    firebase.initializeApp(config);
  }
  
  } 
  companyIds()

  


export  default firebase
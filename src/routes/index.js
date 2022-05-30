
import react from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// importando as telas 
import Splash from '../../src/screens/Splash'
import Home from '../../src/screens/Home'
import Scan from '../../src/screens/Scan'
import Ronda from '../../src/screens/Ronda'
import Adm from '../../src/screens/Adm'
import UserPerfil from '../../src/screens/UserPerfil'
import EmpresaConfig from '../../src/screens/Config'
import Ocorrencia from '../../src/screens/Ocorrencias'
import Apoio from '../../src/screens/Apoio'
import Reservas from '../../src/screens/Reservas'
import ScanPlantao from '../../src/screens/ScanPlantao'
import Dispositivos from '../../src/screens/Dispositivos'
import Correspondencia from '../../src/screens/Correspondencia'

export const Routes = ()=>{
    const Stack = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Splash' component={Splash} />
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='Scan' component={Scan}/>
                <Stack.Screen name='Ronda' component={Ronda}/>
                <Stack.Screen name='Adm' component={Adm}/>
                <Stack.Screen name='UserPerfil' component={UserPerfil}/>
                <Stack.Screen name='EmpresaConfig' component={EmpresaConfig}/>
                <Stack.Screen name='Ocorrencia' component={Ocorrencia}/>
                <Stack.Screen name='Apoio' component={Apoio}/>
                <Stack.Screen name='Reservas' component={Reservas}/>
                <Stack.Screen name='ScanPlantao' component={ScanPlantao}/>
                <Stack.Screen name='Dispositivos' component={Dispositivos}/>
                <Stack.Screen name='Correspondencia' component={Correspondencia}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
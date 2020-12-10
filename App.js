import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator()

import ListVisitas from './screens/ListVisitas'
import VisitaScreen from './screens/VisitaScreen'
import DetalleVisitaScreen from './screens/DetalleVisitaScreen'

function MyStack(){
  return(

    <Stack.Navigator >
      <Stack.Screen  name="Lista de Visitas" 
      component={ListVisitas} 
      options={{title:"Lista de Visitas"}}/>

      <Stack.Screen name="Reservas de Visitas al Museo" 
      component={VisitaScreen}
      options={{title:"Reservar Visita al Museo"}}/>

      <Stack.Screen name="Detalle de Visitas al Museo"
       component={DetalleVisitaScreen}
       options={{title:"detalle de visita"}}
       />
    
    
    </Stack.Navigator>

  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/> 
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b0c4de',
    borderRadius:20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

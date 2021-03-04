import React from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MenssagesButton } from './components/commons';

import {Button, TouchableOpacity} from 'react-native';


import Main from './pages/Main';
import Intro from './pages/Intro';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Perfil from './pages/Perfil';
import Messages from './pages/Messages';
import Chat from './pages/Chat';


const Stack = createStackNavigator();

function Routes() {

    return(
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Intro" component={Intro} options={{
              headerTitle:"H-Care",
              headerTitleAlign:"center",
              headerShown: false,
            }}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{
              headerTitle: "Criar Conta"
            }}/>
            <Stack.Screen name="SignIn" component={SignIn} options={{
              headerTitle:"Fazer Login"
            }}/>
            <Stack.Screen name="Main" component={Main} options={{
              headerTitle: "H-Care",
              headerTitleAlign: "center",
              headerLeft: null,
              headerRight: () => (
                <MenssagesButton/>
              ),
            }}/>
            <Stack.Screen name="Perfil" component={Perfil} options={{headerShown:false}}/>
            <Stack.Screen name="Messages" component={Messages} options={{
              headerTitle: "Mensagens"
            }}/>
            <Stack.Screen name="Chat" component={Chat} options={{
              headerTitle: "Chat com ..."
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default Routes;
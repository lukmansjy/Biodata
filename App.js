import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/containers/pages/Home';
import Add from './src/containers/pages/Add'
import Detail from './src/containers/pages/Detail'

const Stack = createStackNavigator();

const App = ()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Add" component={Add} />
                <Stack.Screen name="Detail" component={Detail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App

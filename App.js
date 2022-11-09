import * as ScreenOrientation from 'expo-screen-orientation'
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonList from "./src/PokemonList";
import PokemonDetail from "./src/PokemonDetail";
import {background, statusBar, text} from "./src/colors";

const theme = {
    dark: false,
    colors: {
        background: background,
        card: statusBar,
        text: text,
        //border: background,
        //notification: background,
    },
}

export default function App() {
    const Stack = createNativeStackNavigator();

    const StackComponent = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Pokedex" component={PokemonList}/>
                <Stack.Screen name="Detail" component={PokemonDetail} />
            </Stack.Navigator>
        );
    };

    return (
        <NavigationContainer theme={theme}>
            <StackComponent></StackComponent>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

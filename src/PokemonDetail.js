import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextComponent
} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from "react-native-paper";
import {background, typeColors, typeColorsDesaturated, text} from "./colors";

const PokemonDetail = ({route}) => {
    const {item} = route.params;
    const regionalId = item.id - 151;
    const mainTypeColor = typeColorsDesaturated[item.types[0].type.name];


    //console.log(item.sprites.other);

    return (
        <View style={styles.container}>
            <View style={[styles.identitySection, {backgroundColor: mainTypeColor}]}>
                <View style={styles.idNameContainer}>
                    <Image style={styles.pokeballIcon} source={require('../assets/pokeball_icon.png')}></Image>
                    <Text
                        style={styles.idText}>{"000".slice(regionalId.toString().length) + regionalId.toString()}</Text>
                    <Text
                        style={styles.idText}>{item.name.slice(0, 1).toUpperCase() + item.name.slice(1, item.name.length)}</Text>
                </View>
                <Image style={styles.pokemonSprite} source={{uri: item.sprites.other['official-artwork'].front_default}}></Image>
                <Text style={styles.nicknameText}>Herb Pokemon</Text>
            </View>

            <View style={styles.typeContainer}>
                {
                    item.types.map((type, index) => (
                        <Text key={type + index}
                              style={[styles.typeText, {backgroundColor: typeColors[type.type.name]}]}>
                            {type.type.name}
                        </Text>
                    ))}
            </View>

            <View style={styles.measuresContainer}>
                <Text style={{color: text, marginRight: 60}}>Height: {Number(item.height/39.37).toFixed(2)} m</Text>
                <Text style={{color: text}}>Weight: {Number(item.weight/10).toFixed(2)} Kg</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    // Containers
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: 0,
        backgroundColor: background,
    },
    identitySection: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        borderBottomStartRadius: 24,
        borderBottomEndRadius: 24,
    },
    idNameContainer: {
        flexDirection: "row",
    },
    nicknameRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        //backgroundColor: "orangered",
    },
    typeContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12,
        borderRadius: 4,
    },
    measuresContainer: {
        //borderWidth: 3,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        borderRadius: 10,
    },
    weightContainer: {
        borderStyle: 'dotted',
        //borderWidth: 1,
        borderRadius: 1,
    },
    // Texts
    idText: {
        fontSize: 18,
        textAlign: "center",
        marginRight: 18,
    },
    nameText: {
        fontSize: 28,
        textAlign: "center",
        textTransform:"capitalize"
    },
    nicknameText: {
        fontSize: 16,
        marginRight: 8,
    },
    typeText: {
        paddingHorizontal: 26,
        paddingVertical: 8,
        marginLeft: 6,
        borderRadius: 1000,
        fontSize: 18,
        fontWeight: "450",
    },
    // Images
    pokemonSprite: {
        width: 220,
        height: 220,
        resizeMode: 'contain',
    },
    pokeballIcon: {
        width: 26,
        height: 26,
        marginRight: 2,
        transform: [{rotateZ: '-10deg'}],
    },
});

export default PokemonDetail;
import { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { background, typeColors, typeColorsDesaturated, text } from "./colors";

const PokemonDetail = ({ route }) => {
    const { item } = route.params;
    const regionalId = item.id - 151;
    const mainTypeColor = typeColorsDesaturated[item.types[0].type.name];

    const [isLoading, setLoading] = useState(true);
    const [species, setSpecies] = useState({});

    //console.log(item.sprites.other);

    const fetchSpecie = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${item.id}`);
            const json = await response.json();
            setSpecies(json);
            //console.log(species.keys);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const getEnglishFlavorText = (textEntries) => {
        for (let i = 0; i < textEntries.length; i++) {
            if (textEntries[i].language.name == 'en') {
                return textEntries[i].flavor_text.replace(/(\r\n|\n|\r)/gm, ' ');
            }
        }

        return '';
    }

    useEffect(() => {
        fetchSpecie();
    }, [])

    return (
        <View style={styles.container}>
            <View style={[styles.identitySection, { backgroundColor: mainTypeColor }]}>
                <View style={styles.idNameContainer}>
                    <Image style={styles.pokeballIcon} source={require('../assets/pokeball_icon.png')}></Image>
                    <Text
                        style={styles.idText}>{"000".slice(regionalId.toString().length) + regionalId.toString()}</Text>
                    <Text
                        style={styles.idText}>{item.name.slice(0, 1).toUpperCase() + item.name.slice(1, item.name.length)}</Text>
                </View>
                <Image style={styles.pokemonSprite}
                    source={{ uri: item.sprites.other['official-artwork'].front_default }}></Image>
                <Text style={styles.nicknameText}>{isLoading ? 'Loading' : species.genera[7].genus}</Text>
            </View>

            <View style={styles.typeContainer}>
                {
                    item.types.map((type, index) => (
                        <Text key={type + index}
                            style={[styles.typeText, { backgroundColor: typeColors[type.type.name] }]}>
                            {type.type.name.toUpperCase()}
                        </Text>
                    ))}
            </View>

            <View style={styles.measuresContainer}>
                <Text style={{ color: text, marginRight: 60 }}>Height: {Number(item.height / 39.37).toFixed(2)} m</Text>
                <Text style={{ color: text }}>Weight: {Number(item.weight / 10).toFixed(2)} Kg</Text>
            </View>
            <Text style={styles.flavorText}>{isLoading ? 'Loading' :
                getEnglishFlavorText(species.flavor_text_entries)}</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    // Containers
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: 0,
        backgroundColor: background,
    },
    identitySection: {
        flexDirection: "column",
        width: "100%",
        height: "50%",
        padding: 20,
        justifyContent: "space-around",
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
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
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
        textTransform: "capitalize"
    },
    nicknameText: {
        fontSize: 14,
    },
    typeText: {
        paddingHorizontal: 26,
        paddingVertical: 8,
        marginLeft: 6,
        borderRadius: 1000,
        fontSize: 18,
        fontWeight: "450",
    },
    flavorText: {
        color: text,
        fontSize: 16,
        marginHorizontal: 32,
        marginBottom: 24,
    },
    // Images
    pokemonSprite: {
        width: 140,
        height: 140,
        resizeMode: 'contain',
    },
    pokeballIcon: {
        width: 26,
        height: 26,
        marginRight: 2,
        transform: [{ rotateZ: '-10deg' }],
    },
});

export default PokemonDetail;
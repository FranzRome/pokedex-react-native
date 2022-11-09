import {StyleSheet, Image, Text, TouchableOpacity, View, PixelRatio} from "react-native";
import {useCallback, useState} from "react";
import { Avatar, Button, Card, Title, Paragraph} from "react-native-paper";
import {typeColorsDesaturated} from "./colors";

const PokemonCard = ({item, width, marginHorizontal, onPress}) => {

    const mainTypeColor = typeColorsDesaturated[item.types[0].type.name];
    const onLayout = useCallback(({nativeEvent}) => {
        setHeight(nativeEvent.layout.width /* * 1.618 */);
    }, []);
    const regionalId = (item.id - 151).toString();

    const [height, setHeight] = useState(0);

    const onLocalPress = () => {
        onPress(item);
    };

    return (
        <Card style={{marginRight: marginHorizontal, marginBottom: marginHorizontal, backgroundColor: mainTypeColor}}>
            <TouchableOpacity onPress={onLocalPress}>
                <View onLayout={onLayout} style={[styles.contentContainer, {height, width}]}>
                    <View style={styles.topRow}>
                        <Image style={styles.pokeballIcon} source={require('../assets/pokeball_icon.png')}></Image>
                        <Text
                            style={styles.idText}>{"000".slice(regionalId.toString().length) + regionalId}</Text>
                    </View>
                    <View style={styles.bottomRow}>
                        <Image style={styles.pokemonSprite} source={{uri: item.sprites.front_default}}></Image>
                        <Text style={styles.nameText}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Card>
    );
}

const styles = StyleSheet.create({
    // Containers
    contentContainer: {
        flexDirection: "column",
        justifyContent: "space-around",
        borderWidth: 0,
        borderColor: "#222",
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    centerRow: {
        alignItems: 'center',
    },
    bottomRow: {
        justifyContent: "center",
        alignItems: 'center',
    },
    // Texts
    idText: {
        fontSize: 16,
        textAlign: "center",
    },
    nameText: {
        fontSize: 14,
        textAlign: "center",
        textTransform: "capitalize"
    },
    // Sprites
    pokemonSprite: {
        width: 64,
        height: 64,
        resizeMode: 'contain',
    },
    pokeballIcon: {
        width: 16,
        height: 16,
        marginRight: 8,
    },
});

export default PokemonCard;
import { StyleSheet, Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { useCallback, useState, useEffect } from "react";
import { Card } from "react-native-paper";
import { typeColorsDesaturated } from "./colors";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, WithSpringConfig } from 'react-native-reanimated';

const PokemonCard = ({ item, width, marginHorizontal, onPress }) => {

    const mainTypeColor = typeColorsDesaturated[item.types[0].type.name];
    // const onLayout = useCallback(({nativeEvent}) => {
    //     setHeight(nativeEvent.layout.width /* * 1.618 */);
    // }, []);
    const regionalId = (item.id/* - 151*/).toString();

    const offset = useSharedValue(1);

    const springConfig = {
        damping: 12,
        mass: 3,
        stiffness: 150,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
    }

    // const [height, setHeight] = useState(0);

    const onLocalPress = () => {
        onPress(item);
    };

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: offset.value * 255
            }],
            opacity: 1 - offset.value
        };
    });

    useEffect(() => {
        offset.value = withSpring(0, springConfig);
    }, [])

    return (
        <Animated.View style={[styles.container, animatedStyles]}>
            <Card style={{ marginRight: marginHorizontal, marginBottom: marginHorizontal, backgroundColor: mainTypeColor }}>
                <TouchableOpacity onPress={onLocalPress}>
                    <View style={[styles.contentContainer, { height: width, width }]}>
                        <View style={styles.idRow}>
                            <Image style={styles.pokeballIcon} source={require('../assets/pokeball_icon.png')}></Image>
                            <Text style={styles.idText}>{"000".slice(regionalId.toString().length) + regionalId}</Text>
                        </View>
                        <Image style={[styles.pokemonSprite, { width: width * 2 / 3, height: width * 2 / 3 }]}
                            source={{ uri: item.sprites.front_default }}></Image>
                        <Text style={styles.nameText}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </Card>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    // Containers
    contentContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderColor: "#222",
    },
    idRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomRow: {
        justifyContent: "center",
        alignItems: 'center',
    },
    // Texts
    idText: {
        fontSize: 12,
        textAlign: "center",
    },
    nameText: {
        fontSize: 14,
        textAlign: "center",
        textTransform: "capitalize"
    },
    // Sprites
    pokemonSprite: {
        resizeMode: 'contain',
    },
    pokeballIcon: {
        width: 12,
        height: 12,
        marginRight: 8,
    },
});

export default PokemonCard;

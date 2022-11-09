import React, {useCallback, useEffect, useState} from 'react';
import {
    StyleSheet,
    FlatList,
    SafeAreaView,
    useWindowDimensions,
    StatusBar, RefreshControl
} from 'react-native';
import PokemonCard from "./PokemonCard";

const PokemonList = ({navigation, columns=2, itemsHorizontalMargin = 24}) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const width = useWindowDimensions().width;
    const cardsWidth = ((width / columns) - (itemsHorizontalMargin));

    const fetchPokemonList = async (limit, offset) => {
        try {
            let result = [];

            for (let i = offset; i <= limit; i++) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                const json = await response.json();
                //console.log("Id: " + i);
                result.push(json);
            }

            setData(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        //fetchPokemonList(251, 152);
        fetchPokemonList(251, 152);
    }, []);

    const renderItem = useCallback(({item}) => {
        return (
            <PokemonCard item={item} marginHorizontal={itemsHorizontalMargin} width={cardsWidth} onPress={(item) => {
                //console.log(item.sprites);
                navigation.navigate('Detail', {item});
            }
            }/>
        );
    }, []);

    return (
        <SafeAreaView style={{flex: 1, marginVertical: 0}}>
            <StatusBar/>
            <FlatList
                keyExtractor={item => item.id}
                refreshControl={<RefreshControl refreshing={isLoading}/>}
                numColumns={columns}
                data={data}
                renderItem={renderItem}
                //style={{backgroundColor: background}}
                contentContainerStyle={{paddingHorizontal: itemsHorizontalMargin/2, marginTop: 12}}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 0,
        //backgroundColor: background,
    },
});

export default PokemonList;
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import {
    /* StyleSheet, */
    FlatList,
    SafeAreaView,
    useWindowDimensions,
    StatusBar, RefreshControl, ActivityIndicator, View
} from 'react-native';
import PokemonCard from "./PokemonCard";
import axios from 'axios';

const LIMIT = 20;
const MAX_POKEMON = 100;

const PokemonList = ({ navigation, itemsHorizontalMargin = 34 }) => {
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;
    const [offset, setOffset] = useState(1);
    const columns = (width / height > 1) ? 5 : 2;
    const cardsWidth = ((width / columns) - (itemsHorizontalMargin));

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchPokemonList = useCallback(async (limit, offset) => {
        setIsLoading(true);
        //console.log('isLoading: ' + isLoading);
        try {
            const results = [...Array.from({ length: limit }).keys()]
                .map(async (index) => {
                    //console.log(index + offset);
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + offset + 151}`);
                    setIsLoading(false);
                    return response.json();
                });
            return Promise.all(results);
        } catch (error) {
            console.error(error);
        } finally {
            //console.log(isLoading);
            //
            //console.log(isLoading);
        }
    }, []);

    const retrievePokemons = useCallback((limit = LIMIT) => {
        /*if (isLoading) {
            return;
        }*/
        fetchPokemonList(limit, offset).then((result) => {
            setData(d => [...d, ...result]);
        });
    }, [offset, isLoading]);

    useEffect(() => {
        console.log('offset: ' + offset);
        if (offset === MAX_POKEMON) {
            retrievePokemons(offset % LIMIT);
            return;
        }
        setIsLoading(true);
        //console.log(isLoading);
        retrievePokemons();
    }, [offset]);

    const renderItem = useCallback(({ item }) => {
        return (
            <PokemonCard item={item} marginHorizontal={itemsHorizontalMargin} width={cardsWidth} onPress={(item) => {
                //console.log(item.sprites);
                navigation.navigate('Detail', { item });
            }
            } />
        );
    }, []);

    const onEndReached = useCallback(() => {
        if(isLoading) return;

        console.log('onEndReached');
        setOffset(oldOffset => {
            const newOffset = oldOffset + LIMIT >= MAX_POKEMON ? MAX_POKEMON : oldOffset + LIMIT;
            if (newOffset === oldOffset) {
                return oldOffset;
            }
            return newOffset;
        });
    }, []);

    const getItemLayout = useCallback((data, index) => (
        { length: cardsWidth + itemsHorizontalMargin, offset: (cardsWidth + itemsHorizontalMargin) * index, index }
    ), []);

    return (
        <SafeAreaView style={{ flex: 1, marginVertical: 0 }}>
            <StatusBar />
            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} tintColor="white" />}
                numColumns={columns}
                data={data}
                renderItem={renderItem}
                onEndReachedThreshold={1.2}
                getItemLayout={getItemLayout}
                initialNumToRender={8}
                onEndReached={onEndReached}
                ListFooterComponent={
                    <View style={{ padding: 16, justifyContent: 'center', alignItems: 'center' }}>
                        {isLoading ? <ActivityIndicator size="large" color="white" /> : <></>}
                    </View>
                }
                //style={{backgroundColor: background}}
                contentContainerStyle={{ paddingHorizontal: itemsHorizontalMargin / 2, marginTop: 12 }}
            />
        </SafeAreaView>
    );
}

/*
const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 0,
        //backgroundColor: background,
    },
});
*/

export default PokemonList;

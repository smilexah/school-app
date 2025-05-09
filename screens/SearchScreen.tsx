import React, {useState} from 'react'
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

export default function SearchScreen() {
    const [query, setQuery] = useState('')
    const nav = useNavigation<any>()

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <Ionicons name="search" size={20} color="#888"/>
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={query}
                    onChangeText={setQuery}
                />
                <TouchableOpacity onPress={() => nav.navigate('Filter')}>
                    <Ionicons name="filter" size={24} color="#888"/>
                </TouchableOpacity>
            </View>
            {/* Здесь позже можно отрисовать текст «Results for …» или список */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 16, backgroundColor: '#fff'},
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 3,
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 50,
    },
    input: {
        flex: 1,
        marginHorizontal: 8,
        fontSize: 16,
    },
})

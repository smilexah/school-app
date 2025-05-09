import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>👤 Profile Screen</Text>
            <Text style={styles.subText}>
                Здесь можно показать настройки, авторизацию и т.п.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 12,
    },
    subText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
})

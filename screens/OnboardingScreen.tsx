import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

export default function OnboardingScreen() {
    const nav = useNavigation<any>()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="sunny" size={40} color="#F5D33A"/>
                <Image
                    source={require('../assets/school.png')}
                    style={styles.image}
                />
                <Ionicons name="sunny" size={40} color="#F5D33A"/>
            </View>

            <View style={styles.bullets}>
                {[
                    'Search for schools on the map',
                    'View school details',
                    'Add new schools',
                ].map((text) => (
                    <View key={text} style={styles.bulletRow}>
                        <Ionicons
                            name="checkmark-circle"
                            size={20}
                            color="#333"
                        />
                        <Text style={styles.bulletText}>{text}</Text>
                    </View>
                ))}
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => nav.replace('MainTabs')}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 24,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    bullets: {
        width: '100%',
        paddingHorizontal: 16,
    },
    bulletRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    bulletText: {
        marginLeft: 12,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#D27C5C',
        paddingVertical: 16,
        paddingHorizontal: 48,
        borderRadius: 30,
        marginBottom: 32,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
})

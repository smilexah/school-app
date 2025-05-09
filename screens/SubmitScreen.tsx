import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Easing} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';

export default function SubmitScreen() {
    const nav = useNavigation();
    const scaleValue = React.useRef(new Animated.Value(0.8)).current;

    React.useEffect(() => {
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 400,
            easing: Easing.out(Easing.back(1.2)),
            useNativeDriver: true,
        }).start();
    }, []);

    const handlePress = () => {
        Animated.timing(scaleValue, {
            toValue: 0.9,
            duration: 200,
            useNativeDriver: true,
        }).start(() => nav.navigate('Map' as never));
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.content, {transform: [{scale: scaleValue}]}]}>
                <View style={styles.iconCircle}>
                    <Ionicons name="checkmark-done" size={48} color="#FFF"/>
                </View>

                <Text style={styles.title}>Submission Successful!</Text>
                <Text style={styles.subtitle}>
                    Thank you for contributing to our community. Your input helps us improve the experience for
                    everyone.
                </Text>

                <TouchableOpacity
                    onPress={handlePress}
                    style={styles.btn}
                    activeOpacity={0.9}
                >
                    <Text style={styles.btnTxt}>Back to Map</Text>
                    <Ionicons name="map" size={20} color="#FFF" style={styles.btnIcon}/>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#F9F9F9',
    },
    content: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#4BB543',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 16,
        color: '#333',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
        textAlign: 'center',
        marginBottom: 32,
        paddingHorizontal: 16,
    },
    btn: {
        backgroundColor: '#D27C5C',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.7,
        maxWidth: 300,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    btnTxt: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 16,
    },
    btnIcon: {
        marginLeft: 8,
    },
});
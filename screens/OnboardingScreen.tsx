import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Animated,
    Easing,
    Dimensions
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

export default function OnboardingScreen() {
    const nav = useNavigation<any>();
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(100)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                easing: Easing.out(Easing.back(1)),
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const handleGetStarted = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start(() => nav.replace('MainTabs'));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View
                style={[
                    styles.header,
                    {opacity: fadeAnim, transform: [{translateY: slideAnim}]}
                ]}
            >
                <Ionicons name="sunny" size={40} color="#F5D33A" style={styles.sunIcon}/>
                <Image
                    source={require('../assets/school.png')}
                    style={styles.image}
                />
                <Ionicons name="sunny" size={40} color="#F5D33A" style={styles.sunIcon}/>
            </Animated.View>

            <Animated.View
                style={[
                    styles.content,
                    {opacity: fadeAnim, transform: [{translateY: slideAnim}]}
                ]}
            >
                <Text style={styles.title}>Discover Schools Around You</Text>

                <View style={styles.bullets}>
                    {[
                        'Find schools on an interactive map',
                        'View detailed information and ratings',
                        'Contribute by adding new locations',
                    ].map((text, index) => (
                        <View key={index} style={styles.bulletRow}>
                            <Ionicons
                                name="checkmark-circle"
                                size={24}
                                color="#D27C5C"
                                style={styles.bulletIcon}
                            />
                            <Text style={styles.bulletText}>{text}</Text>
                        </View>
                    ))}
                </View>
            </Animated.View>

            <Animated.View style={{opacity: fadeAnim}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleGetStarted}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon}/>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 40,
    },
    sunIcon: {
        marginHorizontal: 20,
        opacity: 0.8,
    },
    image: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 32,
        textAlign: 'center',
        lineHeight: 32,
    },
    bullets: {
        width: '100%',
        paddingHorizontal: 24,
    },
    bulletRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    bulletIcon: {
        marginRight: 12,
    },
    bulletText: {
        fontSize: 16,
        color: '#444',
        flex: 1,
        lineHeight: 22,
    },
    button: {
        backgroundColor: '#D27C5C',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        marginBottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.8,
        shadowColor: '#D27C5C',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    buttonIcon: {
        marginLeft: 8,
    },
});
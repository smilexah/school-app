import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SchoolsContext } from '../context/SchoolsContext';
import { useNavigation } from '@react-navigation/native';

export default function SchoolDetailScreen({ route }: any) {
    const navigation = useNavigation();
    const { schoolId } = route.params;
    const { schools } = useContext(SchoolsContext);
    const school = schools.find((item) => item.id === schoolId);

    if (!school) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>School not found</Text>
            </View>
        );
    }

    const { name, address, phone, website, category, photoUri } = school;

    const handleWebsitePress = () => {
        if (website) {
            Linking.openURL(website.startsWith('http') ? website : `https://${website}`);
        }
    };

    const handlePhonePress = () => {
        if (phone) {
            Linking.openURL(`tel:${phone}`);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={photoUri ? { uri: photoUri } : require('../assets/default-school.png')}
                    style={styles.image}
                />
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <View style={styles.imageOverlay} />
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.schoolName}>{name}</Text>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.category}>{category}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Information</Text>

                    <View style={styles.infoBox}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="location-sharp" size={20} color="#fff" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.infoLabel}>Address</Text>
                            <Text style={styles.infoText}>{address || 'No address provided'}</Text>
                        </View>
                    </View>

                    <View style={styles.infoBox}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="call" size={20} color="#fff" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.infoLabel}>Phone</Text>
                            {phone ? (
                                <TouchableOpacity onPress={handlePhonePress}>
                                    <Text style={[styles.infoText, styles.linkText]}>{phone}</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text style={styles.infoText}>No phone number provided</Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.infoBox}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="link" size={20} color="#fff" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.infoLabel}>Website</Text>
                            {website ? (
                                <TouchableOpacity onPress={handleWebsitePress}>
                                    <Text style={[styles.infoText, styles.linkText]}>{website}</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text style={styles.infoText}>No website provided</Text>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    notFoundText: {
        fontSize: 18,
        color: '#666',
    },
    header: {
        height: 250,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 2,
        backgroundColor: 'rgba(210, 124, 92, 0.8)',
        borderRadius: 20,
        padding: 5,
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    titleContainer: {
        marginBottom: 20,
    },
    schoolName: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 8,
    },
    categoryContainer: {
        backgroundColor: '#F8E8E0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    category: {
        fontSize: 14,
        color: '#D27C5C',
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 15,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 15,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    iconContainer: {
        backgroundColor: '#D27C5C',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 2,
    },
    infoText: {
        fontSize: 16,
        color: '#34495e',
    },
    linkText: {
        color: '#D27C5C',
        textDecorationLine: 'underline',
    },
});
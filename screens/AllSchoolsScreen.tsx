import React, { useContext } from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    Linking,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SchoolsContext } from '../context/SchoolsContext'
import { MaterialIcons } from '@expo/vector-icons'

export default function AllSchoolsScreen() {
    const { schools } = useContext(SchoolsContext)
    const nav = useNavigation<any>()
    const { width } = Dimensions.get('window')

    if (schools.length === 0) {
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyText}>No schools added yet.</Text>
            </View>
        )
    }

    const defaultSchoolImage = require('../assets/default-school.png')

    const handleWebsitePress = (website: string) => {
        Linking.openURL(website.startsWith('http') ? website : `https://${website}`)
    }

    return (
        <FlatList
            data={schools}
            keyExtractor={(s) => s.id}
            ListHeaderComponent={() => (
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>All Schools</Text>
                    <Image
                        source={defaultSchoolImage}
                        style={[styles.headerImage, { width: width - 32 }]}
                    />
                </View>
            )}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => nav.navigate('Detail', { schoolId: item.id })}
                    activeOpacity={0.8}
                >
                    <Image
                        source={item.photoUri ? { uri: item.photoUri } : defaultSchoolImage}
                        style={styles.schoolImage}
                    />
                    <View style={styles.detailsContainer}>
                        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>

                        <View style={styles.infoRow}>
                            <MaterialIcons name="location-on" size={16} color="#666" />
                            <Text style={[styles.address, !item.address && styles.placeholder]} numberOfLines={2}>
                                {item.address || 'Address not available'}
                            </Text>
                        </View>

                        {item.website ? (
                            <TouchableOpacity
                                style={styles.infoRow}
                                onPress={() => item.website && handleWebsitePress(item.website)}
                            >
                                <MaterialIcons name="link" size={16} color="#007AFF" />
                                <Text style={styles.website} numberOfLines={1}>
                                    {item.website.replace(/^https?:\/\//, '')}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.infoRow}>
                                <MaterialIcons name="link" size={16} color="#999" />
                                <Text style={[styles.noWebsite, styles.placeholder]}>
                                    No website provided
                                </Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginVertical: 24,
        color: '#2c3e50',
        textAlign: 'center',
    },
    headerImage: {
        height: 180,
        resizeMode: 'cover',
        borderRadius: 12,
    },
    listContainer: {
        paddingBottom: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 12,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    schoolImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 12,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    address: {
        fontSize: 14,
        color: '#666',
        marginLeft: 6,
        flex: 1,
    },
    website: {
        fontSize: 14,
        color: '#007AFF',
        marginLeft: 6,
        flex: 1,
        textDecorationLine: 'underline',
    },
    placeholder: {
        color: '#999',
        fontStyle: 'italic',
    },
    noWebsite: {
        fontSize: 14,
        color: '#999',
        marginLeft: 6,
        flex: 1,
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
})
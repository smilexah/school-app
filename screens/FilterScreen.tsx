import React, {useContext} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView, Platform,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {FilterContext} from '../context/FilterContext';

const categoriesList = [
    'Private',
    'Lyceum',
    'Gymnasium',
    'International',
    'General Education',
    'For Special Children',
];

export default function FilterScreen() {
    const navigation = useNavigation<any>();
    const {
        categories,
        toggleCategory,
        clearCategories,
    } = useContext(FilterContext);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#D27C5C"/>
                </TouchableOpacity>
                <Text style={styles.title}>Filter Schools</Text>
                <View style={{width: 24}}/>
            </View>

            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name="funnel"
                        size={40}
                        color="#D27C5C"
                    />
                </View>

                <Text style={styles.subTitle}>
                    Choose type of school:
                </Text>

                <ScrollView
                    contentContainerStyle={styles.chipsContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {categoriesList.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => toggleCategory(cat)}
                            style={[
                                styles.chip,
                                categories.includes(cat) && styles.chipActive,
                            ]}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    styles.chipText,
                                    categories.includes(cat) && styles.chipTextActive,
                                ]}
                            >
                                {cat}
                            </Text>
                            {categories.includes(cat) && (
                                <Ionicons
                                    name="checkmark"
                                    size={16}
                                    color="#fff"
                                    style={styles.checkIcon}
                                />
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.clearBtn}
                        onPress={() => {
                            clearCategories();
                            navigation.goBack();
                        }}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.clearBtnText}>Clear All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.searchBtn}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.searchBtnText}>Apply Filters</Text>
                        <Ionicons name="search" size={18} color="#fff"/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    content: {
        flex: 1,
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    subTitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 16,
        fontWeight: '500',
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 24,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        margin: 6,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    chipActive: {
        backgroundColor: '#D27C5C',
        borderColor: '#D27C5C',
    },
    chipText: {
        color: '#555',
        fontSize: 14,
        fontWeight: '500',
    },
    chipTextActive: {
        color: '#fff',
    },
    checkIcon: {
        marginLeft: 6,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto',
        paddingBottom: 16,
    },
    searchBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D27C5C',
        paddingVertical: 14,
        borderRadius: 10,
        marginLeft: 12,
    },
    searchBtnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        marginRight: 8,
    },
    clearBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D27C5C',
        paddingVertical: 14,
        borderRadius: 10,
        marginRight: 12,
    },
    clearBtnText: {
        color: '#D27C5C',
        fontWeight: '600',
        fontSize: 16,
    },
});
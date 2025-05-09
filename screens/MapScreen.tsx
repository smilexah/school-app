import React, {useContext, useEffect, useState, useRef} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform,
    PermissionsAndroid,
    Alert,
} from 'react-native';
import MapView, {Marker, UrlTile, Circle} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import {SchoolsContext} from '../context/SchoolsContext';
import {FilterContext} from "../context/FilterContext";
import Geolocation from 'react-native-geolocation-service';

export default function MapScreen() {
    const {schools} = useContext(SchoolsContext);
    const {query, setQuery, categories} = useContext(FilterContext);
    const nav = useNavigation<any>();
    const mapRef = useRef<MapView>(null);
    const [userLocation, setUserLocation] = useState<{
        latitude: number;
        longitude: number;
        accuracy: number;
    } | null>(null);

    const [region, setRegion] = useState({
        latitude: 43.2078848,
        longitude: 76.6509056,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    useEffect(() => {
        if (schools.length) {
            const {latitude, longitude} = schools[schools.length - 1].location;
            setRegion((r) => ({...r, latitude, longitude}));
        }
    }, [schools]);

    const requestLocationPermission = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'This app needs access to your location',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else {
                return true;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const getCurrentLocation = async () => {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
            Alert.alert(
                'Permission Denied',
                'Please enable location permissions in settings'
            );
            return;
        }

        Geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude, accuracy} = position.coords;
                setUserLocation({latitude, longitude, accuracy});

                // Center map on user location
                mapRef.current?.animateToRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                });
            },
            (error) => {
                Alert.alert('Error', 'Could not get your current location');
                console.error(error);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        );
    };

    const filtered = schools.filter(s => {
        const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
        const matchesCat =
            categories.length === 0 || categories.includes(s.category);
        return matchesQuery && matchesCat;
    });

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
                showsUserLocation={false}
                showsMyLocationButton={false}
            >
                <UrlTile
                    urlTemplate="https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={19}
                />

                {userLocation && (
                    <Circle
                        center={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                        }}
                        radius={userLocation.accuracy}
                        strokeWidth={1}
                        strokeColor="rgba(210, 124, 92, 0.5)"
                        fillColor="rgba(210, 124, 92, 0.2)"
                    />
                )}

                {userLocation && (
                    <Marker
                        coordinate={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                        }}
                        anchor={{x: 0.5, y: 0.5}}
                    >
                        <View style={styles.userLocationMarker}>
                            <View style={styles.userLocationInner}/>
                        </View>
                    </Marker>
                )}

                {filtered.map(s => (
                    <Marker
                        key={s.id}
                        coordinate={s.location}
                        title={s.name}
                        onPress={() => nav.navigate('Detail', {schoolId: s.id})}
                    />
                ))}
            </MapView>

            <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="#888"/>
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={query}
                    onChangeText={setQuery}
                />
                <TouchableOpacity onPress={() => nav.navigate('Filter')}>
                    <Ionicons
                        name="filter"
                        size={24}
                        color={categories.length ? '#D27C5C' : '#888'}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.locationButton}
                onPress={getCurrentLocation}
            >
                <Ionicons name="locate" size={24} color="#D27C5C"/>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => nav.navigate('AddSchool')}
            >
                <Ionicons name="add" size={28} color="#fff"/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1},
    map: {flex: 1},
    searchBar: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 40,
        left: 20,
        right: 20,
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        flex: 1,
        marginHorizontal: 8,
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#D27C5C',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    locationButton: {
        position: 'absolute',
        bottom: 90,
        right: 24,
        backgroundColor: '#fff',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    userLocationMarker: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(210, 124, 92, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userLocationInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#D27C5C',
    },
});
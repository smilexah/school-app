import React, {useState, useContext, useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    Platform,
    ScrollView,
} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import {Ionicons} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {SchoolsContext} from '../context/SchoolsContext';
import {School} from '../types';
import uuid from 'react-native-uuid';

const categoriesList = [
    'Private',
    'Lyceum',
    'Gymnasium',
    'International',
    'General Education',
    'For Special Children',
];

export default function AddSchoolScreen() {
    const navigation = useNavigation<any>();
    const {addSchool} = useContext(SchoolsContext);

    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    const [phone, setPhone] = useState('');
    const [category, setCategory] = useState(categoriesList[0]);
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [photoUri, setPhotoUri] = useState<string | null>(null);

    const defaultRegion: Region = {
        latitude: 43.2078848,
        longitude: 76.6509056,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };
    const [region, setRegion] = useState<Region>(defaultRegion);
    const [manualSelect, setManualSelect] = useState(false);

    useEffect(() => {
        if (!coords) return;
        (async () => {
            try {
                const [place] = await Location.reverseGeocodeAsync(coords);
                const formatted = [
                    place.name,
                    place.street,
                    place.city,
                    place.region,
                    place.country,
                ]
                    .filter(Boolean)
                    .join(', ');
                setAddress(formatted);
            } catch {
                setAddress(`${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`);
            }
        })();
    }, [coords]);

    const fetchLocation = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Cannot access location');
            return;
        }
        const {coords} = await Location.getCurrentPositionAsync({});
        setCoords({latitude: coords.latitude, longitude: coords.longitude});
        setRegion({
            ...region,
            latitude: coords.latitude,
            longitude: coords.longitude,
        });
        setManualSelect(false);
    };

    const pickPhoto = async () => {
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });
        if (!res.canceled && res.assets && res.assets[0]) setPhotoUri(res.assets[0].uri);
    };

    const onSubmit = () => {
        if (!name.trim() || !coords) {
            Alert.alert('Oops', 'Please enter name and select location.');
            return;
        }
        const newSchool: School = {
            id: uuid.v4().toString(),
            name: name.trim(),
            website: website.trim() || undefined,
            phone: phone.trim() || undefined,
            category,
            location: coords,
            address: address ?? '',
            photoUri: photoUri ?? undefined,
        };
        addSchool(newSchool);
        navigation.navigate('Submit');
    };

    return (
        <View style={styles.container}>
            {/* Header with back button */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#D27C5C" />
                </TouchableOpacity>
                <Text style={styles.header}>Add New School</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* School Name */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>School Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter school name"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                {/* Website */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Website</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="https://example.com"
                        placeholderTextColor="#999"
                        value={website}
                        onChangeText={setWebsite}
                        keyboardType="url"
                        autoCapitalize="none"
                    />
                </View>

                {/* Phone Number */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="+7 777 123 4567"
                        placeholderTextColor="#999"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                </View>

                {/* Location */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Location</Text>
                    <TouchableOpacity style={styles.locationRow} onPress={fetchLocation}>
                        <View style={styles.locationIcon}>
                            <Ionicons name="location-sharp" size={20} color="#D27C5C"/>
                        </View>
                        <View style={styles.locationTexts}>
                            <Text style={styles.locationText}>Use current location</Text>
                            {address && <Text style={styles.addressText}>{address}</Text>}
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999"/>
                    </TouchableOpacity>
                </View>

                {/* Manual map pick */}
                <TouchableOpacity
                    style={styles.manualBtn}
                    onPress={() => setManualSelect((v) => !v)}
                >
                    <Text style={styles.manualBtnText}>
                        {manualSelect ? 'Cancel map selection' : 'Or select location on map'}
                    </Text>
                </TouchableOpacity>
                {manualSelect && (
                    <MapView
                        style={styles.mapPicker}
                        initialRegion={region}
                        onPress={(e) => {
                            const c = e.nativeEvent.coordinate;
                            setCoords(c);
                            setRegion({...region, ...c});
                        }}
                    >
                        {coords && <Marker coordinate={coords}/>}
                    </MapView>
                )}

                {/* Category */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Category</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={category}
                            onValueChange={(val) => setCategory(val)}
                            mode="dropdown"
                            dropdownIconColor="#D27C5C"
                        >
                            {categoriesList.map((cat) => (
                                <Picker.Item key={cat} label={cat} value={cat}/>
                            ))}
                        </Picker>
                    </View>
                </View>

                {/* Photo */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Upload Photo</Text>
                    <TouchableOpacity style={styles.photoBox} onPress={pickPhoto}>
                        {photoUri ? (
                            <Image source={{uri: photoUri}} style={styles.photo}/>
                        ) : (
                            <View style={styles.photoPlaceholder}>
                                <Ionicons name="image-outline" size={40} color="#D27C5C"/>
                                <Text style={styles.photoPlaceholderText}>Tap to add photo</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
                    <Text style={styles.submitText}>Add School</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 50 : 20,
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        marginRight: 15,
    },
    header: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    locationIcon: {
        marginRight: 10,
    },
    locationTexts: {
        flex: 1,
    },
    locationText: {
        fontSize: 16,
        color: '#333',
    },
    addressText: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    manualBtn: {
        marginTop: -10,
        marginBottom: 20,
        padding: 8,
        alignSelf: 'flex-start',
    },
    manualBtnText: {
        color: '#D27C5C',
        fontWeight: '600',
    },
    mapPicker: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
    },
    photoBox: {
        height: 150,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    photo: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    photoPlaceholder: {
        alignItems: 'center',
    },
    photoPlaceholderText: {
        marginTop: 8,
        color: '#D27C5C',
    },
    submitBtn: {
        backgroundColor: '#D27C5C',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    submitText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
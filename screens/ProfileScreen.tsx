import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const fakeUserData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    school: 'Stanford University',
    role: 'Teacher',
    joinedDate: 'Joined September 2020',
    stats: {
        contributions: 24,
        verified: 12,
        favorites: 8,
    },
};

export default function ProfileScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/avatar.png')}
                    style={styles.avatar}
                    resizeMode="cover"
                />
                <Text style={styles.name}>{fakeUserData.name}</Text>
                <Text style={styles.email}>{fakeUserData.email}</Text>

                <View style={styles.badge}>
                    <Ionicons name="shield-checkmark" size={16} color="#4CAF50" />
                    <Text style={styles.badgeText}>Verified User</Text>
                </View>
            </View>

            <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                    <Ionicons name="school" size={20} color="#D27C5C" />
                    <Text style={styles.infoText}>{fakeUserData.school}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="briefcase" size={20} color="#D27C5C" />
                    <Text style={styles.infoText}>{fakeUserData.role}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="calendar" size={20} color="#D27C5C" />
                    <Text style={styles.infoText}>{fakeUserData.joinedDate}</Text>
                </View>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{fakeUserData.stats.contributions}</Text>
                    <Text style={styles.statLabel}>Contributions</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{fakeUserData.stats.verified}</Text>
                    <Text style={styles.statLabel}>Verified</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{fakeUserData.stats.favorites}</Text>
                    <Text style={styles.statLabel}>Favorites</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Settings</Text>
                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="notifications" size={20} color="#555" />
                    <Text style={styles.menuText}>Notification Settings</Text>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="lock-closed" size={20} color="#555" />
                    <Text style={styles.menuText}>Privacy</Text>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="help-circle" size={20} color="#555" />
                    <Text style={styles.menuText}>Help & Support</Text>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
        borderWidth: 3,
        borderColor: '#D27C5C',
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 8,
    },
    badgeText: {
        color: '#2E7D32',
        fontSize: 12,
        marginLeft: 4,
        fontWeight: '500',
    },
    infoSection: {
        backgroundColor: '#fff',
        marginVertical: 16,
        padding: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    infoText: {
        fontSize: 16,
        color: '#444',
        marginLeft: 12,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 16,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: '700',
        color: '#D27C5C',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textTransform: 'uppercase',
    },
    section: {
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        marginLeft: 12,
    },
    logoutButton: {
        backgroundColor: '#fff',
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    logoutText: {
        color: '#E53935',
        fontSize: 16,
        fontWeight: '500',
    },
});
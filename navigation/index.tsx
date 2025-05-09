import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import {StyleSheet, View, Text} from 'react-native';

import OnboardingScreen from '../screens/OnboardingScreen';
import MapStackNavigator from './MapStackNavigator';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
    Onboarding: undefined;
    MainTabs: undefined;
};

export type MainTabParamList = {
    MapTab: undefined;
    ListTab: undefined;
    ProfileTab: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: styles.tabBar,
                tabBarLabel: ({focused, color}) => {
                    const labels = {
                        MapTab: 'Map',
                        ListTab: 'Schools',
                        ProfileTab: 'Profile',
                    } as const;
                    return (
                        <Text style={[styles.tabLabel, {color: focused ? '#D27C5C' : '#888'}]}>
                            {labels[route.name]}
                        </Text>
                    );
                },
                tabBarIcon: ({focused, color}) => {
                    const icons = {
                        MapTab: 'map',
                        ListTab: 'school',
                        ProfileTab: 'person',
                    } as const;

                    return (
                        <View style={styles.tabIconContainer}>
                            <Ionicons
                                name={icons[route.name]}
                                size={24}
                                color={focused ? '#D27C5C' : '#888'}
                            />
                        </View>
                    );
                },
                tabBarActiveTintColor: '#D27C5C',
                tabBarInactiveTintColor: '#888',
            })}
        >
            <Tab.Screen
                name="MapTab"
                children={() => <MapStackNavigator initialScreen="Map"/>}
            />
            <Tab.Screen
                name="ListTab"
                children={() => <MapStackNavigator initialScreen="List" />}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileScreen}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 80,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
        borderTopWidth: 0,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    tabIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    tabLabel: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 5,
    },
});

export default function RootNavigator() {
    return (
        <RootStack.Navigator
            initialRouteName="Onboarding"
            screenOptions={{headerShown: false}}
        >
            <RootStack.Screen name="Onboarding" component={OnboardingScreen}/>
            <RootStack.Screen name="MainTabs" component={MainTabs}/>
        </RootStack.Navigator>
    );
}
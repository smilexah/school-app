import React, {useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import {SchoolsProvider} from "./context/SchoolsContext";
import RootNavigator from "./navigation";
import {FilterProvider} from "./context/FilterContext";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    return (
        <SchoolsProvider>
            <FilterProvider>
                <NavigationContainer>
                    <RootNavigator/>
                </NavigationContainer>
            </FilterProvider>
        </SchoolsProvider>
    )
}

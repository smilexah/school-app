import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import MapScreen from '../screens/MapScreen'
import SearchScreen from '../screens/SearchScreen'
import FilterScreen from '../screens/FilterScreen'
import AddSchoolScreen from '../screens/AddSchoolScreen'
import SubmitScreen from '../screens/SubmitScreen'
import SchoolDetailScreen from '../screens/SchoolDetailScreen'
import AllSchoolsScreen from '../screens/AllSchoolsScreen'

export type MainStackParamList = {
    Map: undefined
    Search: undefined
    Filter: undefined
    List: undefined
    AddSchool: undefined
    Submit: undefined
    Detail: { schoolId: string }
}

const Stack = createNativeStackNavigator<MainStackParamList>()

export default function MapStackNavigator({
                                              initialScreen = 'Map',
                                          }: {
    initialScreen?: keyof MainStackParamList
}) {
    return (
        <Stack.Navigator
            initialRouteName={initialScreen}
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="Map" component={MapScreen}/>
            <Stack.Screen name="Search" component={SearchScreen}/>
            <Stack.Screen name="Filter" component={FilterScreen}/>
            <Stack.Screen name="List" component={AllSchoolsScreen}/>
            <Stack.Screen name="AddSchool" component={AddSchoolScreen}/>
            <Stack.Screen name="Submit" component={SubmitScreen}/>
            <Stack.Screen name="Detail" component={SchoolDetailScreen}/>
        </Stack.Navigator>
    )
}

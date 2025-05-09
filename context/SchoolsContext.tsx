import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { School } from '../types';

type Ctx = {
    schools: School[];
    addSchool: (s: School) => void;
};

export const SchoolsContext = createContext<Ctx>({
    schools: [],
    addSchool: () => {},
});

export const SchoolsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [schools, setSchools] = useState<School[]>([]);

    useEffect(() => {
        (async () => {
            const json = await AsyncStorage.getItem('schools');
            if (json) setSchools(JSON.parse(json));
        })();
    }, []);

    const persist = async (arr: School[]) => {
        setSchools(arr);
        await AsyncStorage.setItem('schools', JSON.stringify(arr));
    };

    const addSchool = (s: School) => persist([...schools, s]);

    return (
        <SchoolsContext.Provider value={{ schools, addSchool }}>
            {children}
        </SchoolsContext.Provider>
    );
};

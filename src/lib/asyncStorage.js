import { AsyncStorage } from 'react-native';

export const _storeData = async (name, value) => {
    try {
        await AsyncStorage.setItem(name, val);
    } catch (error) {
        // Error saving data
    }
};

export const _retrieveData = async (val) => {
    try {
        const value = await AsyncStorage.getItem(val);
        if (value !== null) {
            // We have data!!
            return value;
        }
    } catch (error) {
        // Error retrieving data
    }
};
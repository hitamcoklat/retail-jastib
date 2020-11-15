import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native';
import TawaranAntar from './TabDriver/TawaranAntar'
import Performa from './TabDriver/Performa'
import Account from './TabDriver/Account'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default function CDriver({navigation}) {

    const [text, setText] = useState('');
    const hasUnsavedChanges = Boolean(text);    
    const Tab = createMaterialTopTabNavigator();

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            if (!hasUnsavedChanges) {
                // If we don't have unsaved changes, then we don't need to do anything
                return;
            }
            e.preventDefault();
        })
    }, [navigation])


    function TabPesanan() {
        return (
            <>
                <View style={{backgroundColor: '#F48734'}}>
                    <Text style={{marginVertical: 10, marginLeft: 15, color: 'white', fontSize: 18}}>Akun Driver</Text>
                </View>
                <Tab.Navigator tabBarOptions={{
                    activeTintColor: '#ffffff',
                    labelStyle: { fontSize: 14 },
                    style: {
                        fontWeight: 'bold',
                        elevation: 0,
                        backgroundColor: '#F48734'
                    },
                    indicatorStyle: {
                        borderBottomWidth: 7,
                        borderColor: '#7EAFEA'
                    }
                }}>
                    <Tab.Screen name="Antar Paket" component={TawaranAntar} />
                    <Tab.Screen name="Performa" component={Performa} />
                    <Tab.Screen name="Akun" component={Account} />
                </Tab.Navigator>
            </>
        )
    }

    return (
        <TabPesanan />
    )

}


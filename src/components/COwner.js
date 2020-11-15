import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabPesanan from './TabOwner/TabPesanan'
import ListDriver from './TabOwner/ListDriver'
import Account from './TabOwner/Account'

export default function CDriver({ navigation }) {

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


    function TabView() {
        return (
            <>
                <View style={{ backgroundColor: '#F48734' }}>
                    <Text style={{ marginVertical: 10, marginLeft: 15, color: 'white', fontSize: 18 }}>Akun Owner</Text>
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
                    <Tab.Screen name="Pesanan" component={TabPesanan} />
                    <Tab.Screen name="List Driver" component={ListDriver} />
                    <Tab.Screen name="Akun" component={Account} />
                </Tab.Navigator>
            </>
        )
    }

    return (
        <TabView />
    )

}


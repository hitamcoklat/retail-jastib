import React, { useEffect, useState, useCallback } from 'react'
import { TouchableOpacity, View, Text, ScrollView, RefreshControl, ToastAndroid, TextInput } from 'react-native';
import Proses from './TabPesanan/Proses'
import Terkirim from './TabPesanan/Terkirim'
import Batal from './TabPesanan/Batal'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default function Pesanan() {

    const Tab = createMaterialTopTabNavigator();
    const Stack = createStackNavigator();

    function TabPesanan() {
        return (
            <>
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
                    <Tab.Screen name="Proses" component={Proses} />
                    <Tab.Screen name="Disetujui" component={Terkirim} />
                    <Tab.Screen name="Batal" component={Batal} />
                </Tab.Navigator>
            </>
        )
    }    

    return (
        <TabPesanan />
    )

}


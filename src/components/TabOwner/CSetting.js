import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import OpenAppSettings from 'react-native-app-settings';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

export default function CSetting() {

    const navigation = useNavigation();
    const globalState = useSelector(state => state)

    useEffect(() => {
    }, [])

    return (

        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'white', paddingVertical: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 32, height: 32, marginLeft: 10 }} source={require('../../../assets/arrow-back-icon.png')} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 22, marginLeft: 10 }}>Setting</Text>
                </View>
            </View>        
            <WebView
                source={{
                    uri: 'https://www.google.com'
                }}
            />  
        </View>
    )
}
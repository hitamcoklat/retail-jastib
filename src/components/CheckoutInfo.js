import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setFooter } from "../redux/actions";
import { WebView } from 'react-native-webview';
import '../../global.js';

export default function CheckoutInfo() {
    
    const dispatch = useDispatch()
    const navigation = useNavigation();
    
    return (
        <>
            <View style={{backgroundColor: 'white', paddingVertical: 10, flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={{ width: 32, height: 32, marginLeft: 10 }} source={require('../../assets/arrow-back-icon.png')} />
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize: 22, marginLeft: 10}}>Cara Pembayaran</Text>
                </View>
            </View>
            <View style={{marginHorizontal: 20, marginTop: 20}}>
                <Text style={{fontSize: 16}}>
                    Silahkan lakukan konfirmasi pembayaran anda ke salah satu rekening berikut.
                </Text>
            </View>        
            <WebView style={{marginHorizontal: 20, marginTop: 20}} source={{ uri: API_URL + '/page/listBank' }} />
            <View style={{ backgroundColor: 'white', paddingVertical: 20, paddingHorizontal: 20 }}>
                <TouchableOpacity
                    onPress={() => {
                        dispatch(setFooter('two'))
                        navigation.navigate('Home')
                    }}
                    style={{ backgroundColor: 'orange', paddingVertical: 10, borderRadius: 5 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 18 }}>Konfirmasi Pembayaran</Text>
                </TouchableOpacity>
            </View> 
        </>
    )

}
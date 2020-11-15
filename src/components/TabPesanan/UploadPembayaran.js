import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

export default function UploadPembayaran({ route }) {

    const navigation = useNavigation();
    const globalState = useSelector(state => state)
    const item = route.params.item;
    const user = globalState.user.dataUser

    useEffect(() => {
        console.log(item)
        console.log(user.TOKEN)
    }, [])

    return (

        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'white', paddingVertical: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 32, height: 32, marginLeft: 10 }} source={require('../../../assets/arrow-back-icon.png')} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 20, marginLeft: 10 }}>Upload Bukti Pembayaran</Text>
                </View>
            </View>
            <WebView
                source={{
                    uri: `${LINK_SUPPORT_PAGE}/#/konfirmasi-pembayaran/${item.ID}/${user.TOKEN}`
                }}
            />
        </View>
    )
}
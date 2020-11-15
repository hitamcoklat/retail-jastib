import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image, View, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import '../../global.js';

export default function CCampaignPage({ route }) {

    const navigation = useNavigation();
    const [item, setItem] = useState(route.params.item);

    return (
        <>
            <View style={{ backgroundColor: 'white', paddingVertical: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={{ width: 32, height: 32, marginLeft: 10 }} source={require('../../assets/arrow-back-icon.png')} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 22, marginLeft: 10 }}>Jastib Campaign</Text>
                </View>
            </View>
            <WebView source={{ uri: item.URL }} />
        </>
    )

}
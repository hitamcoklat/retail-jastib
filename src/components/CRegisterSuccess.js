import React, { useState } from 'react'
import { TouchableOpacity, Image, View, Text, ImageBackground, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { useNavigation } from '@react-navigation/native';
import '../../global.js';

export default function CRegister() {

    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../../assets/bg-success-register.png')}
            style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        >
            <View style={{ marginHorizontal: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginTop: 10, flexDirection: "row-reverse" }}>
                    <Image style={{ width: 32, height: 32 }} source={require('../../assets/close-white.png')} />
                </TouchableOpacity>
                <View>
                    <View>
                        <Text style={{ color: '#F48734', fontSize: 28, marginTop: 40, fontWeight: 'bold' }}>Proses Berhasil!</Text>
                        <Text style={{ color: '#F48734', fontSize: 16 }}>Silahkan login menggunakan Email dan Password anda.</Text>
                        <Text style={{ color: '#F48734', fontSize: 16 }}>Untuk dapat melakukan Verifikasi akun anda, silahkan cek email dan klik pada link yang telah kami kirimkan!</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CLogin')}
                    style={{ backgroundColor: '#83c8e3', paddingVertical: 15, marginTop: 40 }}>
                    <View><Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>Ke Halaman Login</Text></View>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

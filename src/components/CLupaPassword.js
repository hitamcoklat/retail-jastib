import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image, View, Text, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { useNavigation } from '@react-navigation/native';

export default function CLupaPassword() {

    const navigation = useNavigation();
    const [email, setEmail] = useState("")

    useEffect(() => {

    }, [])

    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.LONG);
    };

    const handleSubmit = () => {
        let data = {
            EMAIL: email,
        }
        console.log(data)
        fetch(API_URL + '/api/loginUser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => {
                if(res.status == true) {
                    showToast('Kami telah mengirimkan Password ke Email anda!')
                } else {
                    showToast('Email tidak ditemukan!')
                }
            })
    }

    return (
        <ImageBackground
            source={require('../../assets/bg-login.png')}
            style={{ width: '100%', height: '100%' }}
        >
            <View style={{ flex: 1 }}>
                <KeyboardAwareScrollView>
                    <View style={{ marginHorizontal: 20 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('CLogin')} style={{ marginTop: 10, flexDirection: "row-reverse" }}>
                            <Image style={{ width: 32, height: 32 }} source={require('../../assets/close-white.png')} />
                        </TouchableOpacity>
                        <View>
                            <View>
                                <Text style={{ color: 'white', fontSize: 24, marginTop: 40, fontWeight: 'bold' }}>Lupa Password</Text>
                                <Text style={{ color: 'white', fontSize: 14 }}>Silahkan isi email anda untuk mendapatkan password!</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <View>
                                <View><Text style={{ fontSize: 16, color: 'white' }}>Email</Text></View>
                                <View style={{ backgroundColor: 'white' }}>
                                    <TextInput onChangeText={text => setEmail(text)} style={{ fontSize: 16 }} />
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => handleSubmit()}
                                style={{ backgroundColor: '#83c8e3', paddingVertical: 15, marginTop: 20 }}>
                                <View><Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>Submit</Text></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </ImageBackground>
    )
}

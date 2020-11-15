import React, { useState } from 'react'
import { TouchableOpacity, Image, View, Text, TextInput, Alert, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { useNavigation } from '@react-navigation/native';
import '../../global.js';

export default function CRegister() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [no_hp, setNoHP] = useState("")
    const [nama_lengkap, setNamaLengkap] = useState("")

    const navigation = useNavigation();

    const handleSubmit = () => {
        let data = {
            EMAIL : email,
            PASSWORD: password,
            NO_HP: no_hp,
            NAMA_LENGKAP: nama_lengkap
        }
        console.log(data)
        fetch(API_URL + '/api/registerUser', {
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
                navigation.navigate('CRegisterSuccess')
            } else {
                Alert.alert(
                    "Info",
                    "Terjadi Kesalahan!",
                    { cancelable: true }
                );
            }
        })

    }

    return (
        <ImageBackground
            source={require('../../assets/bg-login.png')}
            style={{ width: '100%', height: '100%' }}
        >           
        <KeyboardAwareScrollView>
            <View style={{flex: 1 }}>
                <View style={{ marginHorizontal: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginTop: 10, flexDirection: "row-reverse" }}>
                        <Image style={{ width: 32, height: 32 }} source={require('../../assets/close-white.png')} />
                    </TouchableOpacity>
                    <View>
                        <View>
                            <Text style={{ color: 'white', fontSize: 24, marginTop: 0, fontWeight: 'bold' }}>Register</Text>
                            <Text style={{ color: 'white', fontSize: 14 }}>Silahkan isi form dibawah ini untuk mendaftar!</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 30, marginBottom: 30 }}>
                        <View>
                            <View><Text style={{ fontSize: 16, color: 'white' }}>Email</Text></View>
                            <View style={{ backgroundColor: 'white' }}>
                                <TextInput onChangeText={text => setEmail(text)} style={{ fontSize: 16 }} />
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <View><Text style={{ fontSize: 16, color: 'white' }}>Password</Text></View>
                            <View style={{ backgroundColor: 'white' }}>
                                <TextInput onChangeText={text => setPassword(text)} style={{ fontSize: 16 }} />
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <View><Text style={{ fontSize: 16, color: 'white' }}>No Handphone</Text></View>
                            <View style={{ backgroundColor: 'white' }}>
                                <TextInput onChangeText={text => setNoHP(text)} style={{ fontSize: 16 }} />
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <View><Text style={{ fontSize: 16, color: 'white' }}>Nama Lengkap</Text></View>
                            <View style={{ backgroundColor: 'white' }}>
                                <TextInput onChangeText={text => setNamaLengkap(text)} style={{ fontSize: 16 }} />
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => handleSubmit()} 
                            style={{ backgroundColor: '#83c8e3', paddingVertical: 15, marginTop: 40 }}>
                            <View><Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>Daftar</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
        </ImageBackground>
    )
}

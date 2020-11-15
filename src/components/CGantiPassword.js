import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image, View, Text, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setFooter } from "../redux/actions";

export default function CGantiPassword() {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const globalState = useSelector(state => state)
    const [passwordSatu, setPasswordSatu] = useState("")
    const [passwordDua, setPasswordDua] = useState("")
    const user = globalState.user.dataUser

    useEffect(() => {
        console.log(user)
    }, [])

    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.LONG);
    };

    const handleSubmit = () => {

        if(passwordSatu !== passwordDua) {
            return showToast('Password yang anda masukan tidak sama!');
        }

        let data = {
            PASSWORD: passwordSatu,
            EMAIL: user.EMAIL,
            TOKEN: user.TOKEN
        }

        console.log(JSON.stringify(data));
        
        fetch(API_URL + '/api/gantiPassword', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => {
                if (res.status == true) {
                    Alert.alert(
                        "Info",
                        "Password berhasil dirubah",
                        [
                            { text: "OK", onPress: () => navigation.navigate('CAccount') }
                        ],
                        { cancelable: false }
                    )                    
                } else {
                    showToast('Username atau Password anda salah!')
                    console.log('Terjadi kesalahan!')
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
                        <TouchableOpacity onPress={() => {
                            dispatch(setFooter('account'))
                            navigation.navigate('Home')
                        }} style={{ marginTop: 10, flexDirection: "row-reverse" }}>
                            <Image style={{ width: 32, height: 32 }} source={require('../../assets/close-white.png')} />
                        </TouchableOpacity>
                        <View>
                            <View>
                                <Text style={{ color: 'white', fontSize: 24, marginTop: 40, fontWeight: 'bold' }}>Ganti Password</Text>
                                <Text style={{ color: 'white', fontSize: 14 }}>Silahkan ketikan password baru anda!</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <View>
                                <View><Text style={{ fontSize: 16, color: 'white' }}>Password</Text></View>
                                <View style={{ backgroundColor: 'white' }}>
                                    <TextInput secureTextEntry={true} placeholder="Masukan password baru..." onChangeText={text => setPasswordSatu(text)} style={{ fontSize: 16 }} />
                                </View>
                            </View>
                            <View style={{marginTop: 10}}>
                                <View><Text style={{ fontSize: 16, color: 'white' }}>Ketik Ulang Password</Text></View>
                                <View style={{ backgroundColor: 'white' }}>
                                    <TextInput secureTextEntry={true} placeholder="Ketik ulang password baru..." onChangeText={text => setPasswordDua(text)} style={{ fontSize: 16 }} />
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

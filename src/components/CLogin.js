import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image, View, Text, TextInput, ToastAndroid, ImageBackground, Picker, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setDataLogin, setFooter, setJenisLogin } from "../redux/actions";
import { _storeData } from '../lib/asyncStorage'
import Spinner from 'react-native-loading-spinner-overlay';
import { block } from 'react-native-reanimated';

export default function CLogin () {

    const dispatch = useDispatch()
    const globalState = useSelector(state => state)
    const user = globalState.user.dataUser;
    const jenisLogin = globalState.user.jenisLogin
    const navigation = useNavigation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [spinner, setSpinner] = useState(false)
    const [jLogin, setJLogin] = useState("CUSTOMER")

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // cek apakah sudah login atau belum disini
            console.log('Halaman login generated!')
            if(jenisLogin == 'DRIVER') {
                navigation.navigate('CDriver')
            }
            if(jenisLogin == 'OWNER') {
                navigation.navigate('COwner')
            }
        })
        return () => {
            
        }
    }, [navigation])

    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.LONG);
    };    

    const handleSubmit = () => {

        setSpinner(true)

        let data = {
            EMAIL: email,
            PASSWORD: password,
            JENIS: jLogin
        }

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
                setSpinner(false)
                if(res.status == true) {
                    dispatch(setDataLogin(res.data))
                    dispatch(setFooter('account'))
                    if(jLogin == 'DRIVER') {
                        dispatch(setJenisLogin('DRIVER'))                        
                        return navigation.navigate('CDriver')
                    } else if(jLogin == 'CUSTOMER') {
                        dispatch(setJenisLogin('CUSTOMER'))                        
                        return navigation.navigate('Home')
                    } else if(jLogin == 'OWNER') {
                        dispatch(setJenisLogin('OWNER'))                        
                        return navigation.navigate('Home')
                    }
                    navigation.navigate('Home')
                } else {
                    showToast('Username atau Password anda salah!')
                    console.log('Terjadi kesalahan!')
                }
            })
    }

    const onClickSetJenisLogin = (value) => {
        setJLogin(value)
    }

    return (
        <ImageBackground
            source={require('../../assets/bg-login.png')}
            style={{ width: '100%', height: '100%' }}
        >
        <View style={{flex: 1}}>
        <Spinner
            visible={spinner}
            textContent={'Loading...'}
            textStyle={{color: '#FFF'}}
            />
        <KeyboardAwareScrollView>
                <View style={{marginHorizontal: 20}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{marginTop: 10, flexDirection: "row-reverse"}}>
                        <Image style={{ width: 32, height: 32 }} source={require('../../assets/close-white.png')} />
                    </TouchableOpacity>
                    <View>
                        <View>
                            <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>Login</Text>
                            <Text style={{color: 'white', fontSize: 14}}>Silahkan isi form dibawah ini untuk masuk!</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 30}}>
                        <View>
                            <View><Text style={{fontSize: 16, color: 'white'}}>Email</Text></View>
                            <View style={{backgroundColor: 'white'}}>
                                <TextInput onChangeText={text => setEmail(text)} style={{fontSize: 16}} />
                            </View>
                        </View>
                        <View style={{marginTop: 20}}>
                            <View><Text style={{fontSize: 16, color: 'white'}}>Password</Text></View>
                            <View style={{backgroundColor: 'white'}}>
                                <TextInput secureTextEntry={true} onChangeText={text => setPassword(text)} style={{fontSize: 16}} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('CLupaPassword')}>
                            <Text style={{ fontSize: 16, color: 'white', textAlign: 'right' }}>Lupa Password?</Text>
                        </TouchableOpacity>
                        <View style={{marginTop: 20}}>
                            <Text style={{ fontSize: 16, color: 'white', textAlign: 'left', fontWeight: 'bold' }}>Pilih Jenis Login</Text>
                            <Picker 
                                selectedValue={jLogin}
                                onValueChange={(itemValue, itemIndex) => onClickSetJenisLogin(itemValue)}
                                style={{ fontWeight: 'bold', backgroundColor: '#5EBA7D', color: 'white' }}>
                                <Picker.Item label="CUSTOMER" value="CUSTOMER" />
                                <Picker.Item label="DRIVER" value="DRIVER" />
                                <Picker.Item label="OWNER" value="OWNER" />
                            </Picker>
                        </View>
                        <TouchableOpacity
                            onPress={() => handleSubmit()} 
                            style={{backgroundColor: '#83c8e3', paddingVertical: 15, marginTop: 20}}>
                            <View><Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>Login</Text></View>
                        </TouchableOpacity>                        
                        <View style={{marginTop: 30}}>
                            <View style={{flexDirection: "row", justifyContent: 'center'}}>
                                <Text style={{ fontSize: 16, color: 'white' }}>Belum punya akun? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('CRegister')}><Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Daftar</Text></TouchableOpacity>
                            </View>
                        </View>                        
                    </View>                    
                </View>
        </KeyboardAwareScrollView>
            </View>
        </ImageBackground>            
    )
}

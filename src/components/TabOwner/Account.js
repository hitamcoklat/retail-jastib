import React, { useEffect } from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setFooter, setLogout, setJenisLogin } from "../../redux/actions";

export default function Account () {

    const dispatch = useDispatch()
    const globalState = useSelector(state => state)
    const user = globalState.user.dataUser;
    const navigation = useNavigation();
    console.log(user)

    useEffect(() => {
        if (user.length <= 0) {
            navigation.navigate('CLogin')
            dispatch(setFooter("one"))
        }        
        const unsubscribe = navigation.addListener('focus', () => {
            if (user.length <= 0) {
                dispatch(setFooter("one"))
            }             
            // cek apakah sudah login atau belum disini
            console.log('Halaman login generated!')
        })
        return () => {
            
        }
    }, [navigation])

    const logoutButton = () => {
        dispatch(setLogout())
        dispatch(setFooter("one"))
        dispatch(setJenisLogin(""))
        navigation.navigate('Home')
    }

    if(user.length <= 0) {
        return (
            <View style={{backgroundColor: '#fff', flex: 1}}>
                <Text>Loading...</Text>
            </View>            
        )
    }

    return (
        <View>
            <View style={{backgroundColor: '#F48734', position: 'relative'}}>
                <View style={{marginHorizontal: 20, marginTop: 40, paddingBottom: 50}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{user.nama_lengkap}</Text>
                    <Text style={{fontSize: 18, fontWeight: 'normal', color: 'white'}}>{user.email}</Text>
                    <Text style={{fontSize: 16, fontWeight: 'normal', color: 'white'}}>{user.no_telp}</Text>
                </View>
            </View>
            <View style={{ backgroundColor: 'white', zIndex: -1, marginTop: 50, marginHorizontal: 35 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CSetting')}
                    style={{ paddingVertical: 10, borderTopColor: '#BBBBBB', borderTopWidth: 0.3 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'normal', fontSize: 18 }}>Setting</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CGantiPassword')}
                    style={{ paddingVertical: 10, borderTopColor: '#BBBBBB', borderTopWidth: 0.3 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'normal', fontSize: 18 }}>Ganti Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => logoutButton()}
                    style={{ paddingVertical: 10, borderTopColor: '#BBBBBB', borderTopWidth: 0.3 }}>
                    <Text style={{ textAlign: 'center', color: 'red', fontWeight: 'bold', fontSize: 18 }}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

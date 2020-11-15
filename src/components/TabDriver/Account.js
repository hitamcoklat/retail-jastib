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
                <View style={{marginHorizontal: 20, marginTop: 20, paddingBottom: 50}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{user.NAMA_LENGKAP}</Text>
                    <Text style={{fontSize: 18, fontWeight: 'normal', color: 'white'}}>{user.EMAIL}</Text>
                    <Text style={{fontSize: 16, fontWeight: 'normal', color: 'white'}}>{user.NO_HP}</Text>
                </View>
                <View style={{position: 'relative', flexDirection: 'column', alignItems: 'center', zIndex: 9999}}>
                    <View style={{width: '80%', zIndex: 9999, paddingHorizontal: 20, backgroundColor: 'white', position: 'absolute', top: -25, paddingVertical: 20}}>
                        <View style={{flexDirection: 'row'}}>
                            <Image style={{ width: 48, height: 48 }} source={require('../../../assets/wallet.png')} />
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 'normal', marginLeft: 30, color: '#4C4C4C' }}>Saldo Anda</Text>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 30, color: '#4C4C4C' }}>Rp {(user.SALDO == null) ? '0' : user.SALDO}</Text>
                            </View>
                        </View>                  
                    </View>
                </View>
            </View>
            <View style={{backgroundColor: 'white', zIndex: -1, marginTop: 90, marginHorizontal: 35}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SetLocation')} 
                    style={{paddingVertical: 10, borderTopColor: '#BBBBBB', borderTopWidth: 0.3}}>
                    <Text style={{textAlign: 'center', fontWeight: 'normal', fontSize: 18, color: 'green'}}>Set Lokasi Driver</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CGantiPassword')} 
                    style={{paddingVertical: 10, borderTopColor: '#BBBBBB', borderTopWidth: 0.3}}>
                    <Text style={{textAlign: 'center', fontWeight: 'normal', fontSize: 18}}>Ganti Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => logoutButton()} 
                    style={{paddingVertical: 10, borderTopColor: '#BBBBBB', borderTopWidth: 0.3}}>
                    <Text style={{textAlign: 'center', color: 'red', fontWeight: 'bold', fontSize: 18}}>Log Out</Text>
                </TouchableOpacity>                
            </View>
        </View>
    )
}

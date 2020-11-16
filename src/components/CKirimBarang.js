import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    PermissionsAndroid,
    Linking,
    Image
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import OpenAppSettings from 'react-native-app-settings';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setAddAlamat } from "../redux/actions";

export default function CKirimBarang() {

    const [location, setlocation] = useState(null)
    const [detail, setDetail] = useState("null")
    const [noHP, setnoHP] = useState("")
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const globalState = useSelector(state => state)
    const randString = Math.random().toString(36).substr(2, 5);
    const dataAlamat = globalState.alamat.dataAlamat;

    useEffect(() => {
        fetch(API_ASSET + '/app-config.json?' + randString)
            .then(response => response.json())
            .then(data => {
                setnoHP(data['no_hp']);
            });
        getLokasi()
    }, [])

    async function getLokasi() {

        const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        console.log(granted)

        if (granted) {
            await Geolocation.getCurrentPosition(
                position => {
                    let dataLokasi = {
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                        detail: ""
                    }
                    setlocation(dataLokasi)
                },
                error => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
        } else {
            Alert.alert('Info', 'Sharing GPS belum diaktifkan!', [
                { text: 'Tidak', onPress: () => navigation.navigate('Home') },
                { text: 'Aktifkan', onPress: () => OpenAppSettings.open() },
            ]);
        }
    }

    const pilihLokasi = () => {
        console.log(location)
        let dataLokasi = {
            lat: location.lat,
            long: location.long,
            detail: detail
        }
        dispatch(setAddAlamat(dataLokasi))
        navigation.navigate('CheckoutInfo');
    }

    return (
        <View style={{flexDirection: 'column', height: '100%'}}>
            <View style={{ backgroundColor: 'white', paddingVertical: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={{ width: 32, height: 32, marginLeft: 10 }} source={require('../../assets/arrow-back-icon.png')} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 22, marginLeft: 10 }}>Titip Barang</Text>
                </View>
            </View>
            <View style={{backgroundColor: 'pink', flex:1 }}>
                {
                    location !== null ?
                        <>
                            <WebView                            
                                source={{
                                    uri: 'https://hitamcoklat.com/smart-canvas/get-location.php?long=' + location.long + '&lat=' + location.lat,
                                }}
                            />
                        </>
                        : <></>
                }
            </View>

            <TouchableOpacity
                onPress={() => {
                    Linking.openURL(
                        'whatsapp://send?text=Halo+Jastibs+saya+ingin+mengirim+barang&phone=' + noHP
                    )
                }}            
                style={{
                    backgroundColor: '#48a868',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                <Image style={{ width: 32, height: 32, marginRight: 10 }} source={require('../../assets/call-icon.png')} />
                <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
                    Hubungi Admin</Text>
            </TouchableOpacity>
        </View>
    )
}
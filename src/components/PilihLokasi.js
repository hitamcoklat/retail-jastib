import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    PermissionsAndroid,
    TextInput
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import OpenAppSettings from 'react-native-app-settings';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setAddAlamat } from "../redux/actions";

export default function PilihLokasi() {

    const [location, setlocation] = useState(null)
    const [detail, setDetail] = useState("null")
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const globalState = useSelector(state => state)
    const dataAlamat = globalState.alamat.dataAlamat;

    useEffect(() => {
        if (__DEV__) {
            setlocation({
                lat: -7.0076377,
                long: 107.5568143
            })
        } else {
            getLokasi()
        }
    }, [])

    async function getLokasi() {

        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

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
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          Alert.alert('Info', 'Sharing GPS belum diaktifkan!', [
            {text: 'Tidak', onPress: () => navigation.navigate('Cart')},
            {text: 'Aktifkan', onPress: () => OpenAppSettings.open()},
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
        navigation.navigate('Cart');
    }    
    console.log('dari pili lokasi')
    console.log(location)

    return (

        <View style={{ flex: 1 }}>

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

            <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>Detail Alamat</Text>
                <TextInput
                    onChangeText={text => location !== null ? setDetail(text) : console.log(text)} 
                    style={{borderColor: '#6e6e6e', height: 60, textAlignVertical: 'top', borderWidth: 0.2, backgroundColor: '#CCC' }} />
            </View>

            <TouchableOpacity
                onPress={() => pilihLokasi()}
                style={{
                    backgroundColor: '#48a868',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
                    Pilih Lokasi
              </Text>
            </TouchableOpacity>
        </View>
    )
}
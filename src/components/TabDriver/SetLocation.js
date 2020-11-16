import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid, Image, ToastAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import motorIcon from '../../../assets/motor-icon_result.png'

export default function SetLocation() {

    const navigation = useNavigation();
    const [currentPosition, setCurrentPosition] = useState(null)
    const [location, setlocation] = useState(null)
    const globalState = useSelector(state => state)
    const user = globalState.user.dataUser;    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // cek apakah sudah login atau belum disini
            getLokasi()
        })
        return () => {

        }
    }, [navigation])

    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.LONG);
    };

    const pilihLokasi = () => {
        firestore()
            .collection('driverLocation')
            .doc(user.EMAIL)
            .set({
                latlng: new firestore.GeoPoint(currentPosition.latitude, currentPosition.longitude),
            }).then(() => {
                showToast('Lokasi berhasil di update!')
                console.log('User updated!');
            });        
    }

    async function getLokasi() {

        if (__DEV__) {
            return await setCurrentPosition({
                latitude: -7.0076377,
                longitude: 107.5568143,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        }

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
                    setCurrentPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    })
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

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: 'white', paddingVertical: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 32, height: 32, marginLeft: 10 }} source={require('../../../assets/arrow-back-icon.png')} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 22, marginLeft: 10 }}>Set Lokasi Anda</Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#7EAFEA' }}>
                <View style={{ paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#7EAFEA' }}>
                    <Text style={{ textAlign: 'left', fontSize: 16, color: '#FFF' }}>Berikut adalah posisi anda sekarang, silahkan Klik "Pilih Lokasi" untuk menentukan lokasi anda.</Text>
                </View>
            </View>             
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: currentPosition.latitude,
                    longitude: currentPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                <Marker
                    image={motorIcon}
                    coordinate={{
                        latitude: currentPosition.latitude,
                        longitude: currentPosition.longitude,
                    }}
                    title="Lokasi Anda"
                />
            </MapView>
            <View style={{ backgroundColor: 'white', paddingVertical: 10 }}>
                <TouchableOpacity 
                    onPress={() => pilihLokasi()}
                    style={{ backgroundColor: '#8EDBBA', paddingVertical: 15, marginHorizontal: 10, borderRadius: 5}}>
                    <Text style={{textAlign: 'center', color: 'black', fontSize: 18}}>Pilih Lokasi</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1
    }
})

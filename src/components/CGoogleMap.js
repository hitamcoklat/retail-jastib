import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import OpenAppSettings from 'react-native-app-settings';
import { useDispatch, useSelector } from 'react-redux';

export default function CGoogleMap() {

    const navigation = useNavigation();
    const [currentPosition, setCurrentPosition] = useState(null)
    const [location, setlocation] = useState(null)
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // cek apakah sudah login atau belum disini
            getLokasi()
        })
        return () => {

        }
    }, [navigation])
    
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
                console.log(dataLokasi)
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
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          Alert.alert('Info', 'Sharing GPS belum diaktifkan!', [
            {text: 'Tidak', onPress: () => navigation.navigate('Home')},
            {text: 'Aktifkan', onPress: () => OpenAppSettings.open()},
          ]);          
        }
    }    

    const getCordinate = (val) => {
        console.log(val)
    }

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: 'white', paddingVertical: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={{ width: 32, height: 32, marginLeft: 10 }} source={require('../../assets/arrow-back-icon.png')} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 22, marginLeft: 10 }}>Titip Barang</Text>
                </View>
            </View>        
            <MapView
                style={styles.map}
                onPress={(e) => console.log(e.nativeEvent.coordinate)}
                initialRegion={currentPosition}>
                <Marker
                    coordinate={{
                        latitude: -6.9166997,
                        longitude: 107.6030813                        
                    }}
                    onPress={() => console.log('klik marker')}
                />
            </MapView>
            <View style={{ backgroundColor: 'white', paddingVertical: 10 }}>
                <TouchableOpacity
                    style={{ backgroundColor: '#F48734', marginHorizontal: 20, paddingVertical: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 10, fontSize: 16 }}>Pilih Lokasi</Text>
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

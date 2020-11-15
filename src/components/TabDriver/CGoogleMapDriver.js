import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import OpenAppSettings from 'react-native-app-settings';
import MapViewDirections from 'react-native-maps-directions';
import motorIcon from '../../../assets/motor-icon_result.png'
import { useDispatch, useSelector } from 'react-redux';

export default function CGoogleMapDriver({ route }) {

    const navigation = useNavigation();
    const [currentPosition, setCurrentPosition] = useState(null)
    const [location, setlocation] = useState(null)
    const [jarak, setJarak] = useState("")
    const [origin, setOrigin] = useState({
        latitude: -6.9297957, longitude: 107.5925393
    })
    const GOOGLE_MAPS_APIKEY = GMAP_API_KEY;
    const item = route.params.item;
    const destination = { latitude: item.lat, longitude: item.long };
    console.log(item)    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // cek apakah sudah login atau belum disini
            // getLokasi()
            setCurrentPosition({
                // latitude: position.coords.latitude,
                // longitude: position.coords.longitude,
                latitude: -7.0076377,
                longitude: 107.5568143,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })            
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
                        // latitude: position.coords.latitude,
                        // longitude: position.coords.longitude,
                        latitude: -7.0076377,
                        longitude: 107.5568143,
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

    const getCordinate = (val) => {
        console.log(val)
    }

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: 'white', paddingVertical: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 32, height: 32, marginLeft: 10 }} source={require('../../../assets/arrow-back-icon.png')} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 22, marginLeft: 10 }}>Lokasi</Text>
                </View>
            </View>
            <MapView 
                style={styles.map}
                initialRegion={{
                    latitude: -6.9297957,
                    longitude: 107.5925393,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
            }}>
                {/* Lokasi Driver */}
                <Marker
                    image={motorIcon}
                    coordinate={{
                        latitude: -6.9297957,
                        longitude: 107.5925393
                    }}
                    title="Lokasi Anda"
                />            
                {/* Lokasi Tujuan */}
                <Marker
                    coordinate={{
                        latitude: item.lat,
                        longitude: item.long
                    }}
                    title="Lokasi Tujuan"
                />            
                <MapViewDirections
                    strokeWidth={5}
                    strokeColor="red"
                    optimizeWaypoints={true}
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    onReady={result => {
                        setJarak(result.distance)
                    }}
                    mode="WALKING"
                />
            </MapView>            
            <View style={{ backgroundColor: 'white', paddingVertical: 10 }}>
                <Text style={{margin: 10, fontSize: 18}}>
                    Jarak kurang lebih : {Math.ceil(jarak)} km 
                </Text>
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

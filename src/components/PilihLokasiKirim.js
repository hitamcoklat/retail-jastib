import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid, Image, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import OpenAppSettings from 'react-native-app-settings';
import MapViewDirections from 'react-native-maps-directions';
import { formatMoney } from '../lib/currency'
import motorIcon from '../../assets/motor-icon_result.png'
import { useDispatch, useSelector } from 'react-redux';
import { setAddAlamat } from "../redux/actions";

export default function PilihLokasiKirim() {

    const dispatch = useDispatch()
    const navigation = useNavigation();
    const globalState = useSelector(state => state)
    const [currentPosition, setCurrentPosition] = useState(null)
    const [mapExist, setMapExist] = useState(false)
    const [hargaDaerah, setHargaDaerah] = useState("")
    const [location, setlocation] = useState(null)
    const [detail, setDetail] = useState("null")
    const [jarak, setJarak] = useState("")
    const [origin, setOrigin] = useState({
        latitude: 0, longitude: 0
    })
    const [destination, setDestination] = useState({
        latitude: 0, longitude: 0
    })
    const GOOGLE_MAPS_APIKEY = GMAP_API_KEY;
    const isFocused = useIsFocused()
    const user = globalState.user;

    useEffect(() => {
        getLokasi()
        getLokasiDaerah(user.idDaerah)
        return () => {

        }
    }, [isFocused])

    const getLokasiDaerah = (id) => {
        return fetch(API_URL + `/daerah/getDaerahById?id=${id}`)
            .then((response) => response.json())
            .then((res) => {
                setHargaDaerah(res.data.harga_daerah)
                setOrigin({ latitude: res.data.latitude, longitude: res.data.longitude })
            })
            .catch((error) => {
                console.error(error);
            });
    };

    async function getLokasi() {

        // if (__DEV__) {
        //     setCurrentPosition({
        //         latitude: -6.9243507,
        //         longitude: 107.7164983,
        //         latitudeDelta: 0.0922,
        //         longitudeDelta: 0.0421,
        //     })
        //     setMapExist(true)
        //     let dataLokasi = {
        //         lat: -6.9243507,
        //         long: 107.7164983,
        //         detail: ""
        //     }            
        //     setlocation(dataLokasi)
        //     return true;
        // }        

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
                    setDestination({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
                    setMapExist(true)
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
        let dataLokasi = {
            lat: location.lat,
            long: location.long,
            detail: detail,
            biayaPerKm: hargaDaerah,
            totalPengiriman: Math.ceil(jarak) * hargaDaerah,
            origin: origin,
            destination: destination
        }
        dispatch(setAddAlamat(dataLokasi))
        navigation.navigate('Cart');
    } 

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: 'white', paddingVertical: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 32, height: 32, marginLeft: 10 }} source={require('../../assets/arrow-back-icon.png')} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 22, marginLeft: 10 }}>Lokasi</Text>
                </View>
            </View>
            {
                (mapExist) &&
                <>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: currentPosition.latitude,
                            longitude: currentPosition.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>
                        {/* Lokasi Driver */}
                        <Marker
                            image={motorIcon}
                            coordinate={{
                                latitude: origin.latitude,
                                longitude: origin.longitude,
                            }}
                            title="Lokasi Anda"
                        />
                        {/* Lokasi Tujuan */}
                        <Marker
                            coordinate={{
                                latitude: currentPosition.latitude,
                                longitude: currentPosition.longitude
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
                    <View style={{ backgroundColor: '#F7BB00', paddingVertical: 2 }}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}>Jarak :</Text>
                            <Text style={{ fontSize: 16 }}>{Math.ceil(jarak)} km</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}>Biaya Pengiriman :</Text>
                            <Text style={{ fontSize: 16 }}>Rp.{formatMoney(hargaDaerah)} per km.</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}>Total Biaya Pengiriman :</Text>
                            <Text style={{ fontSize: 16 }}>Rp. {formatMoney(Math.ceil(jarak) * hargaDaerah)}</Text>
                        </View>
                    </View>   
                </>             
            }
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Detail Alamat</Text>
                <TextInput
                    onChangeText={(text) => setDetail(text)}
                    style={{ borderColor: '#6e6e6e', height: 60, textAlignVertical: 'top', borderWidth: 0.2, backgroundColor: '#CCC' }} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1
    }
})

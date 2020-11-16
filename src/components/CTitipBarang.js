import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid, Image, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import OpenAppSettings from 'react-native-app-settings';
import motorIcon from '../../assets/motor-icon_result.png'
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

export default function CTitipBarang({ route }) {

    const navigation = useNavigation();
    const [currentPosition, setCurrentPosition] = useState([])
    const [mapExist, setMapExist] = useState(false)
    const [location, setlocation] = useState([])
    const [listDriver, setListDriver] = useState([])
    const item = route.params.item;

    useEffect(() => {
        // if (__DEV__) {
            // setCurrentPosition({
            //     latitude: -7.0076377,
            //     longitude: 107.5568143,
            //     latitudeDelta: 0.0922,
            //     longitudeDelta: 0.0421,
            // })        
        firestore()
            .collection('driverLocation')
            .onSnapshot(querySnapshot => {
                const users = [];
                querySnapshot.forEach(documentSnapshot => {
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setListDriver(users);
            }); 
        getLokasi()
    }, [])

    async function getLokasi() {

        const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted) {
            await Geolocation.getCurrentPosition(
                position => {
                    let dataLokasi = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        detail: ""
                    }

                    setlocation(dataLokasi)
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
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>
                        {/* Lokasi Driver */}
                        {
                            (listDriver.length > 0) &&
                            listDriver.map((item, index) => {
                                console.log(`Lat: ${item.latlng._latitude}, Long: ${item.latlng._longitude}`)
                                return (
                                    <>
                                        <Marker
                                            key={item.key}
                                            image={motorIcon}
                                            coordinate={{
                                                latitude: item.latlng._latitude,
                                                longitude: item.latlng._longitude
                                            }}
                                            title="Lokasi Driver"
                                        />
                                    </>
                                )
                            })
                        }
                    </MapView>
            }

            <TouchableOpacity
                onPress={() => {
                    Linking.openURL(
                        'whatsapp://send?text=Halo+saya+ingin+mengirim+barang&phone=' + noHP
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1
    }
})

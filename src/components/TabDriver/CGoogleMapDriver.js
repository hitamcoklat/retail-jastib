import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { formatMoney } from '../../lib/currency'
import MapViewDirections from 'react-native-maps-directions';
import motorIcon from '../../../assets/motor-icon_result.png'

export default function CGoogleMapDriver({ route }) {

    const navigation = useNavigation();
    const [mapExist, setMapExist] = useState(true)
    const [jarak, setJarak] = useState("")
    const GOOGLE_MAPS_APIKEY = GMAP_API_KEY;
    const item = route.params.item;
    const origin = { latitude: item.origin.latitude, longitude: item.origin.longitude };
    const destination = { latitude: item.destination.latitude, longitude: item.destination.longitude };
    console.log(origin)    
    console.log(destination)    

    useEffect(() => {
        return () => {
        }
    }, [])

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
            {
                (mapExist) &&
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: item.origin.latitude,
                            longitude: item.origin.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>
                        {/* Lokasi Driver */}
                        <Marker
                            image={motorIcon}
                            coordinate={{
                                latitude: item.origin.latitude,
                                longitude: item.origin.longitude,
                            }}
                            title="Lokasi Anda"
                        />
                        {/* Lokasi Tujuan */}
                        <Marker
                            coordinate={{
                                latitude: item.destination.latitude,
                                longitude: item.destination.longitude
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
            }                        
            <View style={{ backgroundColor: '#F7BB00', paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}>Jarak :</Text>
                    <Text style={{ fontSize: 16 }}>{Math.ceil(jarak)} km</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}>Biaya Pengiriman :</Text>
                    <Text style={{ fontSize: 16 }}>Rp.{formatMoney(item.biayaPerKm)} per km.</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}>Total Biaya Pengiriman :</Text>
                    <Text style={{ fontSize: 16 }}>Rp. {formatMoney(Math.ceil(jarak) * item.biayaPerKm)}</Text>
                </View>
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

import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import { formatMoney } from '../../lib/currency'
import motorIcon from '../../../assets/motor-icon_result.png'

export default function DetailMapPesanan({ route }) {

    const navigation = useNavigation();
    const [mapExist, setMapExist] = useState(true)
    const [hargaDaerah, setHargaDaerah] = useState(0)
    const [jarak, setJarak] = useState(0)
    const GOOGLE_MAPS_APIKEY = GMAP_API_KEY;
    const item = route.params.item;

    useEffect(() => {
        return () => {

        }
    }, [navigation])

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
                <>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: item.destination.latitude,
                            longitude: item.destination.longitude,
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
                            title="Lokasi Outlet"
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
                            origin={item.origin}
                            destination={item.destination}
                            apikey={GOOGLE_MAPS_APIKEY}
                            onReady={result => {
                                setJarak(result.distance)
                            }}
                            mode="WALKING"
                        />
                    </MapView>
                    <View style={{ backgroundColor: '#F7BB00', paddingVertical: 2 }}>
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
                            <Text style={{ fontSize: 16 }}>Rp. {formatMoney(item.totalPengiriman)}</Text>
                        </View>
                    </View>    
                </>            
            }
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Detail Alamat</Text>
                <TextInput
                    value={item.detail}
                    style={{ borderColor: '#6e6e6e', height: 60, textAlignVertical: 'top', borderWidth: 0.2, backgroundColor: '#CCC', paddingLeft: 10 }} />
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

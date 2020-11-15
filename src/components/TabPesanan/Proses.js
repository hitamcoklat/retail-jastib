import React, { useEffect, useState } from 'react'
import { TouchableOpacity, ActivityIndicator, View, Text, StyleSheet, ScrollView, FlatList, ToastAndroid } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useFetch } from "../../hooks";
import { formatMoney } from "../../lib/currency"

export default function Proses() {

    const dispatch = useDispatch()
    const globalState = useSelector(state => state)
    const user = globalState.user.dataUser;
    const navigation = useNavigation();
    const [pageNumber, setPageNumber] = useState(1)
    const [loadingPesanan, setLoadingPesanan] = useState(true)
    const [dataPesanan, setDataPesanan] = useState([])
    const [totalPesanan, setTotalPesanan] = useState(null)
    const [allLoaded, setAllLoaded] = useState(false)
    const rDataPesanan = globalState.user.dataPesanan;
    const isFocused = useIsFocused()

    useEffect(() => {
        if(allLoaded == false) {
            fetchData()
        }
    }, [isFocused])

    const fetchData = () => {
        setLoadingPesanan(true)
        return fetch(API_URL + '/api/getPesanan?id_kustomer=' + user.ID + '&status=proses&token=' + user.TOKEN + '&page=' + pageNumber + '&limit=10')
            .then((response) => response.json())    
            .then((res) => {
                setLoadingPesanan(false)
                if (res.data.length > 0) {
                    setDataPesanan(res.data)
                } else {
                    setAllLoaded(true)
                }                
            })
    }

    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

    const _loadMoreData = (page) => {

        if (pageNumber == 1) setPageNumber(2)

        if (totalPesanan == dataPesanan.length || page === 1) {
            return false
        }

        showToast('Loading data...')

        fetch(API_URL + '/api/getPesanan?id_kustomer=' + user.ID + '&status=proses&token=' + user.TOKEN + '&page=' + page + '&limit=10')
            .then((response) => response.json())
            .then((res) => {
                console.log(res.status)
                if(res.data.length > 0) {
                    setDataPesanan([...dataPesanan, ...res.data])
                    setLoadingPesanan(false)
                } else {
                    setAllLoaded(true)
                }
            })
    }

    const renderFooter = () => {

        if (allLoaded) {
            return <View></View>
        }

        return (
            (!loadingPesanan) &&
            <View>
                <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: '#60BB54', alignContent: 'center', paddingVertical: 15}} onPress={() => {
                    setPageNumber(pageNumber => _loadMoreData(pageNumber + 1))
                }}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white'}}>Load More</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderItem = ({ item }) => {

        let TotalHarga = formatMoney(parseInt(item.TOTAL_HARGA) + parseInt(item.ONGKIR))

        return (
            typeof item.ID != 'undefined' &&
            <View key={`item_${item.ID}`} style={{ marginBottom: 20 }}>
                <View style={{
                    marginHorizontal: 10, marginTop: 20, padding: 10, shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.6,
                    shadowRadius: 5,
                    elevation: 2,
                    backgroundColor: '#FFF'
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Order ID</Text>
                        <Text style={{ fontSize: 16, color: '#515151' }}>{item.NO_INVOICE}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Tanggal</Text>
                        <Text style={{ fontSize: 16, color: '#515151' }}>{item.CREATED_AT}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Metode Pembayaran</Text>
                        <Text style={{ fontSize: 16, color: '#515151' }}>{item.METODA_PEMBAYARAN}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Total Pembayaran</Text>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Rp {TotalHarga}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Status</Text>
                        <Text style={{ fontSize: 16, color: '#515151', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.STATUS}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CDetailPesanan', { item: item })}
                        style={{ paddingVertical: 5, borderTopColor: '#7EAFEA', borderTopWidth: 0.3, marginTop: 10 }}>
                        <Text style={{ textAlign: 'center', color: '#7EAFEA', fontWeight: 'bold', marginTop: 5 }}>Detail Pesanan</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )

    }

    return (
        <>
            <View style={{ backgroundColor: 'white' }}>
                <View style={{ paddingVertical: 10, backgroundColor: '#FFF' }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'black' }}>Pesanan Saya</Text>
                </View>
            </View>
            {
                (dataPesanan.length == 0) &&
                <View style={{ marginTop: 50 }}>
                    <Text style={{ textAlign: 'center' }}>Belum ada data.</Text>
                </View>
            }             
            {
                (loadingPesanan) &&
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="#F48734" />
                </View>
            }            
            <FlatList
                onEndReachedThreshold={0.7}
                data={dataPesanan}
                renderItem={renderItem}
                keyExtractor={item => item.ID}
                ListFooterComponent={renderFooter}
            />

        </>
    )
}

const styles = StyleSheet.create({
    btnDefault: {
        flex: 1,
        paddingVertical: 10
    },
    btnActive: {
        borderBottomWidth: 3,
        borderBottomColor: '#f48024',
        backgroundColor: '#eff0f1'
    },
    textinvalid: {
        borderColor: 'red',
    },
});
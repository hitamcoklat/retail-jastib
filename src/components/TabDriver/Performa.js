import React, { useEffect, useState } from 'react'
import { TouchableOpacity, ActivityIndicator, View, Text, StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from "../../lib/currency"

export default function Performa() {

    const dispatch = useDispatch()
    const globalState = useSelector(state => state)
    const user = globalState.user.dataUser;
    const navigation = useNavigation();
    const [pageNumber, setpageNumber] = useState(1)
    const [totalPesanan, setTotalPesanan] = useState(0)
    const [loadingPesanan, setLoadingPesanan] = useState(true)
    const [dataPesanan, setDataPesanan] = useState([])
    const [allLoaded, setAllLoaded] = useState(false)
    const rDataPesanan = globalState.user.dataPesanan;
    const isFocused = useIsFocused()

    useEffect(() => {
        if (allLoaded == false) {
            fetchData()
        }
    }, [isFocused])

    const fetchData = () => {
        setLoadingPesanan(true)
        return fetch(API_URL + '/driver/getTakenOrder?id_driver=' + user.ID + '&token=' + user.TOKEN + '&page=' + pageNumber + '&limit=10')
            .then((response) => response.json())
            .then((res) => {
                setLoadingPesanan(false)
                if (res.data.length > 0) {
                    setDataPesanan(res.data)
                    setTotalPesanan(res.total)
                    if(res.total <= 10) {
                        setAllLoaded(true)
                    }
                } else {
                    setAllLoaded(true)
                }                 
            })
    }

    const _loadMoreData = () => {

        if (allLoaded || pageNumber == 1) {
            return false
        }

        fetch(API_URL + '/driver/getTakenOrder?id_driver=' + user.ID + '&token=' + user.TOKEN + '&page=' + pageNumber + '&limit=10')
            .then((response) => response.json())
            .then((res) => {
                console.log(res.status)
                if (res.data.length > 0) {
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
            <View>
                <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: '#60BB54', alignContent: 'center', paddingVertical: 15 }} onPress={() => {
                    setpageNumber(pageNumber + 1)
                    _loadMoreData()
                }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Load More</Text>
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
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CDetailPesanan', { item: item })}
                        style={{ paddingVertical: 5, borderTopColor: '#7EAFEA', borderTopWidth: 0.3, marginTop: 10 }}>
                        <Text style={{ textAlign: 'center', color: '#7EAFEA', fontWeight: 'bold', marginTop: 5 }}>Detail Pesanan</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )

    }

    if(loadingPesanan) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#F48734" />
            </View>            
        )
    }

    return (
        <>
            <View style={{ backgroundColor: 'white', flexDirection: 'row' }}>
                <View style={{ paddingRight: 40, paddingLeft: 20, paddingVertical: 10, width: '70%', backgroundColor: '#E5E5E5'}}>
                    <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'right'}}>Jml. Order diambil</Text>
                </View>
                <View style={{paddingVertical: 10, flex: 1, backgroundColor: '#75BDFF', justifyContent: 'center', alignContent: 'center'}}>
                    <Text style={{ fontSize: 34, fontWeight: 'bold', textAlign: 'center' }}>{totalPesanan}</Text>
                </View>
            </View>             
            <FlatList
                onEndReachedThreshold={0.7}
                data={dataPesanan}
                renderItem={renderItem}
                onEndReached={() => {
                    setpageNumber(pageNumber + 1)
                    _loadMoreData()
                }}
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
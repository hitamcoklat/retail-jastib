import React, { useEffect, useState } from 'react'
import { TouchableOpacity, ActivityIndicator, View, Text, StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useFetch } from "../../hooks";
import { formatMoney } from "../../lib/currency"

export default function ListDriver() {

    const dispatch = useDispatch()
    const globalState = useSelector(state => state)
    const user = globalState.user.dataUser;
    const navigation = useNavigation();
    const [pageNumber, setpageNumber] = useState(1)
    const [loadingPesanan, setLoadingPesanan] = useState(true)
    const [dataPesanan, setDataPesanan] = useState([])
    const [allLoaded, setAllLoaded] = useState(false)
    const [totalDriver, setTotalDriver] = useState(0)
    const rDataPesanan = globalState.user.dataPesanan;
    const isFocused = useIsFocused()

    useEffect(() => {
        if (allLoaded == false) {
            fetchData()
        }
    }, [isFocused])

    const fetchData = () => {
        setLoadingPesanan(true)
        return fetch(API_URL + '/owner/getDriver?token=' + user.TOKEN + '&page=' + pageNumber + '&limit=10')
            .then((response) => response.json())
            .then((res) => {
                setDataPesanan(res.data)
                setTotalDriver(res.total)
                setLoadingPesanan(false)
            })
    }

    const _loadMoreData = () => {

        if (allLoaded || pageNumber == 1) {
            return false
        }

        fetch(API_URL + '/owner/getDriver?token=' + user.TOKEN + '&page=' + pageNumber + '&limit=10')
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

        if(dataPesanan) {
            if(totalDriver == dataPesanan.length) {
                return <View></View>
            }
        }

        return (
            (!loadingPesanan) &&
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

        return (
            typeof item.ID != 'undefined' &&
            <View key={`item_${item.ID}`} style={{ marginBottom: 20 }}>
                <TouchableOpacity style={{
                    marginHorizontal: 10, marginTop: 20, padding: 10, shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.6,
                    shadowRadius: 5,
                    elevation: 2,
                    backgroundColor: '#FFF',
                    borderTopWidth: 10, 
                    borderTopColor: '#E6E8EB'
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Nama</Text>
                        <Text style={{ fontSize: 16, color: '#515151' }}>{item.NAMA_LENGKAP}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Email</Text>
                        <Text style={{ fontSize: 16, color: '#515151' }}>{item.EMAIL}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, color: '#515151' }}>No HP</Text>
                        <Text style={{ fontSize: 16, color: '#515151' }}>{item.NO_HP}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Created At</Text>
                        <Text style={{ fontSize: 16, color: '#515151' }}>{item.CREATED_AT}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Saldo</Text>
                        <Text style={{ fontSize: 16, color: '#515151', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.SALDO}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        )

    }

    return (
        <>
            <View style={{ backgroundColor: 'white' }}>
                <View style={{ paddingVertical: 10, backgroundColor: '#FFF' }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'black' }}>Daftar Driver</Text>
                </View>
            </View>
            {
                (loadingPesanan) &&
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#F48734" />
                </View>
            }
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
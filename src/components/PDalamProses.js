import React, { useEffect, useState } from 'react'
import { TouchableOpacity, ActivityIndicator, View, Text, StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setPesanan } from "../redux/actions";
import { useFetch } from "../hooks";
import { formatMoney } from "../lib/currency"

export default function PDalamProses() {

    const dispatch = useDispatch()
    const globalState = useSelector(state => state)
    const user = globalState.user.dataUser;
    const navigation = useNavigation();
    const [idKustomer, setIdKustomer] = useState("")
    const [statusPesanan, setStatusPesanan] = useState("")
    const [pageNumber, setpageNumber] = useState(1)
    const [dataExist, setDataExist] = useState(true)
    const [loadingAsli, setLoadingAsli] = useState(true)
    const [dataPesananFetch, loadingPesanan] = useFetch(API_URL + '/api/getPesanan?id_kustomer='+user.ID+'&status=' + statusPesanan + '&token=' + user.TOKEN + '&page=' + pageNumber + '&limit=40')
    const [dataPesanan, setDataPesanan] = useState([])
    const rDataPesanan = globalState.user.dataPesanan;

    useEffect(() => {
        setDataPesanan(dataPesananFetch.data)
    }, [dataPesananFetch.data])

    const _loadMoreData = () => {
        try {
            console.log(dataPesananFetch.status)
            if(dataPesananFetch.status == true) {
                setpageNumber(pageNumber + 1)
                setDataPesanan(dataPesanan.concat(dataPesananFetch.data))
            }
        } catch(error) {
            console.log(error)
        }
    }

    const onClickTab = (tabName) => {
        setStatusPesanan(tabName)
        setpageNumber(1)
        setDataPesanan(dataPesananFetch.data)
    }

    const renderFooter = () => {
        return (
            loadingPesanan ?
            <View style={{marginTop: 20, alignItems: 'center'}}>
                <ActivityIndicator size="large" />
            </View> : null
        )
    }    
    
    const itemRender = (items) => {
        
        const { item } = items;
        console.log(item)
        let TotalHarga = formatMoney(parseInt(item.TOTAL_HARGA) + parseInt(item.ONGKIR))

        return (
            typeof item.ID !== 'undefined' &&
            <View key={item.ID} style={{ marginBottom: 20 }}>
                <View style={{
                    marginHorizontal: 10, marginTop: 20, borderWidth: 0.3, padding: 10
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
                        <Text style={{ fontSize: 16, color: '#515151', fontWeight: 'bold' }}>{item.STATUS}</Text>
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
        <View style={{backgroundColor: 'white'}}>  
            <View style={{paddingTop: 15}}>
                <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 16}}>Pesanan Saya</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 0}}>
                <TouchableOpacity
                style={[styles.btnDefault, statusPesanan == 'proses' ? styles.btnActive : '']} 
                    onPress={() => onClickTab('proses')}>
                    <Text style={{ color: '#515151', fontWeight: 'bold', textAlign: 'center', fontSize: 12}}>PROSES</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.btnDefault, statusPesanan == 'terkirim' ? styles.btnActive : '']}
                    onPress={() => onClickTab('terkirim')}>
                    <Text style={{color: '#515151', textAlign: 'center', fontWeight: 'bold', fontSize: 12}}>TERKIRIM</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btnDefault, statusPesanan == 'batal' ? styles.btnActive : '']}
                    onPress={() => onClickTab('batal')}>
                    <Text style={{ color: '#515151', fontWeight: 'bold', textAlign: 'center', fontSize: 12}}>BATAL</Text>
                </TouchableOpacity>
            </View>       
        </View>
        <FlatList
            style={{ backgroundColor: 'white' }}
            data={dataPesanan}
            extraData={dataPesanan}
            renderItem={itemRender}
            keyExtractor={item => item.ID}
            // onEndReached={() => _loadMoreData()}
            // onEndReachedThreshold={0.7}
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
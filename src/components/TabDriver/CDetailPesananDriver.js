import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image, View, Text, Clipboard, ScrollView, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from '../../lib/currency'

export default function CDetailPesananDriver({ route }) {

    const dispatch = useDispatch()
    const navigation = useNavigation(); 
    const item = route.params.item;
    console.log("Detail pesanan driver")
    console.log(item)

    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.LONG);
    };    

    const copyToClipboard = (msg) => {
        Clipboard.setString(msg)
        showToast('Invoice berhasil di copy!')
    }    

    return (
        <>
        <ScrollView>
            <View style={{ backgroundColor: '#DFEED8', borderColor: '#DFEED8', borderWidth: 0.1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                    <Text style={{ fontWeight: 'bold', color: '#75CD4E', textAlign: 'center', fontSize: 18 }}>NO INVOICE : {item.NO_INVOICE}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => copyToClipboard(item.NO_INVOICE)} 
                    style={{backgroundColor: '#0b486b', paddingHorizontal: 20, paddingVertical: 10}}>
                    <Text style={{ fontWeight: 'bold', color: '#75CD4E', textAlign: 'center', fontSize: 18 }}>Copy</Text>
                </TouchableOpacity>
            </View>
            <View>
            {
                item.DETAILS.map((item, index) => {

                    let itemGambar = item.gambar[0];
                    let gambar = itemGambar.replace("http://localhost:8080/jastib", API_URL);

                    return (
                        <View key={index} style={{ backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 10, flexDirection: "row" }}>
                            <View>
                                <Image 
                                    style={{ width: 92, height: 92, borderRadius: 10 }} 
                                    source={{uri: gambar}} />
                            </View>
                            <View style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 10 }}>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: '#515151' }}>{item.nama_produk}</Text>
                                </View>
                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <View style={{ padding: 5, marginHorizontal: 10 }}>
                                        <Text style={{ fontSize: 16, color: '#515151' }}>{item.quantity} item</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })
            }            
            </View>
            <View style={{backgroundColor: 'white', marginTop: 10, flexDirection: 'column', paddingHorizontal: 20, paddingVertical: 20}}>                             
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Alamat Pengiriman</Text>
                <Text style={{fontSize: 16}}>Detail: {item.ALAMAT.detail}</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CGoogleMapDriver', { item: item.ALAMAT })}
                    style={{backgroundColor: '#4b96f3', paddingVertical: 5, marginTop: 10}}>
                    <Text style={{fontSize: 16, textAlign: 'center', color: 'white'}}>Buka di Map</Text>
                </TouchableOpacity>
            </View>         
            <TouchableOpacity style={{backgroundColor: 'white', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20}}>
                <View>
                    <Text style={{fontSize: 16}}>Pilih Metoda Pembayaran : [{item.METODA_PEMBAYARAN}]</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: 'white', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20}}>
                <View>
                    {
                        (item.WAKTU_KIRIM) ?
                        <View>
                            <Text style={{ fontSize: 16 }}>Waktu Pengiriman : [{item.KIRIM_BESOK == 'Y' && 'Kirim Besok'}]</Text>
                            <Text>{item.WAKTU_KIRIM.tgl} | {item.WAKTU_KIRIM.jamKirim}</Text>                            
                        </View> : <View></View>
                    }
                </View>
            </TouchableOpacity>
            <View style={{ backgroundColor: 'white', marginTop: 10, marginBottom: 20, paddingHorizontal: 20, paddingBottom: 30 }}>
                <View style={{marginTop: 20, marginBottom: 20}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Detail Pembayaran(estimasi)</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 16, color: '#515151'}}>Total Belanja</Text>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Rp {formatMoney(item.TOTAL_HARGA)}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 16, color: '#515151'}}>Total Biaya Pengiriman</Text>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Rp. {formatMoney(item.ONGKIR)}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 16, color: 'orange'}}>Total Belanja</Text>
                    <Text style={{fontSize: 16, color: 'orange'}}>Rp {formatMoney(parseInt(item.TOTAL_HARGA) + parseInt(item.ONGKIR))}</Text>
                </View>
            </View>
            <View style={{ backgroundColor: 'white', paddingVertical: 20, paddingHorizontal: 20 }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={{ backgroundColor: 'orange', paddingVertical: 10, borderRadius: 5 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 18 }}>Kembali</Text>
                </TouchableOpacity>
            </View>            
        </ScrollView>         
        </>        
    )

}

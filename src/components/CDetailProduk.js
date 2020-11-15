import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image, View, Text, Dimensions, ScrollView, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SliderBox } from "react-native-image-slider-box";
import { addToCart } from "../redux/cartActions";
import { useDispatch, useSelector } from 'react-redux';
import HTML from 'react-native-render-html';
import '../../global.js';

export default function CDetailProduk({ route }) {

    const [dataProduk, setDataProduk] = useState(route.params.item);
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const globalState = useSelector(state => state);
    const user = globalState.user.dataUser;    

    let imageArray = [];
    dataProduk.gambar.forEach((item, index) => {
        imageArray.push(item.replace("http://localhost:8080/jastib", API_URL))
    })

    const showToast = () => {
        ToastAndroid.show("Produk berhasil ditambahkan!", ToastAndroid.SHORT);
    };

    const addCart = (item, id) => {
        showToast()
        dispatch(addToCart(item, id))
    }

    useEffect(() => {
        return () => {
            
        }
    }, [])

    return (
        <View style={{backgroundColor: 'white', height: '100%'}}>
            <View style={{position: 'relative'}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", zIndex: 9999, right: 15, top: 10 }}>
                    <Image style={{ width: 32, height: 32 }} source={require('../../assets/close-white.png')} />
                </TouchableOpacity>
                <SliderBox images={imageArray} />
            </View>

            <ScrollView>             
                <View style={{marginHorizontal: 20, marginTop: 20, paddingBottom: 20, borderBottomColor: 'grey', borderBottomWidth: 0.3}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 28, marginBottom: 15 }}>{dataProduk.nama_produk}</Text>
                    <HTML 
                        tagsStyles={{p : { fontSize: 18  }}}
                        html={dataProduk.deskripsi} 
                        imagesMaxWidth={Dimensions.get('window').width} />
                </View>
                    <View style={{marginHorizontal: 20, marginTop: 20}}>
                        <Text style={{fontSize: 18}}>Harga</Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'orange'}}>Rp {dataProduk.harga}</Text>
                    </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => addCart(dataProduk, dataProduk.id_produk)} 
                style={{ marginHorizontal: 20, marginTop: 5, paddingVertical: 10, borderRadius: 10, flexDirection: 'column', backgroundColor: '#F48734', marginBottom: 20 }}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'normal', fontSize: 16 }}>Tambahkan ke Keranjang</Text>
            </TouchableOpacity>            
        </View>
    )

}
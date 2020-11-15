import React, { useEffect, useState, useRef } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from "../../lib/currency"
import { setFooter, setLogout } from "../../redux/actions";
import firestore from '@react-native-firebase/firestore';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { ScrollView } from 'react-native-gesture-handler';

export default function TawaranAntar() {

    const dispatch = useDispatch()
    const globalState = useSelector(state => state)
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [dataPesanan, setDataPesanan] = useState([])
    const [idPesanan, setIdPesanan] = useState("")
    const [positionSnap, setPositionSnap] = useState(2)
    const [updateAmbilPesanan, setUpdateAmbilPesanan] = useState(false)
    const [keyPesanan, setKeyPesanan] = useState("")
    const isFocused = useIsFocused()
    const user = globalState.user.dataUser;
    const sheetRef = useRef(0);

    useEffect(() => {

        if (user.length <= 0) {
            navigation.navigate('CLogin')
            dispatch(setFooter("one"))
        }

        const subscriber = firestore()
            .collection('pesananJastibForDriver')
            .onSnapshot(querySnapshot => {
                const users = [];

                querySnapshot.forEach(documentSnapshot => {
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setDataPesanan(users);
                setLoading(false);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, [isFocused]);

    const removePesanan = (key) => {
        firestore()
            .collection('pesananJastibForDriver')
            .doc(key)
            .delete()
            .then(() => {
                console.log('Pesanan deleted!');
            });        
    }

    const ambilPesanan = () => {

        removePesanan(keyPesanan)

        fetch(API_URL + '/driver/ambilPesanan?id_pesanan=' + idPesanan + '&id_driver='+user.ID+'&token=' + user.TOKEN)
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                if(res.status == true) {
                    setUpdateAmbilPesanan(true)
                }
            })        
    }

    const renderItem = ({ item }) => {

        let TotalHarga = formatMoney(parseInt(item.order.TOTAL_HARGA) + parseInt(item.order.ONGKIR))

        return (
            <View style={{ marginBottom: 20 }}>
                <View style={{
                    marginHorizontal: 10, marginTop: 10, shadowColor: '#000',
                    paddingTop: 10,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.6,
                    shadowRadius: 5,
                    elevation: 2,
                    backgroundColor: '#FFF'
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Order ID</Text>
                        <Text style={{ fontSize: 16, color: '#515151' }}>{item.order.NO_INVOICE}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Tanggal</Text>
                        <Text style={{ fontSize: 16, color: '#515151' }}>{item.order.CREATED_AT}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Metode Pembayaran</Text>
                        <Text style={{ fontSize: 16, color: '#515151' }}>{item.order.METODA_PEMBAYARAN}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Total Pembayaran</Text>
                        <Text style={{ fontSize: 16, color: '#515151' }}>Rp {TotalHarga}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('CDetailPesanan', { item: item.order })}
                            style={{ width: '50%', paddingBottom: 10, backgroundColor: 'white' }}>
                            <Text style={{ textAlign: 'center', color: '#7EAFEA', fontWeight: 'bold', marginTop: 7 }}>Detail Pesanan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setIdPesanan(item.order.ID)
                                setKeyPesanan(item.key)
                                setUpdateAmbilPesanan(false)
                                sheetRef.current.snapTo(0)
                            }}
                            style={{ width: '50%', paddingBottom: 10, backgroundColor: '#17AC74' }}>
                            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontWeight: 'bold', marginTop: 7 }}>Ambil Pesanan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )

    }

    const renderPopUp = () => (
        <View
            style={{
                backgroundColor: '#EAEAEB',
                padding: 16,
                height: 150,
                justifyContent: 'space-between'
            }}
        >
            <View>
                <Text style={{color: 'black', fontSize: 18}}>Apakah anda yakin ingin mengamil pesanan ini?</Text>
            </View>
            {
                (updateAmbilPesanan)
                    ? <View style={{ backgroundColor: '#FFF', paddingVertical: 10, borderRadius: 5 }}>
                        <Text style={{ textAlign: 'center', color: 'black', fontSize: 17, fontWeight: 'bold' }}>Berhasil di ambil</Text>
                      </View>
                    : <TouchableOpacity
                        onPress={() => ambilPesanan()}
                        style={{ backgroundColor: '#17AC74', paddingVertical: 10, borderRadius: 5 }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 17, fontWeight: 'bold' }}>Ambil Pesanan</Text>
                    </TouchableOpacity>               
            }
        </View>
    );    

    if (loading) {
        return <ActivityIndicator />;
    }    

    return (
        <>
            <View style={{ backgroundColor: '#7EAFEA' }}>
                <View style={{ paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#7EAFEA' }}>
                    <Text style={{ textAlign: 'left', fontSize: 16, color: '#FFF' }}>Berikut adalah daftar yang telah melakukan pembayaran dan telah di validasi</Text>
                </View>            
            </View> 
            <BottomSheet
                ref={sheetRef}
                snapPoints={[150, 100, 0]}
                borderRadius={10}
                renderContent={renderPopUp}
                initialSnap={positionSnap}
            />                   
            <FlatList
                data={dataPesanan}
                renderItem={renderItem}
            />
        </>
    )
}


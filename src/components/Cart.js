import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image, View, Text, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-native-datepicker'
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { addQuantity, subtractQuantity, emptyCart } from '../redux/cartActions';
import { formatMoney } from '../lib/currency'
import { useFetch } from "../hooks";
import { setMetodaPembayaran } from "../redux/actions";

export default function Cart() {

    const dispatch = useDispatch()
    const globalState = useSelector(state => state)
    const [popPilihMetoda, setPopPilihMetoda] = useState(false)
    const [popWaktuKirim, setPopWaktuKirim] = useState(false)
    const [popValue, setPopValue] = useState(0)
    const [popPilihWaktu, setPopPilihWaktu] = useState(0)
    const [kirimBesok, setKirimBesok] = useState(true)
    const [waktuPengiriman, setWaktuPengiriman] = useState(new Date().toISOString().slice(0, 10))
    const [successPage, setSuccessPage] = useState(false)
    const [messageInfo, setMessageInfo] = useState("Belanjaan anda masih kosong!")
    const user = globalState.user.dataUser;
    const [navigateInfoMessage, setNavigateInfoMessage] = useState("Home")
    const navigation = useNavigation();
    const cart = globalState.cart.cartItem;
    const total = globalState.cart.total;
    const dataAlamat = globalState.alamat.dataAlamat;
    const [hargaDaerah, loadingHargaDaerah] = useFetch(API_URL + '/api/getHargaPengiriman/' + globalState.user.idDaerah)
    
    console.log(hargaDaerah)
    
    useEffect(() => {
        if (total <= 0) {
            Alert.alert(
                "Info",
                messageInfo,
                [
                    { text: "OK", onPress: () => navigation.navigate(navigateInfoMessage) }
                ],
                { cancelable: false }
            );
        }
        return () => {
            
        }
    }, [total])

    var radio_props = [
        { label: 'Saldo', value: 0 },
        { label: 'Transfer', value: 1 },
        { label: 'Cash on Delivery', value: 2 }
    ]; 
    
    var radio_pilihwaktu = [
        { label: 'Pagi (jam 8 s.d 10', value: 0 },
        { label: 'Siang (jam 11 s.d 13)', value: 1 },
        { label: 'Sore (jam 15 s.d 16)', value: 3 }
    ];

    var arrayWaktu = []
    arrayWaktu[0] = "Pagi (jam 8 s.d 10";
    arrayWaktu[1] = "Siang (jam 11 s.d 13)";
    arrayWaktu[3] = "Sore (jam 15 s.d 16)";

    let metodPembayaran = ["Saldo", "Transfer", "COD"]
    const onClickPilihMetoda = () => {
        console.log('pilih metoda = ' + true)
        setPopPilihMetoda(true)
    }

    const onClickRadioPilihMetoda = (id) => {
        setPopValue(id)
        dispatch(setMetodaPembayaran(id))
    }

    const orderSubmit = () => {

        if (typeof user.EMAIL === 'undefined') {
            navigation.navigate('CLogin')
            return;
        }

        const dataSubmit = {
            user: globalState.user.dataUser,
            cart: globalState.cart.cartItem,
            totalHarga: globalState.cart.total,
            alamat: globalState.alamat.dataAlamat,
            metodaPembayaran: globalState.alamat.metodaPembayaran,
            ongkir: dataAlamat.totalPengiriman,
            kirimBesok : kirimBesok,
            pilihanWaktu: popPilihWaktu,
            tanggalKirim: waktuPengiriman

        }
        fetch(API_URL + '/api/orderSubmit', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSubmit)
        })
            .then(response => response.json())
            .then(res => {
                if (res.status == true) {
                    console.log('Data berhasil di input!')
                    setMessageInfo("Pesanan anda berhasil ditambahkan!")
                    setNavigateInfoMessage('CheckoutInfo')                    
                    dispatch(emptyCart())
                    navigation.navigate(navigateInfoMessage, { item: cart })
                } else {
                    console.log('Terjadi kesalahan!')
                }
            })        
        console.log(JSON.stringify(dataSubmit))
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth()),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = month;
        if (day.length < 2) day = '0' + day;

        var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        return [day, bulan[month], year].join(' ');
    }    

    return (
        <>
        <ScrollView>
            <View style={{ backgroundColor: '#DFEED8', marginHorizontal: 25, paddingHorizontal: 20, paddingVertical: 10, marginTop: 20, marginBottom: 10, borderColor: '#DFEED8', borderWidth: 0.1}}>
                <Text style={{ fontWeight: 'bold', color: '#75CD4E', textAlign: 'center'}}>Pesanan di atas pukul 14.00 akan dikirim esok hari</Text>
            </View>
            <View>
            {
                cart.map((item, index) => {

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
                                    <TouchableOpacity
                                        onPress={() => dispatch(subtractQuantity(item, item.id_produk))} 
                                        style={{ paddingVertical: 5, paddingHorizontal: 20, borderRadius: 5, backgroundColor: 'orange' }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>-</Text>
                                    </TouchableOpacity>
                                    <View style={{ padding: 5, marginHorizontal: 10 }}>
                                        <Text style={{ fontSize: 16, color: '#515151' }}>{item.quantity}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => dispatch(addQuantity(item, item.id_produk))}
                                        style={{ paddingVertical: 5, paddingHorizontal: 20, borderRadius: 5, backgroundColor: 'orange' }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                })
            }
            </View>
            <View                 
                style={{backgroundColor: 'white', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20}}>
                {Object.keys(dataAlamat).length !== 0 ?
                    <TouchableOpacity onPress={() => navigation.navigate('PilihLokasi')}>
                        <Text style={{ fontSize: 16, color: 'orange', fontWeight: 'bold' }}>Lihat Alamat</Text>
                        <Text style={{ fontSize: 16 }}>{dataAlamat.detail}</Text>
                    </TouchableOpacity> : <View><Text style={{ fontSize: 16 }}>Pilih Alamat Pengiriman</Text></View>
                }                                  
                <TouchableOpacity onPress={() => navigation.navigate('PilihLokasiKirim')}>
                {Object.keys(dataAlamat).length !== 0 ?
                    <Text style={{fontSize: 16, fontWeight: "bold", color: 'green'}}>Rubah</Text> :
                    <Text style={{fontSize: 16, fontWeight: "bold", color: 'orange'}}>Pilih</Text>
                }
                </TouchableOpacity>
                                 
            </View>         
            <TouchableOpacity style={{backgroundColor: 'white', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20}}>
                <View>
                    <Text style={{fontSize: 16}}>Pilih Metoda Pembayaran : [{metodPembayaran[popValue]}]</Text>
                </View>
                <TouchableOpacity onPress={() => onClickPilihMetoda()}>
                    <Text style={{fontSize: 16, fontWeight: "bold", color: 'orange'}}>Pilih</Text>
                </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: 'white', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20}}>
                <View>
                    <Text style={{fontSize: 16}}>Pilih Waktu Pengiriman : </Text>
                    <Text style={{fontSize: 16}}>{formatDate(waktuPengiriman)} | {arrayWaktu[popPilihWaktu]}</Text>
                </View>
                <TouchableOpacity onPress={() => setPopWaktuKirim(true)}>
                    <Text style={{fontSize: 16, fontWeight: "bold", color: 'orange'}}>Pilih</Text>
                </TouchableOpacity>
            </TouchableOpacity>
            <View style={{ backgroundColor: 'white', marginTop: 10, marginBottom: 20, paddingHorizontal: 20, paddingBottom: 30 }}>
                <View style={{marginTop: 20, marginBottom: 20}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Detail Pembayaran(estimasi)</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 16, color: '#515151'}}>Total Belanja</Text>
                    <Text style={{fontSize: 16, color: '#515151'}}>Rp {formatMoney(total)}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 16, color: '#515151'}}>Ongkos Kirim.</Text>
                    <Text style={{fontSize: 16, color: '#515151'}}>
                            {loadingHargaDaerah ? 'Loading...' : 'Rp ' + formatMoney(dataAlamat.totalPengiriman) }
                    </Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 16, color: 'orange'}}>Total Belanja</Text>
                    <Text style={{fontSize: 16, color: 'orange'}}>
                            Rp {loadingHargaDaerah ? 'Loading...' : formatMoney(parseInt(total) + parseInt(dataAlamat.totalPengiriman))}
                    </Text>
                </View>
            </View>
            <View style={{ backgroundColor: 'white', paddingVertical: 20, paddingHorizontal: 20 }}>
                <TouchableOpacity
                    onPress={() => orderSubmit()} 
                    style={{ backgroundColor: 'orange', paddingVertical: 10, borderRadius: 5 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 18 }}>Pesan</Text>
                </TouchableOpacity>
            </View>            
        </ScrollView>
            <Dialog
                rounded={false}
                visible={popPilihMetoda}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom',
                })}
                onTouchOutside={() => {
                    setPopPilihMetoda(false)
                }}                
            >
                <DialogContent>
                    <View style={{width: '100%', paddingVertical: 15}}>
                        <View>
                            <RadioForm
                                style={{fontSize: 18}}
                                radio_props={radio_props}
                                isSelected={popValue}
                                initial={0}
                                onPress={(value) => onClickRadioPilihMetoda(value)}
                            />
                        </View>
                        {popValue == 1 &&
                        <> 
                            <Text style={{color: 'orange', fontWeight: 'bold', marginTop: 10}}>Batas waktu Pembayaran 30 menit</Text>
                            <Text style={{marginTop: 10}}>Jika dalam 30 menit tidak melakukan pembayaran order Anda akan kami batalkan.</Text>
                            <Text style={{marginTop: 10}}>Pesanan akan kami antarakan setelah pembayaran berhasil kami verifikasi</Text>
                            <Text style={{marginTop: 10}}>Pembayaran setelah pukul 18.00 WIB akan kami verifikasi pukul 06.00 WIB keesokan harinya</Text>
                        </> 
                        }
                        {popValue == 0 &&
                            <>
                                <Text>Pembayaran akan menggunakan Saldo dari aplikasi.</Text>
                            </>
                        }
                        {popValue == 2 &&
                            <>
                                <Text>Pembayaran menggunakan metoda COD, anda akan membayaran setelah tim kami mengirimkan produk ke tempat anda.</Text>
                            </>
                        }
                        
                    </View>
                </DialogContent>
            </Dialog>
            <Dialog
                rounded={false}
                visible={popWaktuKirim}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom',
                })}
                onTouchOutside={() => {
                    setPopWaktuKirim(false)
                }}                
            >
                <DialogContent>
                    <View style={{width: '100%', paddingVertical: 15}}>
                        <View style={{backgroundColor: '#EAEAEA'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log('kirim besok = ' + kirimBesok)
                                    setKirimBesok(true)
                                    setWaktuPengiriman(new Date().toISOString().slice(0, 10))
                                }} 
                                style={{backgroundColor: '#5b86c9', paddingVertical: 15}}>
                                <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white'}}>Kirim Hari ini</Text>
                            </TouchableOpacity>
                            {
                                kirimBesok &&
                                <RadioForm
                                    style={{ fontSize: 18, marginTop: 10 }}
                                    radio_props={radio_pilihwaktu}
                                    isSelected={popPilihWaktu}
                                    initial={0}
                                    onPress={(val) => {
                                        setPopPilihWaktu(val)
                                    }}
                                /> 
                            }
                           
                        </View>
                        <View style={{backgroundColor: '#EAEAEA'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    setKirimBesok(!kirimBesok)
                                }} 
                                style={{ backgroundColor: '#5b86c9', paddingVertical: 15 }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Kirim Tanggal Tertentu</Text>
                            </TouchableOpacity>
                            { !kirimBesok &&
                                <>
                                <DatePicker
                                    style={{ width: 200 }}
                                    date={waktuPengiriman}
                                    mode="date"
                                    placeholder="Pilih Tanggal"
                                    format="YYYY-MM-DD"
                                    minDate={new Date().toISOString().slice(0, 10)}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            marginLeft: 36
                                        }
                                        // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => { 
                                        setWaktuPengiriman(date)
                                     }}
                                />
                                <RadioForm
                                    style={{ fontSize: 18, marginTop: 10 }}
                                    radio_props={radio_pilihwaktu}
                                    isSelected={popPilihWaktu}
                                    initial={0}
                                    onPress={(val) => {
                                        setPopPilihWaktu(val)
                                    }}
                                />                                    
                                </>
                            }                      
                             
                        </View>                   
                    </View>
                </DialogContent>
            </Dialog>            
        </>        
    )

}

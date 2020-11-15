import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Picker, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import CartWidget from './CartWidget'
import { useFetch } from "../hooks";
import { addToCart } from "../redux/cartActions";
import { setIdDaerah } from '../redux/actions'
import '../../global.js';

const CDetailKategori = ({ route, navigation }) => {

  const globalState = useSelector(state => state);
  const dispatch = useDispatch()
  const user = globalState.user.dataUser;
  const cart = globalState.cart.cartItem;
  const [idKategori, setIdKategori] = useState(route.params.idKategori);
  const [idLokasi, setIdLokasi] = useState("1");
  console.log('halaman detail kategori')
  console.log(idKategori)

  const [dataCategory, loadingCategory] = useFetch(API_URL + '/api/getAllKategori?q=list')
  const [dataProduk, loadingProduk] = useFetch(API_URL + '/api/getProdukByIdKategori/' + idKategori + "/?location=" + idLokasi)
  const [dataLokasi, loadingLokasi] = useFetch(API_URL + '/api/getAllLokasi/')
  console.log(dataProduk)

  const addCart = (item, id) => {
    dispatch(addToCart(item, id))
  }

  const onClickSetLokasi = (id) => {
    dispatch(setIdDaerah(id))
    setIdLokasi(id)
  }

  return (
    <>
    <ScrollView style={{ backgroundColor: '#eff0f1' }}>
      <View style={{ marginBottom: 30 }}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20
            }}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
              >
                <Image
                  style={{ width: 90, height: 40 }}
                  source={require('../../assets/logo-jastib.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', position: 'relative' }}
                onPress={() => navigation.navigate('Cart')}>
                <Image
                  resizeMode="contain"
                  style={{ height: 40, width: 40 }}
                  source={require('../../assets/shopping-cart-icon.png')}
                />
                <Text style={{position: 'absolute', left: 20, top: 20, fontSize: 20, fontWeight: 'bold', color: '#fff', backgroundColor: '#3ea6ff', paddingHorizontal: 8, borderRadius: 20}}>{cart.length}</Text>
              </TouchableOpacity>
            </View>
          </View>
        {/* Lokasi */}
        <View style={{ backgroundColor: '#F9F9F9', marginTop: 10 }}>
          <View style={{ marginHorizontal: 20, flexDirection: 'row' }}>
            <View style={{ width: 50, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={{ width: 35, height: 45, resizeMode: 'stretch' }}
                source={require('../../assets/location-marker.png')}
              />
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <View style={{ marginLeft: 10, marginTop: 10 }}>
                <Text>Pilih Kota</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Picker
                  selectedValue={idLokasi}
                  style={{ fontWeight: 'bold' }}
                  onValueChange={(itemValue, itemIndex) => onClickSetLokasi(itemValue)}
                >
                  {
                    !loadingLokasi &&
                    dataLokasi.data.map((item, index) => {
                      return (<Picker.Item key={index} label={item.nama_daerah} value={item.id_daerah} />)
                    })
                  }
                </Picker>
              </View>
            </View>
          </View>
        </View>
        {/* Lokasi */}
        {/* Slider Kategori */}
        <ScrollView horizontal={true}>
          {
            loadingCategory
              ? <Text style={{ justifyContent: 'center' }}>Loading...</Text>
              : <>
                {
                  dataCategory.data.map((item, index) => {
                    return (<TouchableOpacity onPress={() => setIdKategori(item.id_kategori)} key={index} style={[idKategori == item.id_kategori ? styles.labelHighlight : styles.labelNormal]}>
                      <Text style={[idKategori == item.id_kategori ? styles.textLabelHighlight : styles.textLabelNormal]}>{item.nama_kategori}</Text>
                    </TouchableOpacity>);
                  })
                }
              </>
          }
        </ScrollView>
        {/* Slider Kategori */}
        {/* Grid Produk */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            loadingProduk
              ? <Text style={{ justifyContent: 'center' }}>Loading...</Text>
              : dataProduk.data.length > 0 &&
              dataProduk.data.map((item, index) => {

                let itemGambar = item.gambar[0];
                let gambar = itemGambar.replace("http://localhost:8080/jastib", API_URL);
                
                return (
                  <View key={index} style={{
                    width: '45.5%', height: 364, marginTop: 20, flexDirection: 'column', justifyContent: 'space-between', borderRadius: 5, marginLeft: 10, borderColor: 'white', backgroundColor: 'white', shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 5 }}>
                    <TouchableOpacity 
                      onPress={() => navigation.navigate('CDetailProduk', {item: item})}>
                      <Image
                        style={{ width: '100%', height: 137, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                        source={{ uri: gambar}} />
                      <Text style={{ textAlign: 'left', color: '#4F4F4F', paddingLeft: 10, fontSize: 18, marginTop: 20 }}>{item.nama_produk}</Text>
                    </TouchableOpacity>
                    <View style={{ padding: 10, }}>
                      <Text>Mulai</Text>
                      <Text style={{ fontWeight: 'bold', color: '#F48734' }}>Rp {item.harga}</Text>
                      <TouchableOpacity 
                        onPress={() => addCart(item, item.id_produk)}
                        style={{ justifyContent: 'center', backgroundColor: '#F48734', height: 35, borderRadius: 5, marginTop: 10 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Beli</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })

          }
        </View>
        {/* Grid Produk */}

      </View>

    </ScrollView>
      <CartWidget />
    </>
  );
}

const styles = StyleSheet.create({
    labelHighlight: {
        backgroundColor: '#F48734',
        borderColor: '#F48734',
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginLeft: 10,
        marginTop: 10
    },
    labelNormal: {
        backgroundColor: '#FFFFFF', 
        borderColor: '#F48734', 
        borderWidth: 2, 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        borderRadius: 20, 
        marginLeft: 10, 
        marginTop: 10
    },
    textLabelHighlight: {
        fontWeight: 'bold', 
        color: '#FFFFFF'
    },
    textLabelNormal: {
        fontWeight: 'bold',
        color: '#F48734'
    }
});

export default CDetailKategori;

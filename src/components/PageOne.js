import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog'
import { useSelector, useDispatch } from 'react-redux';
import { setFooter } from "../redux/actions";
import { useNavigation } from '@react-navigation/native';
import { useFetch } from "../hooks";
import '../../global.js';

const PageOne = () => {
    
    const globalState = useSelector(state => state);
    const user = globalState.user.dataUser;
    const page = globalState.footer.PAGE;
    const cart = globalState.cart.cartItem;
    const randString = Math.random().toString(36).substr(2, 5);
    const [popAlert, setPopAlert] = useState(false)
    const [dataHeadline, loadingHeadline] = useFetch(API_URL + '/api/getAllHeadline')
    const [dataKategori, loadingKategori] = useFetch(API_URL + '/api/getAllKategori')
    const [dataCampaign, loadingCampaign] = useFetch(API_URL + '/api/getAllCampaign')
    const navigation = useNavigation();
    const dispatch = useDispatch()

    useEffect(() => {
      fetch(API_ASSET + '/app-config.json?' + randString)
        .then(response => response.json())
        .then(data => {
          if (data['version'] != APP_VERSION) {
            console.log('data Berbeda')
            setPopAlert(true)
          }          
        });
    }, []);    

    return (
      <ScrollView style={{backgroundColor: '#FFFFFF'}}>
        <View style={{marginHorizontal: 20, marginBottom: 30}}>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <View>
                <TouchableOpacity>
                  <Image
                    style={{ width: 90, height: 40 }}
                    source={require('../../assets/logo-jastib.png')}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', alignContent: 'flex-end', position: 'relative', paddingRight: 10}}
                  onPress={() => navigation.navigate('Cart')}>
                  <Image
                    resizeMode="contain"
                    style={{ height: 40, width: 40 }}
                    source={require('../../assets/shopping-cart-icon.png')}
                  />
                  <Text style={{position: 'absolute', left: 20, top: 20, fontSize: 16, fontWeight: 'bold', color: '#fff', backgroundColor: '#3ea6ff', paddingHorizontal: 6, borderRadius: 20}}>{cart.length}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{fontWeight: 'bold', color: '#4A4A4A', fontSize: 18, marginTop: 28, marginLeft: 5}}>Kategori Produk</Text>
            {/* Row 1 */}
            <View style={{flexDirection: "row", flexWrap: 'wrap', marginTop: 20, alignContent: 'space-between'}}>
            {
              loadingKategori
                ? <Text style={{ justifyContent: 'center' }}>Sedang memuat kategori...</Text> 
                : dataKategori.data.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={item.id_kategori}
                      onPress={() => navigation.navigate(
                        item.link_component, {
                        idKategori: item.id_kategori
                      })}
                      style={{ width: 80, marginHorizontal: 13, marginBottom: 15 }}>
                      <Image
                        style={{ width: 80, height: 80 }}
                        source={{ uri: item.icon_image }} />
                      <Text style={{ textAlign: 'center', color: '#4F4F4F', marginTop: 10 }}>{item.nama_kategori}</Text>
                    </TouchableOpacity>                    
                  )
                })
            }

            </View>
            {/* Row 2 */}

            <Text style={{ fontWeight: 'bold', color: '#4A4A4A', fontSize: 18, marginTop: 55 }}>Produk Pilihan</Text>
            <Text style={{ color: '#4A4A4A', fontSize: 14 }}>Dijamin paling murah, mutu terbaik dan halal!</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: '#EBEBEB', paddingTop: 10 }}>
            <ScrollView horizontal={true}>
            {/* data Headline */}
            {
              loadingHeadline ? <Text>Loading...</Text> :
                dataHeadline.data.map((item, index) => {
                  let itemGambar = item.gambar[0];
                  let gambar = itemGambar.replace("http://localhost:8080/jastib", API_URL);                  
                  return (
                    <View key={index} style={{
                      width: 134, height: 364, flexDirection: 'column', justifyContent: 'space-between', borderRadius: 5, marginLeft: 10, shadowColor: '#000', borderColor: 'white', 
                      marginBottom: 20, backgroundColor: 'white',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.5,
                      shadowRadius: 7,
                      elevation: 10 }}>
                      <View>
                        <Image
                          style={{ width: '100%', height: 137, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                          source={{ uri: gambar }} />
                        <Text style={{ textAlign: 'left', color: '#4F4F4F', paddingHorizontal: 10, fontSize: 18, marginTop: 20 }}>{item.nama_produk}</Text>
                      </View>
                      <View style={{ padding: 10, }}>
                        <Text>Mulai</Text>
                        <Text style={{ fontWeight: 'bold', color: '#68C93E' }}>Rp {item.harga}</Text>
                        <TouchableOpacity
                          onPress={() => navigation.navigate('CDetailProduk', { item: item })} 
                          style={{ justifyContent: 'center', backgroundColor: '#F48734', height: 35, borderRadius: 5, marginTop: 10 }}>
                          <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Lihat</Text>
                        </TouchableOpacity>
                      </View>
                    </View>                     
                  )
                })
            }             
            </ScrollView>
          </View>
          <View>
            {/* Campaign */}
            <View style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 20}}>
              <View style={{width: '100%'}}>
                <Text style={{ fontWeight: 'bold', color: '#4A4A4A', fontSize: 18 }}>Jastib Campaign</Text>
                <Text style={{ color: '#4A4A4A', fontSize: 14 }}>Bantu mereka yang melalui Jastib Campaign Link</Text>
              </View>           
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
              <ScrollView horizontal={true}>
              {
                loadingCampaign ? <Text>Sedang memuat campaign...</Text> :
                dataCampaign.data.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('CCampaignPage', {
                        item: item
                      })} 
                      key={index} 
                      style={{
                        width: 290, height: 200, flexDirection: 'column', justifyContent: 'space-between', borderRadius: 5, marginLeft: 20, shadowColor: '#000', marginBottom: 20,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.6,
                        shadowRadius: 10,
                        elevation: 10,
                        backgroundColor: '#FFF' }}>
                      <View>
                        <Image
                          style={{ width: '100%', height: 137, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                          source={{uri : item.IMAGE}} />
                        <Text style={{ textAlign: 'left', color: '#4F4F4F', fontWeight: 'bold', paddingLeft: 10, fontSize: 16, marginTop: 5 }}>{item.JUDUL}</Text>
                        <Text style={{ textAlign: 'left', color: '#4F4F4F', paddingLeft: 10, fontSize: 14 }}>{item.RINGKASAN}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
              </ScrollView>
            </View>

          </View>
          <View style={{marginBottom: 30}}></View>
          {
              <Dialog
                rounded={false}
                visible={popAlert}
              >
                <DialogContent style={{ width: '50%', paddingTop: 20 }}>
                  <View>
                    <Text style={{ textAlign: 'center' }}>Halo kami melakukan pembaharuan, silahkan update aplikasi anda.</Text>
                  </View>
                </DialogContent>
              </Dialog>            
          }
          
      </ScrollView>
      
    );
}

export default PageOne;

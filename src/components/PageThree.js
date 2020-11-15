import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import { WebView } from 'react-native-webview';

export default function PageOne() {

  const randString = Math.random().toString(36).substr(2, 5);
  const [noHP, setnoHP] = useState("")
    
  useEffect(() => {
        fetch(API_ASSET + '/app-config.json?' + randString)
            .then(response => response.json())
            .then(data => {
                setnoHP(data['no_hp']);
            });
    }, [])

    return (
      <View style={{flex: 1}}>
        <WebView source={{ uri: API_URL + '/page/listBank' }} />
        <View style={{ backgroundColor: '#336699', paddingVertical: 20 }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'whatsapp://send?text=Halo+Jastibs+saya+ingin+konfirmasi+pembayaran&phone=' + noHP
              )
            }}           
            style={{ backgroundColor: 'orange', paddingVertical: 10, borderRadius: 5, marginHorizontal: 20 }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 18 }}>Konfirmasi Pembayaran</Text>
          </TouchableOpacity>
        </View>  
      </View>
    );
}

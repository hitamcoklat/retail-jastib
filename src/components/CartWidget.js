import React, { useEffect } from 'react'
import { TouchableOpacity, Image, View, Text, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from '../lib/currency'

export default function CartWidget() {

    const dispatch = useDispatch()
    const globalState = useSelector(state => state)
    const user = globalState.user.dataUser;
    const navigation = useNavigation();
    const cart = globalState.cart.cartItem;
    const total = globalState.cart.total;
    console.log('dari widget')
    console.log(cart) 

    function toCart() {
        if(total <=0) {
            Alert.alert(
                "Info",
                "Belanjaan masih kosong!",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: true }
            );            
        } else {
            navigation.navigate('Cart')
        }
    }

    if(total <= 0) return <></>

    return (
        <View style={{ backgroundColor: 'white', paddingVertical: 10 }}>
            <TouchableOpacity
                onPress={() => toCart()} 
                style={{ backgroundColor: '#F48734', marginHorizontal: 20, paddingVertical: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <Image style={{ width: 20, height: 20 }} source={require('../../assets/cart-icon.png')} />
                    <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 10, fontSize: 16 }}>{formatMoney(total)} - {cart.length} Produk</Text>
            </TouchableOpacity>
        </View>        
    )
}
import React, { useState } from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setFooter } from "../redux/actions";
import { useNavigation } from '@react-navigation/native';

const Footer = () => {    

    const [state, setFooterState] = useState("")
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const globalState = useSelector(state => state)
    const user = globalState.user.dataUser;    

    updateFooter = setFooter => {
        setFooterState(setFooter)
        console.log('dari footer = ' + state)
    }

    handleSetFooter = (val) => {
        dispatch(setFooter(val))
    }

    return (
        <View style={{ backgroundColor: 'white', flexDirection: 'row', borderTopWidth: 0.3, borderTopColor: '#4E4E4E', paddingVertical: 8 }}>
            <TouchableOpacity
            onPress={() => handleSetFooter('one')} 
            style={{ width: '25%', alignItems: 'center' }}>
                <Image style={{ width: 32, height: 32 }} source={require('../../assets/home.png')} />
                <Text style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', color: '#4E4E4E' }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {
                    if (typeof user.EMAIL !== 'undefined') {
                        dispatch(setFooter('two'))
                    } else {
                        navigation.navigate('CLogin')
                    }                    
                }}
                style={{ width: '25%', alignItems: 'center' }}>
                <Image style={{ width: 32, height: 32 }} source={require('../../assets/order.png')} />
                <Text style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', color: '#4E4E4E' }}>Pesanan</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSetFooter('three')}
            style={{ width: '25%', alignItems: 'center' }}>
                <Image style={{ width: 32, height: 32 }} source={require('../../assets/help.png')} />
                <Text style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', color: '#4E4E4E' }}>Bantuan</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSetFooter('account')}style={{ width: '25%', alignItems: 'center' }}>
                <Image style={{ width: 32, height: 32 }} source={require('../../assets/account.png')} />
                <Text style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', color: '#4E4E4E' }}>Akun</Text>
            </TouchableOpacity>
        </View>
    )
    
}

export default connect(
    null,
    { setFooter }
)(Footer)
import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import PageChange from '../components/PageChange';
import CDetailKategori from '../components/CDetailKategori';
import CLogin from '../components/CLogin';
import CRegister from '../components/CRegister';
import CDetailProduk from '../components/CDetailProduk';
import CRegisterSuccess from '../components/CRegisterSuccess';
import Cart from '../components/Cart';
import PDalamProses from '../components/PDalamProses';
import CDetailPesanan from '../components/TabPesanan/CDetailPesanan';
import PilihLokasi from '../components/PilihLokasi';
import CheckoutInfo from '../components/CheckoutInfo';
import CKirimBarang from '../components/CKirimBarang';
import CTitipBarang from '../components/CTitipBarang';
import CCampaignPage from '../components/CCampaignPage';
import CLupaPassword from '../components/CLupaPassword';
import CGantiPassword from '../components/CGantiPassword';
import PilihLokasiKirim from '../components/PilihLokasiKirim';
import CDriver from '../components/CDriver'
import COwner from '../components/COwner'
import Pesanan from '../components/Pesanan';
import CGoogleMap from '../components/CGoogleMap';
import CGoogleMapDriver from '../components/TabDriver/CGoogleMapDriver';
import SetLocation from '../components/TabDriver/SetLocation';
import CSetting from '../components/TabOwner/CSetting';
import CDetailPesananDriver from '../components/TabDriver/CDetailPesananDriver';
import CDetailPesananOwner from '../components/TabOwner/CDetailPesananOwner';
import UploadPembayaran from '../components/TabPesanan/UploadPembayaran';
import DetailMapPesanan from '../components/TabPesanan/DetailMapPesanan';
import { useDispatch, useSelector } from 'react-redux';

const Stack = createStackNavigator();

function HomeScreen() {
    return (
        <PageChange />
    );
}

function DriverStack() {
    return (
        <Stack.Navigator
            headerMode="none"
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <Stack.Screen options={{ gestureEnabled: false }} name="Home" component={CLogin} />
            <Stack.Screen options={{ gestureEnabled: false }} name="CDriver" component={CDriver} />        
            <Stack.Screen name="CDetailPesanan" component={CDetailPesananDriver} />
            <Stack.Screen name="CGantiPassword" component={CGantiPassword} />  
            <Stack.Screen name="CGoogleMapDriver" component={CGoogleMapDriver} /> 
            <Stack.Screen name="SetLocation" component={SetLocation} /> 
        </Stack.Navigator>
    )
}

function OwnerStack() {
    return (
        <Stack.Navigator
            headerMode="none"
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <Stack.Screen options={{ gestureEnabled: false }} name="Home" component={CLogin} />
            <Stack.Screen options={{ gestureEnabled: false }} name="COwner" component={COwner} />        
            <Stack.Screen name="CDetailPesananOwner" component={CDetailPesananOwner} />
            <Stack.Screen name="CGantiPassword" component={CGantiPassword} />   
            <Stack.Screen name="DetailMapPesanan" component={DetailMapPesanan} />   
            <Stack.Screen name="CSetting" component={CSetting} />   
        </Stack.Navigator>
    )
}

function UserStack() {
    return (
        <Stack.Navigator
            headerMode="none"
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            {/* <Stack.Screen name="PDalamProses" component={PDalamProses} /> */}
            {/* <Stack.Screen name="Home" component={CGoogleMap} /> */}
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CDetailKategori" component={CDetailKategori} />
            <Stack.Screen options={{ gestureEnabled: false }} name="CLogin" component={CLogin} />
            <Stack.Screen name="CRegister" component={CRegister} />
            <Stack.Screen name="CDetailProduk" component={CDetailProduk} />
            <Stack.Screen name="CRegisterSuccess" component={CRegisterSuccess} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Pesanan" component={Pesanan} />
            <Stack.Screen name="PilihLokasi" component={PilihLokasi} />
            <Stack.Screen name="PilihLokasiKirim" component={PilihLokasiKirim} />
            <Stack.Screen name="CDetailPesanan" component={CDetailPesanan} />
            <Stack.Screen name="CheckoutInfo" component={CheckoutInfo} />
            <Stack.Screen name="CKirimBarang" component={CKirimBarang} />
            <Stack.Screen name="CTitipBarang" component={CTitipBarang} />
            <Stack.Screen name="CCampaignPage" component={CCampaignPage} />
            <Stack.Screen name="CLupaPassword" component={CLupaPassword} />
            <Stack.Screen name="CGantiPassword" component={CGantiPassword} />   
            <Stack.Screen name="UploadPembayaran" component={UploadPembayaran} />   
            <Stack.Screen name="DetailMapPesanan" component={DetailMapPesanan} />   
        </Stack.Navigator>
    )
}

export default function RouterApp() {
    const globalState = useSelector(state => state)
    const jenisLogin = globalState.user.jenisLogin;

    if(jenisLogin == 'DRIVER') {        
        return <DriverStack />
    } else if(jenisLogin == 'USER') {
        return <UserStack />
    } else if (jenisLogin == 'OWNER') {
        return <OwnerStack />
    }
    else return <UserStack />
}


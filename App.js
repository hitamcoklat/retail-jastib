import React from 'react'
import PageChange from './src/components/PageChange';
import CDetailKategori from './src/components/CDetailKategori';
import CLogin from './src/components/CLogin';
import CRegister from './src/components/CRegister';
import CDetailProduk from './src/components/CDetailProduk';
import CRegisterSuccess from './src/components/CRegisterSuccess';
import Cart from './src/components/Cart';
import PDalamProses from './src/components/PDalamProses';
import CDetailPesanan from './src/components/CDetailPesanan';
import PilihLokasi from './src/components/PilihLokasi';
import CheckoutInfo from './src/components/CheckoutInfo';
import CKirimBarang from './src/components/CKirimBarang';
import CCampaignPage from './src/components/CCampaignPage';
import CLupaPassword from './src/components/CLupaPassword';
import CGantiPassword from './src/components/CGantiPassword';
import CDriver from './src/components/CDriver'
import Pesanan from './src/components/Pesanan';
import RouterApp from './src/router'

import { Provider } from 'react-redux';
// import { store, persistor } from './src/redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './src/redux/configureStore'
import CGoogleMap from './src/components/CGoogleMap';
const { store, persistor } = configureStore();

function HomeScreen() {
  return (
    <PageChange />
  );
}

const Stack = createStackNavigator();
const App = ({ page }) => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RouterApp />
        </NavigationContainer>   
      </PersistGate>   
    </Provider>
  )
}

// const mapStateToProps = () => {
//   const page = getFooterLink();
//   return { page };
// }

// export default connect(mapStateToProps)(App)
export default App;
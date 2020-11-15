import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import footer from './footer';
import user from './user';
import cart from './cart';
import alamat from './alamat';

export default combineReducers({ 
    footer, 
    user,
    cart,
    alamat,
    visibilityFilter 
})
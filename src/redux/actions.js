import {
    ADD_TODO, 
    TOGGLE_TODO, 
    SET_FILTER, 
    SET_FOOTER, 
    SET_DATA_LOGIN, 
    LOGOUT_USER,
    ADD_ALAMAT,
    SET_ID_DAERAH,
    ADD_METODA_PEMBAYARAN,
    SET_DATA_PESANAN,
    SET_PESANAN_EMPTY,
    SET_JENIS_LOGIN
} from './actionTypes';

let nextTodoId = 0;

export const addTodo = content => ({
    type: ADD_TODO,
    payload: {
        id: ++nextTodoId,
        content
    }
});

export const setFooter = content => ({
    type: SET_FOOTER,
    payload: {
        content
    }
})

export const setIdDaerah = content => ({
    type: SET_ID_DAERAH,
    payload: {
        content
    }
})

export const setDataLogin = content => ({
    type: SET_DATA_LOGIN,
    payload: {
        content
    }
})

export const setJenisLogin = content => ({
    type: SET_JENIS_LOGIN,
    payload: {
        content
    }
})

export const setPesanan = content => ({
    type: SET_DATA_PESANAN,
    payload: {
        content
    }
})

export const setPesananEmpty = () => ({
    type: SET_PESANAN_EMPTY,
})

export const setAddAlamat = content => ({
    type: ADD_ALAMAT,
    payload: {
        content
    }
})

export const setMetodaPembayaran = content => ({
    type: ADD_METODA_PEMBAYARAN,
    payload: {
        content
    }
})

export const setLogout = () => ({
    type: LOGOUT_USER
})

export const toggleTodo = id => ({
    type: TOGGLE_TODO,
    payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
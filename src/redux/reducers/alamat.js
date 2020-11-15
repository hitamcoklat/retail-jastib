import { ADD_ALAMAT, ADD_METODA_PEMBAYARAN } from '../actionTypes'

const initialState = {
    dataAlamat: [],
    metodaPembayaran: '1'
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_ALAMAT: {
            const { content } = action.payload
            return {
                ...state,
                dataAlamat: content,
            }
        }
        case ADD_METODA_PEMBAYARAN: {
            const { content } = action.payload
            return {
                ...state,
                metodaPembayaran: content,
            }
        }
        default:
            return state
    }
}
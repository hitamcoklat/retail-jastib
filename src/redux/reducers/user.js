import { SET_DATA_LOGIN, LOGOUT_USER, SET_JENIS_LOGIN, SET_ID_DAERAH, SET_DATA_PESANAN, SET_PESANAN_EMPTY } from '../actionTypes'

const initialState = {
    dataUser: [],
    idDaerah: '1',
    jenisLogin: '',
    dataPesanan: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_DATA_LOGIN: {
            const { content } = action.payload
            return {
                ...state,
                dataUser: content,
            }
        }
        case LOGOUT_USER: {
            return {
                ...state,
                dataUser: [],
            }
        }
        case SET_ID_DAERAH: {
            const { content } = action.payload
            return {
                ...state,
                idDaerah: content,
            }
        }
        case SET_JENIS_LOGIN: {
            const { content } = action.payload
            return {
                ...state,
                jenisLogin: content
            }
        }
        case SET_DATA_PESANAN: {
            const { content } = action.payload
            return {
                ...state,
                dataPesanan: content,
            }
        }
        case SET_PESANAN_EMPTY: {
            return {
                ...state,
                dataPesanan: [],
            }
        }
        default:
            return state
    }
}
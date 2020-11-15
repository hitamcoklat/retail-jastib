import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, EMPTY_CART } from '../actionTypes'

const initialState = {
    cartItem: [],
    total: 0
}

export default function (state = initialState, action) {
    switch (action.type) {

        case ADD_TO_CART: {
            const { content } = action.payload
            console.log(action.id)

            let addedItem = state.cartItem.find(item => item.id_produk === action.id)
            let existed_item = state.cartItem.find(item => action.id === item.id_produk)
            
            if (existed_item) {
                addedItem.quantity += 1
                return {
                    ...state,
                    total: state.total + parseInt(addedItem.harga.replace(".", ""))
                }
            } else {
                let newTotal = state.total + parseInt(content.harga.replace(".", ""));
                content.quantity = 1;
                return {
                    ...state,
                    cartItem: [...state.cartItem, content],
                    total: newTotal
                }
            }
        }  

        case ADD_QUANTITY: {
            const { content } = action.payload
            console.log(content)
            let addedItem = state.cartItem.find(item => item.id_produk === action.id)
            addedItem.quantity += 1
            let newTotal = state.total + parseInt(content.harga.replace(".", ""));
            return {
                ...state,
                total: newTotal
            }            
        }

        case EMPTY_CART: {
            return {
                ...state,
                cartItem: [],
                total: 0
            }            
        }
        
        case SUB_QUANTITY: {
            const { content } = action.payload
            let addedItem = state.cartItem.find(item => item.id_produk === action.id)
            //if the qt == 0 then it should be removed
            if (addedItem.quantity === 1) {
                let new_items = state.cartItem.filter(item => item.id_produk !== action.id)
                let newTotal = state.total - parseInt(content.harga.replace(".", ""));
                return {
                    ...state,
                    cartItem: new_items,
                    total: newTotal
                }
            }
            else {
                addedItem.quantity -= 1
                let newTotal = state.total - parseInt(content.harga.replace(".", ""));
                return {
                    ...state,
                    total: newTotal
                }
            }            
        }

        default:
            return state
    }
}
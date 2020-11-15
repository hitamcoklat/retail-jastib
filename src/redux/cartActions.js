import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, EMPTY_CART } from './actionTypes'

//add cart action
export const addToCart = (content, id) => {
    return {
        type: ADD_TO_CART,
        id: id,
        payload: {
            content
        }
    }
}
//remove item action
export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        id
    }
}
//subtract qt action
export const subtractQuantity = (content, id) => {
    return {
        type: SUB_QUANTITY,
        id: id,
        payload: {
            content
        }
    }
}
//add qt action
export const addQuantity = (content, id) => {
    return {
        type: ADD_QUANTITY,
        id: id,
        payload: {
            content
        }
    }
}

export const emptyCart = () => {
    return {
        type: EMPTY_CART
    }
}
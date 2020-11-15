import { SET_FOOTER } from '../actionTypes'

const initialState = {
    PAGE: 'one',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_FOOTER: {
            const { content } = action.payload;
            return {
                PAGE: content
            }
        }
        default:
            return state
    }
}
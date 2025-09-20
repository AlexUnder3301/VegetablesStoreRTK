import type { CardDataItemType } from "../shared/utils/types";
import { createSlice } from "@reduxjs/toolkit";

interface CartStateType {
    cart: CardDataItemType[],
    totalPrice: number
}

const initialState: CartStateType = {
    cart: [],
    totalPrice: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.cart = action.payload
            state.totalPrice = state.cart.reduce((acc, cur) => {
                const total = cur.price * cur.quantity 
                return total + acc
            }, 0)
        },
    }
})

export const {addToCart} = cartSlice.actions
export default cartSlice.reducer
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cart from "./cartSlice";
import data from './dataSlice'

const rootReducer = combineReducers({
    cart,
    data
})

const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export default setupStore()

export type RootState = ReturnType<typeof rootReducer> 
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
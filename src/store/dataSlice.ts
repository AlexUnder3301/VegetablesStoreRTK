import type { DataItemType } from '../shared/utils/types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface DataStateType {
    data: DataItemType[],
    isLoading: boolean,
    error: string | null
}

const initialState: DataStateType = {
    data: [],
    isLoading: false,
    error: null
}

export const getData = createAsyncThunk(
    'data/getData',
    async function(_, { rejectWithValue }) {
        try {
            const response = await fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')

            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }

            const data = await response.json()
            return data
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Unknown error occurred');
        }
    }
)

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => { 
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
})

export default dataSlice.reducer
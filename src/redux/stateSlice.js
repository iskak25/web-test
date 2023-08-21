import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Services } from '../services'

const initialState = {
  value: 0,
  data: [],
}

export const GetState = createAsyncThunk('GetState', async (thunkAPI) => {
  try {
    return await Services.GetState()
  } catch (error) {
    if (typeof error === 'string') {
      error(error)
      return thunkAPI.rejectWithValue(error)
    }
    if (error) {
      const message =
        error.response?.data?.detail ||
        (error.response &&
          error.response?.data &&
          error.response?.data?.message) ||
        error.message ||
        error.toString()
      error(message)
      return thunkAPI.rejectWithValue(message)
    }
    throw error
  }
})

export const stateSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetState.pending, (state) => {
        state.isLoading = true
      })
      .addCase(GetState.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload?.data
      })
      .addCase(GetState.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = null
      })
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = stateSlice.actions

export default stateSlice.reducer

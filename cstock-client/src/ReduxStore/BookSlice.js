import { createSlice } from '@reduxjs/toolkit'


export const bookSlice = createSlice({
  name: 'books',
  initialState: {
    Allbooks: []
  },
  reducers: {
    addBooks(state, action){
        state.Allbooks = action.payload
    }
  }

})

export const {addBooks} = bookSlice.actions
export default bookSlice.reducer
import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: 'auth',
    initialState: {
        login: false,
        userdata: "",
        error: ""
    },
    reducers:{
      loginStatus: (state, action) => {
        state.login = action.payload
      },
      
      addUser: (state, action) => {
        state.userdata = action.payload
      }
    }

})
  


export const { loginStatus, addToken, addUser} = userSlice.actions;
export default userSlice.reducer
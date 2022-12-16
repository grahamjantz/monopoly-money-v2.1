import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomId: ''
}

const AppSlice = createSlice({
    name: 'app_slice',
    initialState,
    reducers: {
     addRoomId: (state, action) => {
        state.roomId = action.payload
     }   
    }
})

export const { addRoomId } = AppSlice.actions

export const selectRoomId = (state) => state.app_slice.roomId

export default AppSlice.reducer
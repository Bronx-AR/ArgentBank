import { createSlice } from '@reduxjs/toolkit'

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState: { token: "" },
    reducers: {
        setLogIn: (state, action) => {
            state.token = action.payload.token
        },
        setLogOut: (state) => {
            state.token = ""
        },
    },
});

export const { setLogIn, setLogOut } = userAuthSlice.actions
export default userAuthSlice.reducer
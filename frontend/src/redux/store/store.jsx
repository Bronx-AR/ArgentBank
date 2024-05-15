import { configureStore } from "@reduxjs/toolkit"
import userAuthSlice from "../reducers/userAuthSlice"
import profileSlice from "../reducers/profileSlice"

const store = configureStore({
    reducer: {
        userAuth: userAuthSlice,
        profile: profileSlice
    },
})

export default store
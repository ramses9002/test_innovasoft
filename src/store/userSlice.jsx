import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 0,
    username: "",
    password: "",
};

const userSlice = createSlice({
    name: "userStore",
    initialState,
    reducers: {
        authUser(state, action) {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
        logOutUser(state, action) {
            state.id = 0;
        },
    },
});

export const userSliceActions = userSlice.actions;
export default userSlice.reducer;

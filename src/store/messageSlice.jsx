import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dinamicMessage: {
        shower: false,
        type_question: 0, //1-OK, 2- Warning, 3-Error
        title: "",
    },
    transparentLoader: false,
};

const messageSlice = createSlice({
    name: "messageStore",
    initialState,
    reducers: {
        showDinamicMessage(state, action) {
            state.dinamicMessage.shower = action.payload.shower;
            state.dinamicMessage.type_question = action.payload.type_question;
            state.dinamicMessage.title = action.payload.title;
        },
        closeDinamicMessage(state, action) {
            state.dinamicMessage.shower = action.payload;
        },
        showTransparentLoader(state, action) {
            state.transparentLoader = action.payload;
        },
    },
});

export const messageSliceActions = messageSlice.actions;
export default messageSlice.reducer;

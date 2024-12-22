import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";
import messageSlice from "./messageSlice";
// persist config storage

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

// put all slice inside rootReducer
// property key write as like below

const rootReducer = combineReducers({
    // alert, it has to have the same "name" as the createSlice
    userStore: userSlice,
    messageStore: messageSlice,
});

// persisted all reducers inside persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store configure
const store = configureStore({
    reducer: persistedReducer,
});

export default store;

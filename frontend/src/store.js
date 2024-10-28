import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './features/api/baseApiSlice';

import authSliceReducer from './features/appSlices/authSlice';


const store = configureStore({
    // reducer: waa functions ka uu application-kaaga lahaan doono
    reducer: { // means: waa action-ka
        // path-ka uu function-kaan aadi doono
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authSliceReducer

        // function-ka uu lahaan doono appkeena ayaan ku qeexeena halkan
    },
    // haddi aad middleware ubaahantahy
    // means: getDefaultMiddleware: middleware-ka uu leeyhay redux-ga ku daba qabo middleware-keena sida authenticate
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;


import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    // This means: haddi user-ka uu mar login dhahy xogtisa localStoarge-ka ku keydi
    // hadi laso waayana waa User hadda login so dhahay
    // haddi uu horay u joogay localStotage-ka aya laga hela
    
    userInfo: localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) : null 
}
// createSlice: redux-ki waye state-keena ayu kuso xiraa
const authSlice = createSlice({
    name: "auth", // store.js ayan ku qorena hadda
    initialState,
    reducers: { // waa sida detePost, createPost,getAllpost means: wa action
        // setCredentials: markuu user-ka login uu dhaho information-kisa ayaan set garenena
        setCredentials: (state, action) => {
            // state-ka data aa ku shubeena
            state.userInfo = action.payload; // information-ka aan so baasi doono marka aan login dhahno
            // local storage-ka update-gare

            const expirationTime = new Date().getTime() + action.payload.expiresIn;

            localStorage.setItem('expirationTime', expirationTime.toString());
            localStorage.setItem('userInfo', JSON.stringify(action.payload));

            
            
        }
    }
});
// waxa ubahaany labo export:
// 1.action-ka oo ah setCredentials: action waa specific action sida loginUser, deletePost
// 2. reducer oo ah authSlice, 

export const {setCredentials} = authSlice.actions; // 
export default authSlice.reducer;

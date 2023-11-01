import { createSlice } from "@reduxjs/toolkit";

const exp = createSlice({
    name:"explist",
    initialState:[],
    reducers:{
        setexplist(state, action){
           state.push(action.payload);
        }
    }

})
export const {setexplist}= exp.actions;
export default exp.reducer;
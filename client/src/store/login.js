import { createSlice } from "@reduxjs/toolkit";

const islogin = createSlice({
    name:"login",
    initialState:{
        user:false,
        head:"LogIn",
        narrow:true,
        loader:false,
        isadmin:true,
        promotor:[],
        customer:[],
        ledger:[]
    },
    reducers:{
        login(state, action){
           state.user = action.payload;
        },
        header(state, action){
           state.head = action.payload;
        },
        setnarrow(state, action){
           state.narrow = action.payload;
        },
        setloader(state, action){
           state.loader = action.payload;
        },
        setadmin(state, action){
           state.isadmin = action.payload;
        },
        setpromotor(state, action){
           state.promotor=[];
           state.promotor.push(action.payload);
        },
        setcustomer(state, action){
           state.customer=[];
           state.customer.push(action.payload);
        },
        setledger(state, action){
           state.ledger=[];
           state.ledger.push(action.payload);
        }
    }

})
export const {login,header,setnarrow,setloader,setadmin,setpromotor,setcustomer,setledger}= islogin.actions;
export default islogin.reducer;
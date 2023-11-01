import { configureStore } from "@reduxjs/toolkit";
import login from "./login";
import exp from "./explist";

const store = configureStore({
    reducer: {
        login: login
    }
})
export default store;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type TypeUser = {
    id:number;
    name:string;
    address:string;
    phone:string|null;
    email:string;
}


type TypeAuth = {
    user:TypeUser|null;
    isAuth:boolean;
    error:string|null;
}

const initialState:TypeAuth = {
    user:null,
    isAuth:false,
    error:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action:PayloadAction<TypeUser>){
            state.isAuth = true;
            state.user =action.payload;
        },
        logout(state){
            state.isAuth = false;
            state.user = null;
        }
    }
})


export const { login,logout } = authSlice.actions;

export default authSlice.reducer;
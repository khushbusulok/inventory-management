import { UserType } from '@/app/types/user';
import { auth_url } from '@/app/utils';
import { Dispatch, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    user: [] ,
    isLoading: false,
    error: null,
    notification: null,
    variant: 'success',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
            state.notification = null;
          },
      
          // HAS ERROR
          hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
            state.notification = action.payload;
            state.variant = 'error';
          },
        login:(state,action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        // logout:(state)=>{
        //     state.isAuthenticated = false;
        //     state.user = null;
        // }
    },
  })

// Action creators are generated for each case reducer function
export const { login } = authSlice.actions
export const selectAuth = (state:any) => state.auth;
const authReducer = authSlice.reducer 
export default authReducer

export function loginMethod(data: UserType) {
    return async (dispatch: Dispatch) => {
      dispatch(authSlice.actions.startLoading());
      try {
        const response = await axios.post(`${auth_url}/signin`, data);
        if (response?.data) {
          dispatch(authSlice.actions.login(response.data));
        } else {
          dispatch(authSlice.actions.hasError(response?.data?.message));
        }
        return response;
      } catch (error) {
        dispatch(authSlice.actions.hasError(error));
        return error;
      }
    };
}
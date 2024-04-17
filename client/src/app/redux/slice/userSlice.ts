import { UserType } from '@/app/types/user';
import { auth_url, user_url } from '@/app/utils';
import { Dispatch, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
axios.defaults.withCredentials = true


const initialState = {
    user: null ,
    isLoading: false,
    error: null,
    notification: null,
    variant: 'success',
}

const userSlice = createSlice({
    name: 'user',
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
        getUser:(state,action) => {
            state.user = action.payload;
        },
    },
  })

// Action creators are generated for each case reducer function
export const { getUser } = userSlice.actions
const userReducer = userSlice.reducer 
export default userReducer

export function getUserData() {
    return async (dispatch: Dispatch) => {
      dispatch(userSlice.actions.startLoading());
      try {
        const response = await axios.get(`${user_url}/getUser`)
        if (response?.data) {
          dispatch(userSlice.actions.getUser(response.data));
        } else {
          dispatch(userSlice.actions.hasError(response?.data?.message));
        }
        return response;
      } catch (error) {
        dispatch(userSlice.actions.hasError(error));
        return error;
      }
    };
}
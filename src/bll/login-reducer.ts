import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {authAPI} from "./../dal/authApi";
import {setUserProfile} from './profile-reducer';
import {setAppError, setAppStatus} from "./app-reducer";


const initialState: InitStateType = {
    isLoggedIn: false,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        isLoggedIn: (state, action: PayloadAction< boolean>) => {
            state.isLoggedIn = action.payload
        },
    },
})


//Thunk
export const loginTC = createAsyncThunk(
    'login/loginTC',
    async (params: { email: string, password: string, rememberMe: boolean }, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            let {data} = await authAPI.login(params.email, params.password, params.rememberMe)
            dispatch(isLoggedIn(true))
            dispatch(setUserProfile(data))
            dispatch(setAppStatus('succeeded'))
        } catch (e: any) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', Try later')
            dispatch(setAppError(error))
            dispatch(setAppStatus('failed'))
        }
    }
)

export const logoutTC = createAsyncThunk(
    'login/loginTC',
    async (_, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            await authAPI.logout()
            dispatch(setAppStatus('succeeded'))
            dispatch(isLoggedIn(false))
        } catch (e: any) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', Try later')
            dispatch(setAppError(error))
            dispatch(setAppStatus('failed'))
        }
    }
)


//types
type InitStateType = {
    isLoggedIn: boolean
}

//actions
export const {isLoggedIn} = loginSlice.actions

export const loginReducer = loginSlice.reducer
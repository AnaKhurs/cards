import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {authAPI, LoginResponseType, UserDataType} from './../dal/authApi';
import {setAppError, setAppStatus} from "./app-reducer";


const profileSlice = createSlice({
    name: 'profile',
    initialState: {} as InitStateType,
    reducers: {
        setUserProfile: (state, action: PayloadAction<LoginResponseType>) => {
            return action.payload
        },
        setUserData: (state, action: PayloadAction<LoginResponseType>) => {
            return action.payload
        }
    },
})


export const changeUserDataTC = createAsyncThunk(
    'profile/changeUserData',
    async (userData: UserDataType, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            const {data} = await authAPI.changeUserData(userData)
            dispatch(setUserData(data.updatedUser))
        } catch (e: any) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setAppError(error))
        } finally {
            dispatch(setAppStatus('succeeded'))
        }
    }
)

type InitStateType = ProfileType

export type ProfileType = Pick<LoginResponseType, 'name' | 'avatar' | 'publicCardPacksCount' | 'email'>

export const {setUserProfile, setUserData} = profileSlice.actions

export const profileReducer = profileSlice.reducer
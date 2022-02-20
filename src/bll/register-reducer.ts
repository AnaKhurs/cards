import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {authAPI} from "../dal/authApi";
import {setAppError, setAppStatus} from "./app-reducer";

const initialState = {
    isRegistrationSuccess: false,
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setRegistrationSuccess(state, action: PayloadAction<boolean >) {
            state.isRegistrationSuccess = action.payload
        },
    }
})

export const registerReducer = registerSlice.reducer
export const {setRegistrationSuccess} = registerSlice.actions;

export const registrationTC = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        await authAPI.registration(email, password)
        dispatch(setAppStatus('succeeded'))
        dispatch(setRegistrationSuccess(true))
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', Try later')
        dispatch(setAppStatus('succeeded'))
        dispatch(setAppError(error))
    }
}
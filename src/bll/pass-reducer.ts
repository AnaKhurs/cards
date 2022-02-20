import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {PATH} from '../utils/paths';
import {setAppError, setAppStatus} from './app-reducer';
import {NewPassRequestType, passwordAPI} from '../dal/password-api';

export const sendInstructions = createAsyncThunk('forgot/sendInstructions', async (email: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus('loading'))
    try {
        let res = await passwordAPI.recover({
            email, from: 'Best INCUBATOR IT-team',
            message: `<div style="background-color: lime; padding: 15px">
                        password recovery link: 
                        <a href='http://localhost:3000/friday#${PATH.CREATE_PASS}/$token$'>link</a>
                      </div>\``
        })
        dispatch(setAppStatus('succeeded'))
        return {success: res.data.success, email}
    } catch (e: any) {
        dispatch(setAppStatus('failed'))
        dispatch(setAppError(e.response.data.error))
        return rejectWithValue(e.response.data)
    }
})

export const sendNewPassword = createAsyncThunk('forgot/sendNewPassword',
    async (data: NewPassRequestType, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus('loading'))
        try {
            let res = await passwordAPI.setNewPass(data)
            dispatch(setAppStatus('succeeded'))
            dispatch(setAppError(res.data.info))
        } catch (e: any) {
            dispatch(setAppStatus('failed'))
            return rejectWithValue({})
        }
    })

const passRecoverSlice = createSlice({
    name: 'forgot',
    initialState: {
        success: false,
        email: null as string | null,
        token: null as string | null,
        passChanged: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(sendInstructions.fulfilled, (state, action) => {
            if (action.payload) {
                state.success = action.payload.success
                state.email = action.payload.email
            }
        })
        builder.addCase(sendNewPassword.fulfilled, state => {
            state.token = null
            state.email = null
            state.passChanged = true
        })
    }
})

export const passReducer = passRecoverSlice.reducer
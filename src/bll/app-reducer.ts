import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../dal/authApi";
import {isLoggedIn} from "./login-reducer";
import {changeUserDataTC, setUserProfile} from './profile-reducer';
import {sendNewPassword} from './pass-reducer';


const initialState: InitStateType = {
    error: null,
    status: 'loading',
    isInitialized: false,
    _id: '',
}


const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        setAppStatus: (state, action: PayloadAction<StatusType>) => {
            state.status = action.payload
        },
        setAppInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, (state, action) => {
            if (action.payload) {
                state._id = action.payload.id
            }
        });
    }
})


//Thunk
export const initializeApp = createAsyncThunk(
    'app/initializeApp',
    async (_, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            const {data} = await authAPI.authMe()
            dispatch(isLoggedIn(true))
            dispatch(setUserProfile(data))
            return {id: data._id}
        } catch (e: any) {
            dispatch(isLoggedIn(false))
        } finally {
            dispatch(setAppInitialized(true))
            dispatch(setAppStatus('succeeded'))
        }
    }
)

//types
type InitStateType = {
    error: string | null
    status: StatusType
    isInitialized: boolean
    _id: string
}

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

//actions
export const {setAppError, setAppStatus, setAppInitialized} = appSlice.actions

export const appReducer = appSlice.reducer
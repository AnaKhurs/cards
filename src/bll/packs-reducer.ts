import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CardPackType, packsApi, PayloadType} from '../dal/packs-api';
import {setAppError, setAppStatus} from './app-reducer';

const cardsSlice = createSlice({
        name: 'packs',
        initialState: {
            cardPacks: [] as CardPackType[],
            isLoaded: false,
            cardPacksTotalCount: 0 as number,
            maxCardsCount: 0 as number,
            minCardsCount: 0 as number,
            page: 0 as number,
            pageCount: 10 as number
        },
        reducers: {
            clearPacksData(state) {
                state.cardPacks = []
                state.isLoaded = false
            },
            deletePack(state, action: PayloadAction<string>) {
                state.cardPacks = state.cardPacks.filter(item => item._id !== action.payload)
            },
            addPack(state, action: PayloadAction<{pack : CardPackType}>) {
                state.cardPacks.unshift({...action.payload.pack})
            }
        },
        extraReducers: builder => {
            builder.addCase(fetchPacks.fulfilled, (state, action) => {
                if (action.payload) {
                    return {...action.payload, isLoaded: true}
                }
            })
        }
    },
)


//Thunk
export const fetchPacks = createAsyncThunk(
    'packs/fetchCards',
    async (data: PayloadType, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus('loading'))
        try {
            const res = await packsApi.getPack(data)
            dispatch(setAppStatus('succeeded'))
            return res.data
        } catch (e: any) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', Try later')
            console.log({...e})
            dispatch(setAppError(error))
            dispatch(setAppStatus('failed'))
            return rejectWithValue({})
        }
    }
)

export const createPack = createAsyncThunk(
    'packs/createPack',
    async (name: string, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            const res = await packsApi.addPack(name)
            debugger
            dispatch(addPack({pack:res.data.newCardsPack}))
            dispatch(setAppStatus('succeeded'))
            console.log(res)
        } catch (e: any) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', Try later')
            dispatch(setAppError(error))
            dispatch(setAppStatus('failed'))
        }
    }
)

export const removePack = createAsyncThunk(
    'packs/deletePack',
    async (_id: string, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            const res = await packsApi.deletePack(_id)
            dispatch(setAppStatus('succeeded'))
            debugger
            dispatch(deletePack(res.data.deletedCardsPack._id))
            console.log(res)
        } catch (e: any) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', Try later')
            dispatch(setAppError(error))
            dispatch(setAppStatus('failed'))
        }
    }
)

export const updatePack = createAsyncThunk(
    'packs/updatePack',
    async (params: { name: string, _id: string }, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            await packsApi.updatePack(params.name, params._id)
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


export const {clearPacksData, deletePack,addPack} = cardsSlice.actions

export const packsReducer = cardsSlice.reducer
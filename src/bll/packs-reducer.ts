import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CardPackType, GetPacksPayloadType, AddPackRequestType, packsApi, UpdatePackRequestType} from '../dal/packs-api';
import {setAppError, setAppStatus} from './app-reducer';

const packsSlice = createSlice({
        name: 'packs',
        initialState: {
            packs: {
                cardPacks: [] as CardPackType[],
                cardPacksTotalCount: 0 as number,
                maxCardsCount: 103 as number,
                minCardsCount: 0 as number,
                page: 1 as number,
                pageCount: 10 as number,
            },
            value: null as string | null,
            isLoaded: false,
            own: false,
            sliderValue: [] as number[],
            sortValue: '0created' as string,
            sortDirection: '0'  as string,
        },
        reducers: {
            clearPacksData(state) {
                state.packs.cardPacks = []
                state.isLoaded = false
            },
            setOwn(state, action: PayloadAction<boolean>) {
                state.own = action.payload
            },
            setSearchValue(state, action: PayloadAction<string>) {
                state.value = action.payload
            },
            setSliderValue(state, action: PayloadAction<number[]>) {
                state.sliderValue = action.payload
            },
            setSortValue(state, action: PayloadAction<string>) {
                state.sortValue = action.payload
            },
            setSortDirection(state, action: PayloadAction<string>) {
                state.sortDirection = action.payload
            }
        },
        extraReducers: builder => {
            builder.addCase(fetchPacks.fulfilled, (state, action) => {
                if (action.payload) {
                    state.packs = action.payload
                    state.isLoaded = true
                }
            })
        }
    },
)

//Thunk
export const fetchPacks = createAsyncThunk(
    'packs/fetchCards',
    async (data: GetPacksPayloadType, {dispatch, rejectWithValue}) => {
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
    async ({fetchData, data}: { fetchData: GetPacksPayloadType, data: AddPackRequestType }, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            const res = await packsApi.addPack(data)
            await dispatch(fetchPacks(fetchData))
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

export const removePack = createAsyncThunk(
    'packs/deletePack',
    async ({fetchData, packId}: { fetchData: GetPacksPayloadType, packId: string }, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            const res = await packsApi.deletePack(packId)
            await dispatch(fetchPacks(fetchData))
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

export const updatePack = createAsyncThunk(
    'packs/updatePack',
    async ({fetchData, data}: { fetchData: GetPacksPayloadType, data: UpdatePackRequestType }, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            await packsApi.updatePack(data)
            let res = await dispatch(fetchPacks(fetchData))
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

export const {clearPacksData, setOwn, setSearchValue, setSliderValue, setSortValue, setSortDirection} = packsSlice.actions

export const packsReducer = packsSlice.reducer
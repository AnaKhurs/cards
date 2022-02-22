import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {setAppError, setAppStatus} from './app-reducer';
import {cardsAPI, CreateCardRequestType, GetCardsRequestType, GradeRequestType, UpdateTaskRequestType} from '../dal/cards-api';
import {fetchPacks} from './packs-reducer';

const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        cardsData: {
            cards: [] as CardType[],
            cardsTotalCount: 0,
            maxGrade: 0,
            minGrade: 0,
            packUserId: null as string | null,
            page: 1,
            pageCount: 10,
        },
        packId: null as string | null,
        isLoaded: false,
    },
    reducers: {
        setPackId(state, action: PayloadAction<string>) {
            state.packId = action.payload
        },
        clearCardsData(state) {
            state.cardsData = {
                cards: [] as CardType[],
                cardsTotalCount: 0,
                maxGrade: 0,
                minGrade: 0,
                packUserId: null,
                page: 0,
                pageCount: 10
            } as typeof state.cardsData;
            state.packId = null;
            state.isLoaded = false;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchCards.fulfilled, (state, action) => {
            if (action.payload) {
                state.cardsData = {...action.payload.data}
                state.isLoaded = true
                state.packId = action.payload.packId
            }
        });
        builder.addCase(deleteCard.fulfilled, (state, action) => {
            if (action.payload) {
                let filteredCards = state.cardsData.cards.filter(c => c._id !== action.payload)
                state.cardsData.cards = filteredCards
            }
        })
    }
})

export const fetchCards = createAsyncThunk('cards/fetchCards',
    async (data: GetCardsRequestType, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            let res = await cardsAPI.getCards(data)
            dispatch(setAppStatus('succeeded'))
            return {packId: data.cardsPack_id, data: res.data}
        } catch (e: any) {
            dispatch(setAppError(e.response.error + ' ' + e.response.in))
        }
    })

export const deleteCard = createAsyncThunk('cards/deleteCard',
    async ({fetchData, cardId}: {fetchData: GetCardsRequestType, cardId: string}, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            let res = await cardsAPI.deleteCard(cardId)
            await dispatch(fetchCards(fetchData))
            dispatch(setAppStatus('succeeded'))
            return cardId
        } catch (e: any) {
            dispatch(setAppStatus('failed'))
            dispatch(setAppError(e.response.error + ' ' + e.response.in))
        }
    })

export const updateCard = createAsyncThunk('cards/updateCard',
    async ({fetchData, data}: { fetchData: GetCardsRequestType, data: UpdateTaskRequestType }, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            let res = await cardsAPI.updateCard(data)
            await dispatch(fetchCards(fetchData))
            dispatch(setAppStatus('succeeded'))
        } catch (e: any) {
            dispatch(setAppError(e.response.error + ' ' + e.response.in))
        }
    })

export const createCard = createAsyncThunk('cards/createCard',
    async ({fetchData, data}: {fetchData: GetCardsRequestType, data: CreateCardRequestType}, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus('loading'))
            let res = await cardsAPI.createCard(data)
            await dispatch(fetchCards(fetchData))
            dispatch(setAppStatus('succeeded'))
        } catch (e: any) {
            dispatch(setAppError(e.response.error + ' ' + e.response.in))
        }
    })

export const setGrade = createAsyncThunk('cards/setGrade',
    async ({fetchData, data}: {fetchData: GetCardsRequestType, data: GradeRequestType}, {dispatch}) => {
    try {
        dispatch(setAppStatus('loading'))
        let res = await cardsAPI.setGrade(data)
        console.log(res)
        await dispatch(fetchCards(fetchData))
        dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
        dispatch(setAppError('grade failed'))
        dispatch(setAppStatus('failed'))
    }
})

export const cardsReducer = cardsSlice.reducer
export const {setPackId, clearCardsData} = cardsSlice.actions

export type CardType = {
    answer: string,
    question: string,
    cardsPack_id: string,
    grade: number,
    rating: number,
    shots: number,
    type: string,
    user_id: string,
    created: string,
    updated: string,
    __v: number;
    _id: string,
}
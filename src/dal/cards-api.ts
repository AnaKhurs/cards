import {instance} from './instance';
import {CardType} from '../bll/cards-reducer';

export const cardsAPI = {
    getCards(data: GetCardsRequestType) {
        return instance.get<GetCardsResponseType<CardType[]>>(`cards/card`, {params: data})
    },
    createCard(data: CreateCardRequestType) {
        return instance.post(`cards/card`, {card: data})
    },
    deleteCard(cardId: string) {
        return instance.delete(`cards/card?id=${cardId}`)
    },
    updateCard(data: UpdateTaskRequestType) {
        return instance.put(`cards/card`, {card: data})
    },
    setGrade(data: GradeRequestType) {
        return instance.put(`cards/grade`, data)
    }
}

export type GradeRequestType = {
    card_id: string,
    grade: number,
}

export type CreateCardRequestType = {
    cardsPack_id: string
    question?: string,
    answer?: string,
    grade?: number,
    shots?: number,
    rating?: number,
    answerImg?: string,
    questionImg?: string,
    questionVideo?: string,
    answerVideo?: string,
    type?: string,
}

export type GetCardsRequestType = {
    cardsPack_id: string,
    cardQuestion?: string,
    cardAnswer?: string,
    min?: number,
    max?: number,
    sortCards?: string,
    page?: number,
    pageCount?: number,
}

export type GetCardsResponseType<D> = {
    cards: D,
    cardsTotalCount: number,
    maxGrade: number,
    minGrade: number,
    packUserId: string,
    page: number,
    pageCount: number,
    token: string,
    tokenDeathTime: number,
}

export type UpdateTaskRequestType = {
    _id: string,
    question?: string,
    answer?: string,
    comment?: string,
}
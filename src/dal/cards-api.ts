import {instance} from './instance';
import {CardsType} from '../bll/cards-reducer';

export const cardsAPI = {
    getCards(cardsPack_id: string, data?: GetCardsRequestType) {
        return instance.get<GetCardsResponseType<CardsType[]>>(`cards/card?cardsPack_id=${cardsPack_id}`, {params: data})
    },
    createCard(cardsPack_id: string, data?: CreateCardRequestType) {
        return instance.post(`cards/card?cardsPack_id=${cardsPack_id}`, data, {params: data})
    },
    deleteCard(cardId: string) {
        return instance.delete(`cards/card?id=${cardId}`)
    },
    updateCard(data: UpdateTaskRequestType) {
        return instance.put(`cards/card`, data)
    }
}

export type CreateCardRequestType = {
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
    cardQuestion?: string,
    cardAnswer?: string,
    min?: number,
    max?: number,
    sortCards?: number,
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
    comment?: string,
}
import {instance} from './instance';

export type GetPacksPayloadType = {
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number,
    user_id?: string
};
export const packsApi = {
    getPack(data: GetPacksPayloadType) {
        return instance.get<ResponseType>(`/cards/pack`, {params: data})
    },
    addPack(data: AddPackRequestType) {
        return instance.post<AddPackResponseType>(`/cards/pack`, {cardsPack: data})
    },
    deletePack(id: string) {
        return instance.delete<DeletePackResponseType>(`/cards/pack?id=${id}`, {})
    },
    updatePack(data: UpdatePackRequestType) {
        return instance.put<ResponseType>(`/cards/pack`, {cardsPack: data})
    }
}

export type UpdatePackRequestType = {
    _id: string,
    name?: string,
}

export type AddPackRequestType = {
    name?: string,
    path?: string,
    grade?: number,
    shots?: number,
    rating?: number,
    deckCover?: string,
    private?: boolean,
    type?: string,
}

export type CardPackType = {
    _id: string,
    user_id: string,
    user_name: string,
    private: boolean,
    name: string,
    path: string,
    grade: number,
    shots: number,
    deckCover: string,
    cardsCount: number,
    type: string,
    rating: number,
    created: string,
    updated: string,
    more_id: string,
    __v: number
}

type ResponseType = {
    cardPacks: CardPackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type AddPackResponseType = {
    newCardsPack: CardPackType;
};

export type DeletePackResponseType = {
    deletedCardsPack: CardPackType
}


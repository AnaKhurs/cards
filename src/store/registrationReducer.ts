import {Dispatch} from "redux";
import {cardsAPI} from "../dal/api";


const initialState = {

}

type InitialStateType = typeof initialState

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "registrationReducer/registration":
            return {...state}
        default:
            return state
    }
}

export const registrationAC = () => ({type: "registrationReducer/registration"} as const)

export type demoAType = ReturnType<typeof registrationAC>

type ActionsType = demoAType

export const registrationTC = (email: string, password: string) => {
    return (dispatch: Dispatch) => {
        cardsAPI.registration(email, password)
            .then((res) => {
                debugger
                dispatch(registrationAC())
            })
    }
}

/*
created: "2022-02-04T22:16:35.446Z"
email: "kh8044@mail.ru"
isAdmin: false
name: "kh8044@mail.ru"
publicCardPacksCount: 0
rememberMe: false
updated: "2022-02-04T22:16:35.446Z"
verified: false
__v: 0
_id: "61fda5c35191210004840551"*/

/*{"addedUser":
    {"_id":"61fda5c35191210004840551",
        "email":"kh8044@mail.ru",
        "rememberMe":false,
        "isAdmin":false,
        "name":"kh8044@mail.ru",
        "verified":false,
        "publicCardPacksCount":0,
        "created":"2022-02-04T22:16:35.446Z",
        "updated":"2022-02-04T22:16:35.446Z",
        "__v":0}}*/

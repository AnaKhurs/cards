import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true,
})

// https://neko-back.herokuapp.com/2.0
// http://localhost:7542/2.0/

// api
export const cardsAPI = {

    registration(email: string, password: string) {
        return instance.post<AxiosResponse<ResponseType>>('auth/register', {email, password});
    },
}

// types

export type ResponseType = {
    addedUser: {}
    error?: string
}

//error
/*{"error":"not valid email/password /ᐠ-ꞈ-ᐟ\\",
    "in":"createUser",
    "isEmailValid":false,
    "isPassValid":false,
    "emailRegExp":{},
    "passwordRegExp":"Password must be more than 7 characters..."}*/

//ok
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
        "__v":0}
        }*/
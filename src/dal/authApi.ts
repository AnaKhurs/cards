// api
import {instance} from './instance';
import {AxiosResponse} from 'axios';

export const authAPI = {
    registration(email: string, password: string) {
        return instance.post<AxiosResponse<RegisterResponseType, {email: string, password: string}>>('auth/register', {email, password});
    },
    login(email: string, password: string, rememberMe:boolean) {
        return instance.post<{email: string, password: string, rememberMe:boolean}, AxiosResponse<LoginResponseType>>(
            `auth/login`, {email, password,rememberMe})
    },
    logout() {
        return instance.delete<{info: string, error: string}>(`/auth/me`)
    },
    authMe () {
        return instance.post<LoginResponseType>(`/auth/me`)
    },
    changeUserData (userData: UserDataType) {
        return instance.put(`auth/me`, userData)
    }

}

// types

export type UserDataType = {
    name?:string
    avatar?:string
}

export type LoginResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

export type RegisterResponseType = {
    addedUser: {
        _id: string,
        email: string,
        rememberMe: boolean,
        isAdmin: boolean,
        name: string,
        verified: boolean,
        publicCardPacksCount: number,
        created: string,
        updated: string,
        __v: number
    }
    error?: string
}



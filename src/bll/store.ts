import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {registerReducer} from './register-reducer';
import {loginReducer} from './login-reducer';
import {passReducer} from './pass-reducer';
import {profileReducer} from './profile-reducer';
import {appReducer} from "./app-reducer";
import {packsReducer} from './packs-reducer';
import {cardsReducer} from './cards-reducer';

const reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    passRecover: passReducer,
    profile: profileReducer,
    app: appReducer,
    packs: packsReducer,
    cards: cardsReducer,
})

export const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type RootStateType = ReturnType<typeof reducers>
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

//@ts-ignore
window.store = store
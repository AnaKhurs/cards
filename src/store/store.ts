import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {loginReducer} from "./loginReducer";
import {passwordRecoveryReducer} from "./passwordRecoveryReducer";
import {newPasswordReducer} from "./newPasswordReducer";
import {profileReducer} from "./profileReducer";
import {registrationReducer} from "./registrationReducer";

const rootReducer = combineReducers({
    login: loginReducer,
    newPassword: newPasswordReducer,
    passwordRecovery: passwordRecoveryReducer,
    profile: profileReducer,
    registration: registrationReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
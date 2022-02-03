import React from 'react'
import {Route, Routes} from "react-router-dom";
import {Login} from "../Pages/Login";
import {Registration} from "../Pages/Registration";
import {PageNotFound} from "../Pages/PageNotFound";
import {Profile} from "../Pages/Profile";
import {PasswordRecovery} from "../Pages/PasswordRecovery";
import {DemoUI} from "../Common/DemoUI";
import {NewPassword} from "../Pages/NewPassword";

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PASSWORD_RECOVERY: '/password_recovery',
    NEW_PASSWORD: '/new_password',
    PAGE_NOT_FOUND: '/page_not_found',
    DEMO: '/demo',
}

export function RoutesApp() {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Login/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.DEMO} element={<DemoUI/>}/>
                <Route path={PATH.PAGE_NOT_FOUND} element={<PageNotFound/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    )
}

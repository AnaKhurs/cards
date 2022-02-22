import { Navigate } from 'react-router-dom';
import {useAppSelector} from '../bll/store';
import React from 'react';
import {PATH} from '../utils/paths';

export const NotAuthRedirect = (Component: React.FC) => {
    function NewComponent(props: any) {
        const {isLoggedIn} = useAppSelector(state => state.login)
        if (!isLoggedIn) {
            return <Navigate to={PATH.LOGIN}/>
        }
        else return <Component {...props}/>;
    }
    return NewComponent
}
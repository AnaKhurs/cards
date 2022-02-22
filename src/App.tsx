import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Navigate, Route, Routes} from 'react-router-dom';

import {initializeApp} from "./bll/app-reducer";
import {useAppSelector} from "./bll/store";

import s from './App.module.scss'

import {PATH} from './utils/paths';
import {LoginPage} from './features/Pages/LoginPage/LoginPage';
import {RegisterPage} from './features/Pages/RegisterPage/RegisterPage';
import {NewPassCreate} from './features/Pages/NewPassCreate/NewPassCreate';
import {ForgotPage} from './features/Pages/ForgotPage/ForgotPage';
import {CheckSuccess} from './features/Pages/ForgotPage/CheckSuccess/CheckSuccess';
import {ProfilePage} from './features/Pages/ProfilePage/ProfilePage';
import {ErrorPage} from './features/Pages/ErrorPage/ErrorPage';
import {ErrorSnackbar} from './features/ErrorSnackbar/ErrorSnackBar';
import {Header} from "./features/Header/Header";
import {Packs} from "./features/Packs/Packs";
import LoadingStatusBackdrop from "./features/LoadingBackDrop/BackDrop";
import {Cards} from './features/Cards/Cards';


function App() {

    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!isInitialized) {
        return <div>
            <LoadingStatusBackdrop />
        </div>
    }

    return (
        <div className={s.app}>
            {isLoggedIn &&  <Header/>}
            <Routes>
                <Route path={PATH.LOGIN} element={<LoginPage/>}/>
                <Route path={PATH.MAIN} element={<Packs/>}/>
                <Route path={PATH.CARDS + '/:cardsPack_id'} element={<Cards/>}/>
                <Route path={PATH.REGISTER} element={<RegisterPage/>}/>
                <Route path={PATH.CREATE_PASS + '/:token'} element={<NewPassCreate/>}/>
                <Route path={PATH.FORGOT} element={<ForgotPage/>}/>
                <Route path={PATH.CHECK_SUCCESS} element={<CheckSuccess/>}/>
                <Route path={PATH.PROFILE} element={<ProfilePage/>}/>
                <Route path={PATH.ERROR} element={<ErrorPage/>}/>
            </Routes>
            <ErrorSnackbar/>
        </div>
    )
}

export default App;

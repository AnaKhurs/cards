import React from "react";
import {NavLink, useNavigate} from "react-router-dom";

import AppBar from "@mui/material/AppBar/AppBar"
import Avatar from "@mui/material/Avatar/Avatar"
import Box from "@mui/material/Box/Box"
import IconButton from "@mui/material/IconButton/IconButton"
import Toolbar from "@mui/material/Toolbar/Toolbar"
import Typography from "@mui/material/Typography/Typography";
import LogoutIcon from '@mui/icons-material/Logout';

import {useAppDispatch, useAppSelector} from "../../bll/store";
import {ProfileType} from "../../bll/profile-reducer";
import UserPhoto from "../../common/img/photo_2022-02-06_16-28-54.png";
import {logoutTC} from "../../bll/login-reducer";
import {PATH} from "../../utils/paths";
import s from './Header.module.css'
import CardsImg from '../../common/img/cards.png'
import UserImg from '../../common/img/user.png'


export const Header = () => {


    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const user = useAppSelector<ProfileType>(state => state.profile)
    const {avatar, name} = user

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <AppBar position="fixed" sx={{backgroundColor: 'gray', width: '100%'}}>
            <Toolbar sx={{padding: '0 2%', display: 'flex', justifyContent: 'space-between'}} disableGutters>
                <Typography
                    onClick={() => navigate(PATH.MAIN)}
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{mr: 2, display: {md: 'flex', cursor: "pointer"}}}
                >
                    Cards
                </Typography>
                <div className={s.navContainer}>
                    <NavLink to={PATH.MAIN} className={s.navLink}
                             style={({isActive}) => ({
                                 borderBottom: isActive ? ' 4px solid #f7f7f7' : '',
                                 color: isActive ? '' : '#0e0e11'
                             })}>
                        <div className={s.navLinkContext}>
                            <img src={CardsImg} className={s.cardsImg} alt={'cards image'}/>
                            <span>Packs list</span>
                        </div>
                    </NavLink>

                    <NavLink to={PATH.PROFILE} className={s.navLink}
                             style={({isActive}) => ({
                                 borderBottom: isActive ? ' 4px solid #f7f7f7' : '',
                                 color: isActive ? '' : '#0e0e11'
                             })}>
                        <div className={s.navLinkContext}>
                            <img src={UserImg} className={s.useImg} alt={'user image'}/>
                            <span>Profile</span>
                        </div>
                    </NavLink>
                </div>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    {isLoggedIn &&
                    <div>
                        <Typography variant="subtitle1" component="span" sx={{marginRight: '10px'}}>
                            {name ? name : 'user name'}
                        </Typography>

                        <IconButton sx={{p: 0}}>
                            <Avatar alt="user photo" src={avatar ? avatar : UserPhoto}/>
                        </IconButton>
                        <IconButton sx={{p: 0}}
                                    onClick={logoutHandler}>
                            <LogoutIcon sx={{color: 'white', margin: '10px', opacity: 0.9}}/>
                        </IconButton>
                    </div>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
};

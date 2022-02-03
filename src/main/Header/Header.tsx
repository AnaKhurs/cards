import React from 'react'
import {NavLink} from 'react-router-dom'
import classes from "./Header.module.css"
import {PATH} from "../Routes/RoutesApp";

export function Header() {
    return (
        <div className={classes.header}>
            <NavLink className={ ({isActive}) => isActive ? classes.active : classes.link} to={PATH.LOGIN}>LOGIN</NavLink>
            <NavLink className={ ({isActive}) => isActive ? classes.active : classes.link} to={PATH.REGISTRATION}>REGISTRATION</NavLink>
            <NavLink className={ ({isActive}) => isActive ? classes.active : classes.link} to={PATH.PASSWORD_RECOVERY}>PASSWORD RECOVERY</NavLink>
            <NavLink className={ ({isActive}) => isActive ? classes.active : classes.link} to={PATH.NEW_PASSWORD}>NEW PASSWORD</NavLink>
            <NavLink className={ ({isActive}) => isActive ? classes.active : classes.link} to={PATH.PROFILE}>PROFILE</NavLink>
            <NavLink className={ ({isActive}) => isActive ? classes.active : classes.link} to={PATH.PAGE_NOT_FOUND}>PAGE 404</NavLink>
            <NavLink className={ ({isActive}) => isActive ? classes.active : classes.link} to={PATH.DEMO}>DEMO</NavLink>
        </div>
    )
}
import React, {useEffect, useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {changeUserDataTC, ProfileType} from '../../../bll/profile-reducer';
import {initializeApp, StatusType} from '../../../bll/app-reducer';
import {EditableSpan} from '../../EditableSpan/EditableSpan';
import UserPhoto from '../../../common/img/photo_2022-02-06_16-28-54.png'
import Avatar from '@mui/material/Avatar/Avatar';
import {PATH} from '../../../utils/paths';
import LoadingStatusBackdrop from "../../LoadingBackDrop/BackDrop";


export const ProfilePage = React.memo(() => {

        const [myName, setMyName] = useState<string>('')
        const [myAvatar, setMyAvatar] = useState<string | undefined>(undefined)

        const user = useAppSelector<ProfileType>(state => state.profile)
        const status = useAppSelector<StatusType>(state => state.app.status)
        const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
        const {avatar, name, email} = user

        const dispatch = useAppDispatch()
        const navigate = useNavigate()

        useEffect(() => {
            dispatch(initializeApp())
        }, [])

        useEffect(() => {
            setMyName(name)
            if (avatar) {
                setMyAvatar(avatar)
            }
        }, [name, avatar])


        const onBlurSendUserData = async (newValue: string) => {
            await dispatch(changeUserDataTC({name: newValue, avatar: myAvatar}))
        }
        const onKeyPressSendUserData = async (newValue: string) => {
            await dispatch(changeUserDataTC({name: newValue, avatar: myAvatar}))
        }

        const changeNameHandler =(newValue: string) => {
            setMyName(newValue)
        }

        const navigateToMainHandler =() => {
            navigate(PATH.MAIN)
        }

        if (!isLoggedIn) {
            return <Navigate to={PATH.LOGIN}/>
        }

        return (<>
                {status === 'loading' ? (<div> <LoadingStatusBackdrop/></div>) : (
                    <Card sx={{maxWidth: 410, width: '100%', padding: '20px 30px', textAlign: 'center'}}>
                        <Avatar src={avatar ? avatar : UserPhoto} alt={'avatar'}
                                sx={{width: 250, height: 250, margin: '50px auto'}}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <EditableSpan
                                    onKeyPress={onKeyPressSendUserData}
                                    onBlur={onBlurSendUserData}
                                    onChange={changeNameHandler}
                                    value={myName}/>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {email ? email : 'Not email'}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{justifyContent: 'center'}}>
                            <Button onClick={navigateToMainHandler}
                                    sx={{color: 'black'}}
                                    size="small"> НУ OK</Button>
                        </CardActions>
                    </Card>
                )}
            </>
        );
    }
);


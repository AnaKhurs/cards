import Button from '@mui/material/Button/Button'
import Container from '@mui/material/Container/Container'
import Fab from '@mui/material/Fab/Fab'
import Paper from '@mui/material/Paper/Paper'
import TextField from '@mui/material/TextField/TextField'
import Typography from '@mui/material/Typography/Typography'
import {useFormik} from 'formik'
import {Navigate, NavLink} from 'react-router-dom'
import s from './ForgotPage.module.scss'
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {sendInstructions} from '../../../bll/pass-reducer';
import {PATH} from '../../../utils/paths';
import {CircularProgress, useMediaQuery} from '@mui/material';
import React from 'react';
import LoadingStatusBackdrop from '../../LoadingBackDrop/BackDrop';


type FormikValuesType = {
    email: string
}

export const ForgotPage = () => {

    const maxWidth = useMediaQuery('(min-width:370px)');

    const {status} = useAppSelector(state => state.app)
    const {success} = useAppSelector(state => state.passRecover)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: async (data: FormikValuesType) => {
            dispatch(sendInstructions(data.email))
        }
    })

    if (success) {
        return <Navigate to={PATH.CHECK_SUCCESS}/>
    }

    return (
        <>
            {status === 'loading' ? (<div><LoadingStatusBackdrop/></div>) :
                (<div className={s.mainContainer}>
                    <Paper elevation={2} className={s.container}>

                        <form onSubmit={formik.handleSubmit} className={s.form}>
                            <Typography variant={maxWidth ? 'h5' : 'h6'}>
                                Forgot your password?
                            </Typography>
                            <TextField
                                sx={{width: '100%'}}
                                id="outlined-basic"
                                label="E-mail"
                                variant={'standard'}
                                {...formik.getFieldProps('email')}
                            />

                            <Typography variant={maxWidth ? 'subtitle1' : 'subtitle2'} sx={{opacity: '50%'}}>
                                Enter your email address and we will send you further instructions
                            </Typography>
                            <Fab sx={{padding: maxWidth ? '0 40px' : '0 30px', fontSize: maxWidth ? '' : 'small'}}
                                type={'submit'}
                                variant="extended"
                                size={maxWidth ? "medium" : 'small'}
                                color={'primary'}
                                aria-label="add">
                                Send instructions</Fab>
                            <Container className={s.remember}>
                                <Typography variant={maxWidth ? 'subtitle1' : 'subtitle2'} sx={{opacity: '50%'}}>
                                    Remember your password?
                                </Typography>

                                <NavLink to={PATH.LOGIN} className={s.backLink}>
                                    <Button>Back to login</Button>
                                </NavLink>
                            </Container>
                        </form>

                    </Paper>
                </div>)
            }
        </>
    )
}
import React, {useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';

import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import TextField from '@mui/material/TextField/TextField';
import {Checkbox, FormControlLabel, FormGroup, IconButton, InputAdornment, useMediaQuery} from '@mui/material';
import Container from '@mui/material/Container/Container';
import Button from '@mui/material/Button/Button';

import {useAppSelector} from '../../../bll/store';
import {loginTC} from '../../../bll/login-reducer';

import {PATH} from '../../../utils/paths';
import Visibility from '../../../common/img/eye.svg';
import VisibilityOff from '../../../common/img/eye_off.svg';
import s from './LoginPage.module.scss'
import Fab from '@mui/material/Fab/Fab';
import {StatusType} from '../../../bll/app-reducer';
import LoadingStatusBackdrop from '../../LoadingBackDrop/BackDrop';


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const LoginPage = React.memo(() => {

        const maxWidth = useMediaQuery('(max-width:421px)');

        const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
        const status = useAppSelector<StatusType>(state => state.app.status)

        const navigate = useNavigate()
        const dispatch = useDispatch()


        type State = {
            showPassword: boolean
            showConfirmPassword: boolean
        }

        const [values, setValues] = useState<State>({
            showPassword: false,
            showConfirmPassword: false,
        });

        const handleClickShowPassword = () => {
            setValues({
                ...values,
                showPassword: !values.showPassword,
            });
        };

        const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
        };

        const navigateToForgotClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            navigate(PATH.FORGOT)
        }
        const navigateToRegisterClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            navigate(PATH.REGISTER)
        }

        const formik = useFormik({
            initialValues: {
                email: '',
                password: '',
                rememberMe: false,
            },
            validate: values => {
                const errors: FormikErrorType = {}
                if (!values.email) {
                    errors.email = 'email is required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }
                if (!values.password) {
                    errors.password = 'password is required'
                } else if (values.password.length < 7) {
                    errors.password = 'Must be 7 characters or more'
                }
                return errors;
            },
            onSubmit: values => {
                dispatch(loginTC(values))
                formik.resetForm()
            }
        })

        if (isLoggedIn) {
            return <Navigate to={PATH.MAIN}/>
        }

        return <>
            {status === 'loading' ? (<div><LoadingStatusBackdrop/></div>) : (
                <div className={s.mainContainer}>
                    <Paper elevation={2} className={s.container}>
                        <form onSubmit={formik.handleSubmit} className={s.form}>
                            <Typography variant={'h4'} className={s.typography}>
                                Sign in
                            </Typography>
                            <div className={s.descriptionForm}>
                                Use your Cards Application
                            </div>
                            <FormGroup className={s.formGroup}>
                                <TextField
                                    className={s.textField}
                                    sx={{width: '100%'}}
                                    margin={'normal'}
                                    id="outlined-basic"
                                    label="E-mail"
                                    variant="standard"
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    {...formik.getFieldProps('email')}
                                />

                                <TextField
                                    className={s.textField}
                                    sx={{width: '100%'}}
                                    margin={'normal'}
                                    id="outlined-basic"
                                    type={values.showPassword ? 'text' : 'password'}
                                    label="Password"
                                    variant="standard"
                                    error={!!(formik.touched.password && formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}>
                                                    {values.showPassword
                                                        ? <img src={Visibility}
                                                               width="16" height="16" alt="Visibility"/>
                                                        : <img src={VisibilityOff}
                                                               width="16" height="16" alt="VisibilityOff"/>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    {...formik.getFieldProps('password')}
                                />
                                <Container disableGutters sx={{
                                    display: 'flex',
                                    flexDirection: maxWidth ? 'column' : 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <FormControlLabel
                                        sx={{width: 'fit-content'}}
                                        label={'Remember me'}
                                        control={
                                            <Checkbox
                                                {...formik.getFieldProps('rememberMe')}/>}
                                    />
                                    <Typography className={s.text}
                                                variant={'subtitle1'}
                                                sx={{cursor: 'pointer'}}
                                                onClick={navigateToForgotClickHandler}>
                                        Forgot password
                                    </Typography>

                                </Container>
                            </FormGroup>
                            <Fab sx={{alignSelf: 'center', padding: '0 40px', width: '50%'}}
                                 type={'submit'}
                                 variant="extended"
                                 size="medium"
                                 color={'primary'}
                                 aria-label="add">
                                Login
                            </Fab>

                            <div className={s.signUp}>
                                <span className={s.descriptionSignUp}>Don't have an account?</span>
                                <Button sx={{paddingBottom: '2px'}} onClick={navigateToRegisterClickHandler}>Sign Up</Button>
                            </div>
                        </form>
                    </Paper>
                </div>
            )}
        </>
    }
)

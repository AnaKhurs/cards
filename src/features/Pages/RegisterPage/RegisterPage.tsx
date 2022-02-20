import React from 'react'
import {Navigate, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {RootStateType} from '../../../bll/store';
import {registrationTC} from '../../../bll/register-reducer';
import {Button, IconButton, InputAdornment, TextField} from '@mui/material';
import s from './RegisterPage.module.scss'
import Visibility from './../../../common/img/eye.svg';
import VisibilityOff from './../../../common/img/eye_off.svg';
import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography/Typography";
import {PATH} from "../../../utils/paths";
import {StatusType} from "../../../bll/app-reducer";
import Fab from '@mui/material/Fab/Fab';
import LoadingStatusBackdrop from '../../LoadingBackDrop/BackDrop';

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const RegisterPage = () => {

    const status = useSelector<RootStateType, StatusType>(state => state.app.status)
    const isRegistrationSuccess = useSelector<RootStateType, boolean>(state => state.register.isRegistrationSuccess)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    interface State {
        showPassword: boolean
        showConfirmPassword: boolean
    }

    const [values, setValues] = React.useState<State>({
        showPassword: false,
        showConfirmPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: values => {
            dispatch(registrationTC(values.email, values.password))
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password required';
            } else if (values.password.length < 7) {
                errors.password = 'Password must be 7 or more characters';
            }
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Password different';
            }
            return errors;
        },
    })

    if (isRegistrationSuccess) {
        return <Navigate to={'/'}/>
    }

    return <div className={s.mainContainer}>
        {status === 'loading' ? (<div><LoadingStatusBackdrop/></div>) : (
            <Paper elevation={2} className={s.container}>
                <form onSubmit={formik.handleSubmit} className={s.form}>
                    <Typography variant={'h4'} className={s.typographyLabel}>
                        Sign Up
                    </Typography>
                    <div className={s.descriptionForm}> create a new account</div>

                    <TextField className={s.textField}
                               id='standard-basic'
                               label='Email'
                               variant='standard'
                               sx={{width: '100%'}}
                               margin={'normal'}
                               error={!!(formik.touched.email && formik.errors.email)}
                               helperText={formik.touched.email && formik.errors.email}
                               {...formik.getFieldProps('email')}/>

                    <TextField className={s.textField}
                               id='standard-basic'
                               variant='standard'
                               label='Password'
                               sx={{width: '100%'}}
                               margin={'normal'}
                               type={values.showPassword ? 'text' : 'password'}
                               error={!!(formik.touched.password && formik.errors.password)}
                               helperText={formik.touched.password && formik.errors.password}
                               InputProps={{
                                   endAdornment: (
                                       <InputAdornment position='end'>
                                           <IconButton
                                               aria-label='toggle password visibility'
                                               onClick={handleClickShowPassword}
                                               onMouseDown={handleMouseDownPassword}>
                                               {values.showPassword
                                                   ? <img src={Visibility}
                                                          width='16' height='16' alt="Visibility"/>
                                                   : <img src={VisibilityOff}
                                                          width='16' height='16' alt="VisibilityOff"/>}
                                           </IconButton>
                                       </InputAdornment>
                                   ),
                               }}
                               {...formik.getFieldProps('password')}/>
                    <TextField className={s.textField}
                               id='standard-basic'
                               variant='standard'
                               label='Confirm password'
                               sx={{width: '100%'}}
                               margin={'normal'}
                               type={values.showConfirmPassword ? 'text' : 'password'}
                               error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                               helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                               InputProps={{
                                   endAdornment: (
                                       <InputAdornment position='end'>
                                           <IconButton
                                               aria-label='toggle password visibility'
                                               onClick={handleClickShowConfirmPassword}
                                               onMouseDown={handleMouseDownPassword}>
                                               {values.showConfirmPassword
                                                   ? <img src={Visibility}
                                                          width='16' height='16' alt="Visibility"/>
                                                   : <img src={VisibilityOff}
                                                          width='16' height='16' alt="Visibility"/>}
                                           </IconButton>
                                       </InputAdornment>
                                   ),
                               }}
                               {...formik.getFieldProps('confirmPassword')}/>
                    <Fab sx={{alignSelf: 'center', padding: '0 40px', width: '70%'}}
                         type={'submit'}
                         variant="extended"
                         size="medium"
                         color={'primary'}
                         aria-label="add">
                        Register
                    </Fab>
                    <div className={s.signIn}>
                        <span className={s.descriptionSignIn}>Already have an account?</span>
                        <Button sx={{paddingBottom: '2px'}} onClick={() => navigate(PATH.LOGIN)}>Sign in</Button>
                    </div>
                </form>
            </Paper>
        )}</div>
}

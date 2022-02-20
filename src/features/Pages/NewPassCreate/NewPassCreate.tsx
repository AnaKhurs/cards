import s from './NewPassCreate.module.scss';
import Paper from '@mui/material/Paper/Paper';
import {Navigate, useParams} from 'react-router-dom';
import Typography from '@mui/material/Typography/Typography';
import {useFormik} from 'formik';
import {CircularProgress, IconButton, InputAdornment, TextField, useMediaQuery} from '@mui/material';
import Visibility from '../../../common/img/eye.svg';
import VisibilityOff from '../../../common/img/eye_off.svg';
import React, {useState} from 'react';
import Fab from '@mui/material/Fab/Fab';
import Container from '@mui/material/Container/Container';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {sendNewPassword} from '../../../bll/pass-reducer';
import {PATH} from '../../../utils/paths';

type FormikValuesType = {
    password: string,
    confirmPassword: string,
}

type StateType = {
    showPassword: boolean
    showConfirmPassword: boolean
}

export const NewPassCreate = () => {

    const maxWidth = useMediaQuery('(min-width:357px)');

    const {token} = useParams()
    const dispatch = useAppDispatch()
    const {passChanged} = useAppSelector(state => state.passRecover)
    const {status} = useAppSelector(state => state.app)

    const [values, setValues] = useState<StateType>({
        showPassword: false,
        showConfirmPassword: false,
    });

    const handleClickShowPassword = () => setValues({...values, showPassword: !values.showPassword,});
    const handleClickShowConfirmPassword = () => setValues({...values, showConfirmPassword: !values.showConfirmPassword,});

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validate: (values: FormikValuesType) => {
            const errors: Partial<FormikValuesType> = {};
            if (!values.password) errors.password = 'Password is required'
            else if (values.password.length < 7)
                errors.password = 'Password must be more than 7 characters'
            if (values.password !== values.confirmPassword)
                errors.confirmPassword = 'Passwords are incorrect'
            return errors
        },
        onSubmit: async (values: FormikValuesType) => {
            if (token) await dispatch(sendNewPassword({password: values.password, resetPasswordToken: token}))
        }
    })

    if (passChanged) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return <div className={s.mainContainer}>

        <Paper elevation={2} className={s.container}>
            <Typography variant={'h5'} sx={{margin: '20px 0', textAlign: 'center'}}>
                Create new password
            </Typography>
            <form onSubmit={formik.handleSubmit} className={s.form}>


                <Container className={s.contentContainer}>
                    <TextField
                        className={s.textField}
                        sx={{width: '100%'}}
                        margin={'normal'}
                        id='outlined-basic'
                        type={values.showPassword ? 'text' : 'password'}
                        label='Password'
                        variant='standard'
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

                    <TextField
                        className={s.textField}
                        sx={{width: '100%'}}
                        margin={'normal'}
                        id='outlined-second'
                        type={values.showConfirmPassword ? 'text' : 'password'}
                        label='Confirm password'
                        variant='standard'
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
                                                width='16' height='16' alt="VisibilityOff"/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        {...formik.getFieldProps('confirmPassword')}/>

                    <Typography variant={'subtitle1'} sx={{opacity: '50%'}}>
                        Create new password and we will send you further instructions
                    </Typography>


                </Container>
                {status === 'loading'
                    ? <CircularProgress sx={{alignSelf: 'center'}} color="secondary"/>
                    : <Fab sx={{padding: maxWidth ? '0 40px' : '0 20px', margin: '0 20px 50px'}} type={'submit'}
                        variant="extended" size={maxWidth ? "medium" : 'small'} color={'primary'} aria-label="add">
                        Create new password
                    </Fab>}


            </form>
        </Paper>

    </div>
}
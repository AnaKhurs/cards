import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../bll/store";
import {registrationTC} from "../../../bll/register-reducer";
import {Navigate, NavLink} from "react-router-dom";
import {Button, TextField, FormControl, FormGroup, FormLabel, Grid} from "@mui/material";
import s from "./RegisterPage.module.css"

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const RegisterPage = () => {

    const error = useSelector<RootStateType, string>(state => state.register.error)
    const isRegistrationSuccess = useSelector<RootStateType, boolean>(state => state.register.isRegistrationSuccess)
    const dispatch = useDispatch()


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

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>

                <form onSubmit={formik.handleSubmit}>
                    <FormControl>

                        <FormLabel>
                            <h2>Sign Up</h2>
                        </FormLabel>

                        <div className={s.registrationError}>
                            {error &&
                            <div>{error}</div>}
                        </div>

                        <FormGroup>
                            <TextField id="standard-basic"
                                       label="Email"
                                       variant="standard"
                                       {...formik.getFieldProps("email")}/>
                            <div className={s.validateError}>
                                {formik.touched.email && formik.errors.email &&
                                <div>{formik.errors.email}</div>}
                            </div>

                            <TextField id="standard-basic"
                                       variant="standard"
                                       label="Password"
                                       type="password"
                                       {...formik.getFieldProps("password")}/>
                            <div className={s.validateError}>
                                {formik.touched.password && formik.errors.password &&
                                <div>{formik.errors.password}</div>}
                            </div>

                            <TextField id="standard-basic"
                                       variant="standard"
                                       label="Confirm password"
                                       type="password"
                                       {...formik.getFieldProps("confirmPassword")}/>
                            <div className={s.validateError}>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                                <div>{formik.errors.confirmPassword}</div>}
                            </div>
                        </FormGroup>
                        <Button type={'submit'} variant="contained">Register</Button>
                        <div className={s.navigateToLogin}>
                            Already have an account?
                            <NavLink to={'/login'}>
                                <Button variant="text">Sign in</Button>
                            </NavLink>
                        </div>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}




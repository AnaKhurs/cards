import React from 'react';
import {useDispatch} from "react-redux";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';


import {useAppSelector} from "../../bll/store";
import {setAppError} from "../../bll/app-reducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export function ErrorSnackbar() {
    const {passChanged} = useAppSelector(state => state.passRecover)
    const {error} = useAppSelector(state => state.app)
    const dispatch = useDispatch()


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppError(null))
    };

    const isOpen = error !== null

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={passChanged ? 'success' : 'error'} sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}
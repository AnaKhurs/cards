import {useState} from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function LoadingStatusBackdrop() {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" size={80}/>
            </Backdrop>
        </div>
    );
}
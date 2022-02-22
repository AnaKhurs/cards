import s from './EditPackModal.module.scss';
import c from '../../../common/styles/Common.module.scss';
import Typography from '@mui/material/Typography';
import {TextField} from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useAppSelector} from '../../../bll/store';
import {Modal} from '../../Modal/Modal';

type PropsType = {
    _id: string;
    updatePack: (name: string, _id: string) => void,
}

export const EditPackModal = ({updatePack, _id}: PropsType) => {

    const {status} = useAppSelector(state => state.app)
    const [active, setActive] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const onShowModalHandler = () => setActive(true)
    const onHideModalHandler = () => setActive(false)

    const onUpdatePackHandler = () => updatePack(value, _id)
    const onEnterUpdateHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') updatePack(value, _id)
    }

    return (
        <>
            <button className={c.button} disabled={status === 'loading'} onClick={onShowModalHandler}>Edit</button>
            <Modal active={active} setActive={setActive}>
                <div className={s.modalContent}>
                    <Typography variant={'h6'} className={s.title}>Edit your pack's name</Typography>
                    <div className={s.actions}>
                        <TextField
                            variant={'standard'}
                            label={'New title'}
                            onKeyPress={onEnterUpdateHandler}
                            value={value}
                            placeholder={'Edit title'}
                            onChange={onInputChange}
                        />
                        <div className={s.buttons}>
                            <button className={c.wideButton} onClick={onHideModalHandler}>Cancel</button>
                            <button className={c.applyWideButton} onClick={onUpdatePackHandler}>Apply</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
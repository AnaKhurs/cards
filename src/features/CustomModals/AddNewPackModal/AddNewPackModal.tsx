import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import c from '../../../common/styles/Common.module.scss';
import Typography from '@mui/material/Typography';
import s from './AddNewPackModal.module.scss';
import {TextField} from '@mui/material';
import {useAppSelector} from '../../../bll/store';
import {Modal} from '../../Modal/Modal';

type PropsType = {
    addPackHandler: (title: string) => void
}

export const AddNewPackModal = ({addPackHandler}: PropsType) => {

    const {status} = useAppSelector(state => state.app)
    const [active, setActive] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onShowModalHandler = () => setActive(true)
    const onHideModalHandler = () => setActive(false)
    const addPackCallback = () => {
        addPackHandler(title)
        setTitle('')
        onHideModalHandler()
    }
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addPackCallback()
    }

    return (
        <>
            <button
                className={c.applyWideButton}
                disabled={status === 'loading'}
                onClick={onShowModalHandler}>Add new pack
            </button>
            <Modal active={active} setActive={setActive}>
                <div className={s.children}>
                    <Typography variant={'h6'}>
                        Add new pack
                    </Typography>
                    <TextField
                        autoFocus
                        onKeyPress={onEnterPressHandler}
                        sx={{height: '30px', width: '80%'}}
                        placeholder={'Enter pack title'}
                        onChange={onTitleChangeHandler}
                        label={'Pack title'}
                        value={title}
                    />
                    <div className={s.buttons}>
                        <button disabled={status === 'loading'} onClick={onHideModalHandler} className={c.wideButton}>
                            Cancel
                        </button>
                        <button disabled={status === 'loading'} onClick={addPackCallback} className={c.applyWideButton}>
                            Add pack
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
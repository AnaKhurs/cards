import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import s from './DeleteCardModal.module.scss';
import c from '../../../common/styles/Common.module.scss';
import {useAppSelector} from '../../../bll/store';
import {Modal} from '../../Modal/Modal';

type PropsType = {
    cardName: string,
    isDeletable: boolean,
    onRemoveCardHandler: () => void,
}

export const DeleteCardModal = ({onRemoveCardHandler, cardName, isDeletable}: PropsType) => {

    const {status} = useAppSelector(state => state.app)
    const [active, setActive] = useState<boolean>(false)
    const onShowModalHandler = () => setActive(true)
    const onHideModalHandler = () => setActive(false)

    return (
        <>
            <button
                style={{marginLeft: '10px'}}
                className={c.errorButton}
                disabled={status === 'loading'}
                onClick={onShowModalHandler}>Delete
            </button>
            <Modal active={active} setActive={setActive}>
                <div className={s.content}>
                    {isDeletable
                        ? <>
                            <Typography variant={'h6'}>
                                Do you really want to remove <b>{cardName}</b> card?
                                All cards will be excluded from this course
                            </Typography>
                            <div className={s.buttons}>
                                <button className={c.wideButton} onClick={onHideModalHandler}>Cancel</button>
                                <button className={c.wideErrorButton} onClick={onRemoveCardHandler}>Remove</button>
                            </div>
                        </>
                        : <>
                            <Typography variant={'h6'} className={s.title}>That is not your card</Typography>
                            <button className={c.wideButton} onClick={onHideModalHandler}>Got it</button>
                        </>}
                </div>
            </Modal>
        </>
    )
}
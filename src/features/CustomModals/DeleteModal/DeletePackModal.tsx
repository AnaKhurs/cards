import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import s from './DeletePackModal.module.scss';
import c from '../../../common/styles/Common.module.scss';
import {useAppSelector} from '../../../bll/store';
import {Modal} from '../../Modal/Modal';

type PropsType = {
    packName: string
    onRemovePackHandler: (_id: string) => void
    _id: string
}

export const DeletePackModal = ({onRemovePackHandler, packName, _id}: PropsType) => {

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
                    <Typography variant={'h6'}>
                        Do you really want to remove <b>{packName}</b> pack?
                        All cards will be excluded from this course
                    </Typography>
                    <div className={s.buttons}>
                        <button className={c.wideButton} onClick={onHideModalHandler}>Cancel</button>
                        <button className={c.wideErrorButton} onClick={() => onRemovePackHandler(_id)}>Remove</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
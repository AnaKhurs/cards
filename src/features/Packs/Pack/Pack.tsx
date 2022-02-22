import React, {FC} from 'react';
import {CardPackType} from '../../../dal/packs-api';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {setPackId} from '../../../bll/cards-reducer';
import {PATH} from '../../../utils/paths';
import {NavLink, useNavigate} from 'react-router-dom';
import s from './Pack.module.scss';
import c from '../../../common/styles/Common.module.scss';
import {EditPackModal} from '../../CustomModals/EditPackModal/EditPackModal';
import {DeletePackModal} from '../../CustomModals/DeleteModal/DeletePackModal';
import Rating from '@mui/material/Rating';

type PropsType = {
    cardPack: CardPackType
    removePack: (_id: string) => void,
    updatePack: (name: string, _id: string) => void,
}

export const Pack: FC<PropsType> = ({cardPack, removePack, updatePack}) => {
    const {name, cardsCount, updated, user_name, _id, user_id, grade} = cardPack
    const {status} = useAppSelector(state => state.app)
    const profileId = useAppSelector(state => state.profile._id)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const navigateToCardPage = () => {
        dispatch(setPackId(_id))
        navigate(PATH.CARDS + `/${_id}`)
    }

    const onRemovePackHandler = () => removePack(_id)

    return (
        <div className={s.packContainer}>
            <NavLink to={PATH.CARDS + `/${_id}`}>
                <div style={{width: '140px', marginRight: '10px'}}>{name}</div>
            </NavLink>
            <div className={s.packContent}>
                <span>{cardsCount}</span>
                <span>{updated.split('').slice(0, 10).join('')}</span>
                <span>{user_name}</span>
                <Rating value={grade} precision={0.5} readOnly />
            </div>
            <div>
                <div className={s.buttons}>
                    {/*{profileId === user_id && <DeletePackModal packName={name} onRemovePackHandler={onRemovePackHandler}/>}*/}
                    {/*{profileId === user_id && <EditPackModal _id={_id} updatePack={updatePack}/>}*/}
                    {/*<button className={c.button} disabled={status === 'loading'} onClick={navigateToCardPage}>Learn</button>*/}
                </div>
            </div>
        </div>
    )
}
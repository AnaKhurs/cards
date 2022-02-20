import React, {FC} from 'react';
import {CardPackType} from '../../../dal/packs-api';
import {useAppDispatch} from '../../../bll/store';
import {setPackId} from '../../../bll/cards-reducer';
import {PATH} from '../../../utils/paths';
import {removePack, updatePack} from '../../../bll/packs-reducer';
import {NavLink, useNavigate} from 'react-router-dom';

type PropsType = {
    cardPack: CardPackType
}

export const Pack: FC<PropsType> = ({cardPack}) => {
    const {name, cardsCount, updated, user_name, _id} = cardPack

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const navigateToCardPage = () => {
        dispatch(setPackId(_id))
        navigate(PATH.CARDS + `/${_id}`)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', maxWidth: '670px', width: '100%'}}>
            <NavLink to={PATH.CARDS + `/${_id}`}>
                <div style={{width: '140px', marginRight: '10px'}}>{name}</div>
            </NavLink>
            <div style={{width: '40px', marginRight: '10px'}}>{cardsCount}</div>
            <div style={{width: '100px', marginRight: '10px'}}>{updated.split('').slice(0, 10).join('')}</div>
            <div style={{width: '100px', marginRight: '10px', overflow: 'hidden'}}>{user_name}</div>
            <div>
                <button onClick={()=>{dispatch(removePack(_id))}}>Delete</button>
                <button onClick={()=>{dispatch(updatePack({name:'Misha Krug',_id}))}}>Edit</button>
                <button onClick={navigateToCardPage}>Learn</button>
            </div>
        </div>
    )
}
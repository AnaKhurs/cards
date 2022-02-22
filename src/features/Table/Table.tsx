import React from 'react';
import {CardPackType, GetPacksPayloadType, sortValues} from "../../dal/packs-api";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from "@mui/material/IconButton";
import s from "../Packs/Pack/Pack.module.scss";
import {DeletePackModal} from "../CustomModals/DeleteModal/DeletePackModal";
import {EditPackModal} from "../CustomModals/EditPackModal/EditPackModal";
import c from "../../common/styles/Common.module.scss";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {removePack, updatePack} from "../../bll/packs-reducer";
import {NavLink, useNavigate} from "react-router-dom";
import {setPackId} from "../../bll/cards-reducer";
import {PATH} from "../../utils/paths";

type PropsType = {
    cardPacks: CardPackType[]
    onChangeFilterPacks: (sortPacks: string) => void
    removePackCallback: (_id: string) => void
    updatePack: (name: string, _id: string) => void
    fetchData: GetPacksPayloadType
}


export const Table = (props: PropsType) => {

    const {status} = useAppSelector(state => state.app)
    const {_id} = useAppSelector(state => state.profile)
    const profileId = useAppSelector(state => state.profile._id)
    const {
        packs: {pageCount, page, maxCardsCount, minCardsCount},
        own,
        value,
    } = useAppSelector(state => state.packs)


    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const navigateToCardPage = () => {
        dispatch(setPackId(_id))
        navigate(PATH.CARDS + `/${_id}`)
    }

    /*
        const fetchData: GetPacksPayloadType = {
            packName: value || '',
            page,
            pageCount,
            user_id: own ? _id : undefined,
            min: minCardsCount,
            max: maxCardsCount,
            sortPacks: "0created"
        }
    */

    const onRemovePackHandler = (packId: string) => props.removePackCallback(packId)


    return (
        <table>
            <thead>
            <tr>
                <th>Name
                    <IconButton size={'small'} onClick={() => props.onChangeFilterPacks(sortValues.nameFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={() => props.onChangeFilterPacks(sortValues.nameTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Cards
                    <IconButton size={'small'} onClick={() => props.onChangeFilterPacks(sortValues.cardsCountFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={() => props.onChangeFilterPacks(sortValues.cardsCountTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>

                <th>Last Updated
                    <IconButton size={'small'} onClick={() => props.onChangeFilterPacks(sortValues.updatedFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={() => props.onChangeFilterPacks(sortValues.updatedTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Created by
                    <IconButton size={'small'} onClick={() => props.onChangeFilterPacks(sortValues.createdFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={() => props.onChangeFilterPacks(sortValues.createdTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>

            {/*            {status === 'loading'
                ? <img src={loader} alt="loader"/>
                : <List items={props.cardPacks} renderItem={(cardPack: CardPackType) =>
                        <Pack updatePack={onUpdatePackHandler}
                              removePack={onRemovePackHandler}
                              key={cardPack._id}
                              cardPack={cardPack}/>}
                    />}*/}

            {props.cardPacks.map(item => (
                <tr key={item._id}>
                    <NavLink to={PATH.CARDS + `/${_id}`}>
                        <div style={{width: '140px', marginRight: '10px'}}>{item.name}</div>
                    </NavLink>
                    <td>{item.cardsCount}</td>
                    <td>{item.updated.split('').slice(0, 10).join('')}</td>
                    <td>{item.created.split('').slice(0, 10).join('')}</td>
                    <td className={s.packContainer}>
                        <div className={s.buttons}>
                            {profileId === item.user_id &&
                            <DeletePackModal _id={item._id} packName={item.name}
                                             onRemovePackHandler={onRemovePackHandler}/>}
                            {profileId === item.user_id &&
                            <EditPackModal _id={item._id} updatePack={props.updatePack}/>}
                            <button className={c.button} disabled={status === 'loading'}
                                    onClick={navigateToCardPage}>Learn
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>

        </table>
    )
}
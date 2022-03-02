import React from 'react';
import {CardPackType} from "../../dal/packs-api";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {setPackId} from "../../bll/cards-reducer";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../utils/paths";

import s from './TablePacks.module.scss'

import {ItemPack} from "./ItemPack/ItemPack";
import {ButtonSort} from "../ButtonSort/ButtonSort";

type PropsType = {
    cardPacks: CardPackType[]
    onChangeFilterValue: (sortPacks: string) => void
    removePackCallback: (_id: string) => void
    updatePack: (name: string, _id: string) => void
}

const sortPacksNames = [
    {name: 'name', columnsName: 'Name'},
    {name: 'cardsCount', columnsName: 'Cards'},
    {name: 'updated', columnsName: 'Last Updated'},
    {name: 'created', columnsName: 'Created by'},
]

export const TablePacks = React.memo(({
                                          cardPacks,
                                          onChangeFilterValue,
                                          removePackCallback,
                                          updatePack
                                      }: PropsType) => {

    const profileId = useAppSelector(state => state.profile._id)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const navigateToCardPage = (_id: string) => {
        dispatch(setPackId(_id))
        navigate(PATH.CARDS + `/${_id}`)
    }

    const onRemovePackHandler = (packId: string) => removePackCallback(packId)

    return (
        <table>
            <thead>
            <tr>
                {sortPacksNames.map(el => {
                    return <th className={s.cell} key={el.name}>{el.columnsName}
                        <ButtonSort onChangeFilterValue={onChangeFilterValue} sortTableColumn={el.name}/>
                    </th>
                })}
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {cardPacks.map(el => (
                <ItemPack key={el._id}
                          pack={el}
                          navigateToCardPage={navigateToCardPage}
                          onRemovePackHandler={onRemovePackHandler}
                          profileId={profileId} updatePack={updatePack}/>
            ))}
            </tbody>
        </table>
    )
})
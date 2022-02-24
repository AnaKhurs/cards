import React from 'react';
import {CardPackType, sortValues} from "../../dal/packs-api";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {setPackId} from "../../bll/cards-reducer";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../utils/paths";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from "@mui/material/IconButton";

import {ItemPack} from "./ItemPack/ItemPack";
import {ButtonSort} from "../ButtonSort/ButtonSort";

type PropsType = {
    cardPacks: CardPackType[]
    onChangeFilterPacks: (sortPacks: string) => void
    removePackCallback: (_id: string) => void
    updatePack: (name: string, _id: string) => void
    handler:(value: string) => void
}

export const TablePacks = React.memo(({
                                          cardPacks,
                                          onChangeFilterPacks,
                                          removePackCallback,
                                          updatePack,
                                          handler
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
                <th>Name
                    <ButtonSort onChangeFilterPacks={onChangeFilterPacks} sortValue={"name"}
                                handler={handler}/>
{/*                    <IconButton size={'small'} onClick={() => onChangeFilterPacks(sortValues.nameFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={() => onChangeFilterPacks(sortValues.nameTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>*/}
                </th>
                <th>Cards
                    <IconButton size={'small'} onClick={() => onChangeFilterPacks(sortValues.cardsCountFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={() => onChangeFilterPacks(sortValues.cardsCountTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>

                <th>Last Updated
                    <IconButton size={'small'} onClick={() => onChangeFilterPacks(sortValues.updatedFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={() => onChangeFilterPacks(sortValues.updatedTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Created by
                    <IconButton size={'small'} onClick={() => onChangeFilterPacks(sortValues.createdFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={() => onChangeFilterPacks(sortValues.createdTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Action</th>
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
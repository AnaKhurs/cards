import React, {useEffect, useState} from 'react';
import {CardPackType, sortValues} from "../../dal/packs-api";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from "@mui/material/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {setSortDirection} from '../../bll/packs-reducer';

type PropsType = {
    onChangeFilterPacks: (sortPacks: string) => void
    sortTableColumn: string
}


export const ButtonSort = React.memo(({onChangeFilterPacks, sortTableColumn}: PropsType) => {

    const sortDirection = useAppSelector(state => state.packs.sortDirection)
    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        if (sortDirection === '0') {
            dispatch(setSortDirection('1'))
            onChangeFilterPacks(`1${sortTableColumn}`)
        } else {
            dispatch(setSortDirection('0'))
            onChangeFilterPacks(`0${sortTableColumn}`)
        }
    }

    return (
        <>
            <IconButton size={'small'} onClick={onClickHandler}>
                <ArrowDropUpIcon style={sortDirection === '1' ? {transform: 'rotate(180deg)'} : {}}/>
            </IconButton>
        </>
    )
})
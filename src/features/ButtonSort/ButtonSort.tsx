import React from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import IconButton from "@mui/material/IconButton";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {setSortDirection} from '../../bll/packs-reducer';

type PropsType = {
    onChangeFilterValue: (sortPacks: string) => void
    sortTableColumn: string
}


export const ButtonSort = React.memo(({onChangeFilterValue, sortTableColumn}: PropsType) => {
    const sortDirection = useAppSelector(state => state.packs.sortDirection)
    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        if (sortDirection === '0') {
            dispatch(setSortDirection('1'))
            onChangeFilterValue(`1${sortTableColumn}`)
        } else {
            dispatch(setSortDirection('0'))
            onChangeFilterValue(`0${sortTableColumn}`)
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
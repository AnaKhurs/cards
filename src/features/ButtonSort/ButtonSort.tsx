import React from 'react';
import {CardPackType, sortValues} from "../../dal/packs-api";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from "@mui/material/IconButton";

type PropsType = {
    onChangeFilterPacks: (sortPacks: string) => void
    sortValues: string
}


export const ButtonSort = (props: PropsType) => {

    return (
        <>
            <IconButton size={'small'} onClick={() => props.onChangeFilterPacks(props.sortValues)}>
                <ArrowDropUpIcon/>
            </IconButton>
            <IconButton size={'small'} onClick={() => props.onChangeFilterPacks(sortValues.nameTrue)}>
                <ArrowDropDownIcon/>
            </IconButton>
        </>
    )
}
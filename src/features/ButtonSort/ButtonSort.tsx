import React, {useEffect, useState} from 'react';
import {CardPackType, sortValues} from "../../dal/packs-api";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from "@mui/material/IconButton";

type PropsType = {
    onChangeFilterPacks: (sortPacks: string) => void
    sortValue: string
    handler:(value: string) => void
}


export const ButtonSort = (props: PropsType) => {

    //const [sort, setSort] = useState<'1' | '0'>('0');
    const [sort, setSort] = useState<string>(`0${props.sortValue}`);
    //const [sort, setSort] = useState<boolean>(false);

    const onClickHandler = () => {

       // props.onChangeFilterPacks(sort)
        //console.log(sort)

        sort === `0${props.sortValue}`? setSort(`1${props.sortValue}`) : setSort(`0${props.sortValue}`)
       // sort === '0' ? setSort('1') : setSort('0')
        //props.handler(sort)

       // if(sort) {
       //     setSort(false)
       //     props.onChangeFilterPacks(`1${props.sortValue}`)
       // } else {
       //     setSort(true)
       //     props.onChangeFilterPacks(`0${props.sortValue}`)
       }
        //sort === '0' ? setSort('1') : setSort('0')
        // sort === '0' ? setSort(`1${props.sortValue}`) : setSort(`0${props.sortValue}`)
         //props.onChangeFilterPacks(sort)



    return (
        <>
            <IconButton size={'small'}
                        onClick={
                            onClickHandler
                        }>
                <ArrowDropUpIcon />
                {/*<ArrowDropUpIcon style={sort === '1' ? {transform: 'rotate(180deg)'} : {}}/>*/}
            </IconButton>
        </>
    )
}

/*
import {
    SortButtonPropsType,
    SortValueType,
} from 'components/SortButton/SortButton/types';

export const SortButton: FC<SortButtonPropsType> = props => {
    const { onClick, defaultValue = '0updated' } = props;

    const [sort, setSort] = useState<SortValueType>(defaultValue);
    // стоит поиграться с логикой касаемо запроса...
    const onClickSortHandler = () => {
        if (sort === '0updated') {
            setSort('1updated');
            onClick && onClick('1updated');
        } else {
            setSort('0updated');
            onClick && onClick('0updated');
        }
    };

    return (
        <button className={styles.button} type="button" onClick={onClickSortHandler}>
            <img
                src={arrowIcon}
                alt="arrow"
                style={sort === '1updated' ? { transform: 'rotate(180deg)' } : {}}
            />
        </button>
    );
};*/

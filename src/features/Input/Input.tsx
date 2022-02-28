import s from '../Pages/LoginPage/LoginPage.module.scss';
import {TextField} from '@mui/material';
import React, {ChangeEvent, memo, useCallback, useEffect, useState} from 'react';
import {setSearchValue} from '../../bll/packs-reducer';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {useDebounce} from '../../utils/debounce';

type PropsType = {
    placeholder: string,
}

export const Input = memo(({placeholder}: PropsType) => {

    const {value} = useAppSelector(state => state.packs)
    const dispatch = useAppDispatch()
    const [defaultValue, setValue] = useState<string>(value || '')
    const debouncedValue = useDebounce<string>(defaultValue)
    const onChangeCallback = useCallback((e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value), [])

    useEffect(() => {
        dispatch(setSearchValue(debouncedValue))
    }, [debouncedValue])

    return (
        <div>
            <TextField
                placeholder={placeholder}
                className={s.textField}
                value={defaultValue}
                onChange={onChangeCallback}
                sx={{width: '300px'}}
                id="outlined-basic"
                variant="standard"
            />
        </div>
    )
})
import {Navigate} from 'react-router-dom';
import {PATH} from '../../utils/paths';
import React, {ChangeEvent, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {Pack} from './Pack/Pack';
import {TextField} from '@mui/material';
import s from '../Pages/LoginPage/LoginPage.module.scss';
import {useDebounce} from '../../utils/debounce';
import loader from '../../common/img/loader.gif';
import {CustomMuiPagination} from '../Pagination/CustomMuiPagination';
import {CustomMuiSelect} from '../Select/CustomMuiSelect';
import {createPack, fetchPacks, clearPacksData} from '../../bll/packs-reducer';

export const Packs = () => {

    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const {status} = useAppSelector(state => state.app)
    const {
        cardPacks,
        isLoaded,
        cardPacksTotalCount,
        pageCount,
        page: currentPage
    } = useAppSelector(state => state.packs)
    const dispatch = useAppDispatch()

    let [value, setValue] = useDebounce<string>(() => {
        dispatch(fetchPacks({
            packName: value,
            pageCount: 10
        }))
    }, '')

    useEffect(() => {
        return () => {
            dispatch(clearPacksData())
        }
    }, [])

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const onPageChange = (page: number) => dispatch(fetchPacks({packName: value, page, pageCount}))
    const onChangePageCount = (pageCount: number) => dispatch(fetchPacks({packName: value, pageCount}))


    const mappedPacks = cardPacks.map(el => (<Pack key={el._id} cardPack={el}/>))

    const addPackHandler = () => {
        dispatch(createPack('Mihail Krug'))

    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    if (!isLoaded) return <img src={loader} alt="aaaa"/>

    return (
        <div style={{alignItems: 'center', color: 'white'}}>
            <button onClick={addPackHandler}>ADDDD</button>
            <div>
                <TextField
                    className={s.textField}
                    value={value}
                    onChange={onInputChangeHandler}
                    sx={{width: '200px'}}
                    margin={'normal'}
                    id="outlined-basic"
                    variant="standard"
                /> {mappedPacks}
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <CustomMuiPagination
                        totalItemsCount={cardPacksTotalCount}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        onSetNewPage={onPageChange}
                        disabled={status === 'loading'}
                    />
                    <CustomMuiSelect value={pageCount} onChangeOptions={onChangePageCount}/>

                </div>
            </div>
        </div>
    )
}
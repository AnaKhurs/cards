import React, {memo, useEffect} from 'react';
import {GetPacksPayloadType} from '../../dal/packs-api';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {
    clearPacksData,
    createPack,
    fetchPacks,
    removePack,
    setOwn,
    setSliderValue,
    setSortValue,
    updatePack
} from '../../bll/packs-reducer';

import {CustomMuiPagination} from '../Pagination/CustomMuiPagination';
import {CustomMuiSelect} from '../Select/CustomMuiSelect';
import {Input} from '../Input/Input';
import {TablePacks} from "../TablePacks/TablePacks";
import {DoubleRangeInput} from "../DoubleRangeInput/DoubleRangeInput";
import {NotAuthRedirect} from '../../hoc/NotAuthRedirect';
import {AddNewPackModal} from '../CustomModals/AddNewPackModal/AddNewPackModal';

import Typography from '@mui/material/Typography';
import loader from '../../common/img/loader.gif';
import s from './Packs.module.scss';

const Component = memo(() => {
    const {status} = useAppSelector(state => state.app)
    const {_id} = useAppSelector(state => state.profile)
    const {
        packs: {cardPacks, cardPacksTotalCount, pageCount, page, maxCardsCount, minCardsCount},
        isLoaded,
        own,
        value,
        sliderValue,
        sortValue
    } = useAppSelector(state => state.packs)

    const dispatch = useAppDispatch()

    const fetchData: GetPacksPayloadType = {
        packName: value || '',
        page,
        pageCount,
        user_id: own ? _id : undefined,
        min: minCardsCount,
        max: maxCardsCount,
        sortPacks: sortValue
    }

    useEffect(() => {
        dispatch(fetchPacks(fetchData))
        return () => {
            dispatch(clearPacksData())
        }
    }, [value])

    const addPackHandler = (title: string) => {
        dispatch(createPack({
            fetchData, data: {name: title}
        }))
    }

    const onPageChange = (page: number) => {
        dispatch(fetchPacks({
            ...fetchData,
            page,
            min: sliderValue[0],
            max: sliderValue[1],
            sortPacks: sortValue
        }))
    }
    const onChangePageCount = (pageCount: number) => dispatch(fetchPacks({
        ...fetchData,
        pageCount,
        min: sliderValue[0],
        max: sliderValue[1]
    }))

    const onRemovePackCallback = (packId: string) => dispatch(removePack({packId, fetchData}))

    const onUpdatePackHandler = (name: string, packId: string) => dispatch(updatePack({
        fetchData,
        data: {
            name,
            _id: packId
        },
    }))

    const onchangeSliderValue = (value: number[]) => {
        dispatch(setSliderValue(value))
        dispatch(fetchPacks({...fetchData, min: value[0], max: value[1]}))
    }

    const onChangeFilterPacks = (sortPacks: string) => {
        dispatch(setSortValue(sortPacks))
        dispatch(fetchPacks({
            ...fetchData,
            sortPacks,
            min: sliderValue[0],
            max: sliderValue[1]
        }))
    };


    const onMyPacksHandler = async () => {
        if (!own) {
            await dispatch(fetchPacks({...fetchData, user_id: _id, page: 1}));
            dispatch(setOwn(true))
        }
    }

    const onAllPacksHandler = async () => {
        if (own) {
            await dispatch(fetchPacks({...fetchData, user_id: undefined}));
            dispatch(setOwn(false))
        }
    }

    const myClassName = `${s.belong} ${own ? s.active : ''}`
    const allClassName = `${s.belong} ${own ? '' : s.active}`

    if (!isLoaded) return <img src={loader} alt="loader"/>

    return (
        <div className={s.main}>
            <div>
                <DoubleRangeInput onchangeSliderValue={onchangeSliderValue}/></div>
            <div className={s.controls}>
                <div>
                    <AddNewPackModal addPackHandler={addPackHandler}/>
                </div>
                <div className={s.belongBlock}>
                    <Typography variant={'h6'}>
                        Show cards packs
                    </Typography>
                    <div>
                        <span onClick={onMyPacksHandler} className={myClassName}>My</span>
                        <span onClick={onAllPacksHandler} className={allClassName}>All</span>
                    </div>
                </div>
            </div>
            <div>

                <Input placeholder={'Search by title'}/>
                {status === 'loading'
                    ? <img src={loader} alt="loader"/>
                    : <TablePacks cardPacks={cardPacks}
                                  onChangeFilterPacks={onChangeFilterPacks}
                                  updatePack={onUpdatePackHandler}
                                  removePackCallback={onRemovePackCallback}
                    />
                }
                <div className={s.pagination}>
                    <CustomMuiPagination
                        totalItemsCount={cardPacksTotalCount}
                        pageCount={pageCount}
                        currentPage={page}
                        onSetNewPage={onPageChange}
                        disabled={status === 'loading'}
                    />
                    <CustomMuiSelect value={pageCount} onChangeOptions={onChangePageCount}/>
                </div>
            </div>
        </div>
    )
})

export const Packs = NotAuthRedirect(Component)
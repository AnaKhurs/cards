import React, {memo, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {Pack} from './Pack/Pack';
import loader from '../../common/img/loader.gif';
import {CustomMuiPagination} from '../Pagination/CustomMuiPagination';
import {CustomMuiSelect} from '../Select/CustomMuiSelect';
import {clearPacksData, createPack, fetchPacks, removePack, setOwn, updatePack} from '../../bll/packs-reducer';
import {NotAuthRedirect} from '../../hoc/NotAuthRedirect';
import {Input} from './Input/Input';
import {CardPackType, GetPacksPayloadType} from '../../dal/packs-api';
import {List} from "../List/List";
import s from './Packs.module.scss';
import {AddNewPackModal} from '../CustomModals/AddNewPackModal/AddNewPackModal';
import {DoubleRangeInput} from "../DoubleRangeInput/DoubleRangeInput";
import Typography from '@mui/material/Typography';
import {Table} from "../Table/Table";

const Component = memo(() => {

    const {status} = useAppSelector(state => state.app)
    const {_id} = useAppSelector(state => state.profile)
    const {
        packs: {cardPacks, cardPacksTotalCount, pageCount, page, maxCardsCount, minCardsCount},
        isLoaded,
        own,
        value,
    } = useAppSelector(state => state.packs)

    const dispatch = useAppDispatch()

    const fetchData: GetPacksPayloadType = {
        packName: value || '',
        page,
        pageCount,
        user_id: own ? _id : undefined,
        min: minCardsCount,
        max: maxCardsCount,
        sortPacks: "0created"
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

    const onPageChange = (page: number) => dispatch(fetchPacks({...fetchData, page}))
    const onChangePageCount = (pageCount: number) => dispatch(fetchPacks({...fetchData, pageCount}))

    const onchangeSliderValue = (value: number[]) => {
        dispatch(fetchPacks({...fetchData, min: value[0], max: value[1]}))
    }

    const onRemovePackCallback = (packId: string) => dispatch(removePack({packId, fetchData}))

    const onUpdatePackHandler = (name: string, packId: string) => dispatch(updatePack({
        fetchData,
        data: {
            name,
            _id: packId
        },
    }))

    const onChangeFilterPacks = (sortPacks: string) => dispatch(fetchPacks({...fetchData, sortPacks}))

    const onMyPacksHandler = async () => {
        if (!own) {
            await dispatch(fetchPacks({...fetchData, user_id: _id}));
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
                    : <Table cardPacks={cardPacks}
                             onChangeFilterPacks={onChangeFilterPacks}
                             updatePack={onUpdatePackHandler}
                             removePackCallback={onRemovePackCallback}
                             fetchData={fetchData}
                    />
                }
{/*                {status === 'loading'
                    ? <img src={loader} alt="loader"/>
                    : <List items={cardPacks} renderItem={(cardPack: CardPackType) =>
                        <Pack updatePack={onUpdatePackHandler}
                              removePack={onRemovePackHandler}
                              key={cardPack._id}
                              cardPack={cardPack}/>}
                    />}*/}

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
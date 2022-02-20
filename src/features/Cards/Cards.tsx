import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {clearCardsData, fetchCards} from '../../bll/cards-reducer';
import loader from '../../common/img/loader.gif';
import {Card} from './Card/Card';
import s from './Cards.module.scss'
import {CustomMuiPagination} from '../Pagination/CustomMuiPagination';
import {CustomMuiSelect} from '../Select/CustomMuiSelect';
import {Navigate, useParams} from 'react-router-dom';
import {PATH} from '../../utils/paths';

export const Cards = () => {
    debugger
    const {cardsPack_id} = useParams()
    const {cardsData, packId, isLoaded} = useAppSelector(state => state.cards)
    const {status} = useAppSelector(state => state.app)
    const {isLoggedIn} = useAppSelector(state => state.login)

    const {cards, cardsTotalCount, pageCount, page, minGrade, maxGrade, packUserId} = cardsData

    const dispatch = useAppDispatch()

    const onSetNewPageHandler = (value: number) => packId && dispatch(fetchCards({packId, data: {page: value, pageCount}}))
    const onChangeOptionsHandler = (value: number) => packId && dispatch(fetchCards({packId, data: {page, pageCount: value}}))

    useEffect(() => {
        if (packId) {
            dispatch(fetchCards({
                packId, data: {
                    pageCount,
                    cardAnswer: '',
                }
            }))
        } else {
            cardsPack_id && dispatch(fetchCards({
                packId: cardsPack_id, data: {
                    pageCount,
                    cardAnswer: '',
                }
            }))
        }
        return () => {
            dispatch(clearCardsData())
        }
    }, [])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    if (!isLoaded) return <img src={loader} alt="aaaa"/>

    return (
        <div className={s.cardsContainer}>
            {
                cards.length > 0
                    ? (<>
                        {/*<TextField*/}
                        {/*    className={s.textField}*/}
                        {/*    value={value}*/}
                        {/*    onChange={onInputChangeHandler}*/}
                        {/*    sx={{width: '200px'}}*/}
                        {/*    margin={'normal'}*/}
                        {/*    id="outlined-basic"*/}
                        {/*    variant="standard"/>*/}
                        {cards.map(({answer, question, updated, grade, _id}) =>
                            <Card key={updated} _id={_id} answer={answer} grade={grade} question={question} updated={updated}/>)}
                        <div style={{display: 'flex', alignSelf: 'flex-start'}}>
                            <CustomMuiPagination
                                onSetNewPage={onSetNewPageHandler}
                                totalItemsCount={cardsTotalCount}
                                pageCount={pageCount}
                                currentPage={page}
                                disabled={status === 'loading'}
                            />
                            <CustomMuiSelect value={pageCount} onChangeOptions={onChangeOptionsHandler}/>
                        </div>
                    </>)
                    : (
                        <span style={{fontSize: '70px'}}>no packs</span>
                    )
            }
        </div>
    )
}
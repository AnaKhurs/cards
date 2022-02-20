import React from 'react';
import {useAppDispatch} from '../../../bll/store';
import {deleteCard} from '../../../bll/cards-reducer';

type CardPropsType = {
    question: string,
    answer: string,
    updated: string,
    grade: number,
    _id: string,
}

export const Card = ({grade, updated, answer, question, _id}: CardPropsType) => {

    const dispatch = useAppDispatch()
    const deleteCardHandler = () => dispatch(deleteCard(_id))

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '670px', width: '100%'}}>
            <div style={{width: '200px', marginRight: '10px'}}>{question}</div>
            <div style={{width: '200px', marginRight: '10px'}}>{answer}</div>
            <div style={{width: '150px', marginRight: '10px'}}>{updated}</div>
            <div style={{width: '50px', marginRight: '10px',}}>{grade}</div>
            <div>
                <button onClick={deleteCardHandler}>Delete</button>
                <button>Edit</button>
                <button>Learn</button>
            </div>
        </div>
    )
}
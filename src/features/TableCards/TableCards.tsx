import React from 'react';
import {CardType} from "../../bll/cards-reducer";
import {sortValues} from "../../dal/packs-api";

import {ItemCard} from "./ItemCard";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from "@mui/material/IconButton";

type PropsType = {
    items: CardType[]
    onSetGradeHandler: (grade: number, card_id: string) => void
    deleteCard: (_id: string) => void
    updateCard: (cardId: string, question: string, answer: string) => void
    packUserId: string
    userId: string
    onChangeFilterCards: (sortCards: string) => void
}

export const TableCards = React.memo(({
                                          items,
                                          onSetGradeHandler,
                                          deleteCard,
                                          updateCard,
                                          packUserId,
                                          userId,
                                          onChangeFilterCards
                                      }: PropsType) => {

    return (
        <table>
            <thead>
            <tr>
                <th>Question
                    <IconButton size={'small'} onClick={() => onChangeFilterCards(sortValues.questionFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={() => onChangeFilterCards(sortValues.questionTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Answer
                    <IconButton size={'small'} onClick={() => onChangeFilterCards(sortValues.answerFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={() => onChangeFilterCards(sortValues.answerTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Last Updated
                    <IconButton size={'small'} onClick={() => onChangeFilterCards(sortValues.updatedFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={() => onChangeFilterCards(sortValues.updatedTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Grade
                    <IconButton size={'small'} onClick={() => onChangeFilterCards(sortValues.gradeFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={() => onChangeFilterCards(sortValues.gradeTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {items.map(el => {
                return <ItemCard key={el._id}
                                 pack={el}
                                 deleteCard={deleteCard}
                                 userId={userId}
                                 packUserId={packUserId}
                                 onSetGradeHandler={onSetGradeHandler}
                                 updateCard={updateCard}/>
            })}
            </tbody>
        </table>
    )
})
import React from 'react';
import {CardType} from "../../bll/cards-reducer";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from "@mui/material/IconButton";

import {ItemCard} from "./ItemCard";


type PropsType = {
    items: CardType[]
    onSetGradeHandler: (grade: number, card_id: string) => void
    deleteCard: (_id: string) => void
    updateCard: (cardId: string, question: string, answer: string) => void
    packUserId: string
    userId: string
}

export const TableCards = (props: PropsType) => {

    return (
        <table>
            <thead>
            <tr>
                <th>Question
                    <IconButton size={'small'}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Answer
                    <IconButton size={'small'}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>

                <th>Last Updated
                    <IconButton size={'small'}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Grade
                    <IconButton size={'small'}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {props.items.map(el => {

                return <ItemCard el={el}
                                 deleteCard={props.deleteCard}
                                 userId={props.userId}
                                 packUserId={props.packUserId}
                                 onSetGradeHandler={props.onSetGradeHandler}
                                 updateCard={props.updateCard}/>
            })}
            </tbody>
        </table>
    )
}
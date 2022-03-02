import React from 'react';
import {CardType} from "../../bll/cards-reducer";

import {ItemCard} from "./ItemCard/ItemCard";
import s from "../TablePacks/TablePacks.module.scss";
import {ButtonSort} from "../ButtonSort/ButtonSort";

type PropsType = {
    items: CardType[]
    onSetGradeHandler: (grade: number, card_id: string) => void
    deleteCard: (_id: string) => void
    updateCard: (cardId: string, question: string, answer: string) => void
    packUserId: string
    userId: string
    onChangeFilterCards: (sortCards: string) => void
}

const sortCardsNames = [
    {name: 'question', columnsName: 'Question'},
    {name: 'answer', columnsName: 'Answer'},
    {name: 'updated', columnsName: 'Last Updated'},
    {name: 'grade', columnsName: 'Grade'},
]

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
                {sortCardsNames.map(el => {
                    return <th className={s.cell} key={el.name}>{el.columnsName}
                        <ButtonSort onChangeFilterValue={onChangeFilterCards} sortTableColumn={el.name}/>
                    </th>
                })}
                <th style={{textAlign: 'center', paddingLeft: '10px'}}>Action</th>
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
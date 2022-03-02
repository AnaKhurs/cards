import React from 'react';
import {CardType} from "../../../bll/cards-reducer";
import {DeleteCardModal} from "../../CustomModals/DeleteCardModal/DeleteCardModal";
import {EditCardModal} from "../../CustomModals/EditCardModal/EditCardModal";
import Rating from "@mui/material/Rating";
import s from './ItemCard.module.scss'

type PropsType = {
    pack: CardType
    deleteCard: (_id: string) => void
    onSetGradeHandler: (grade: number, card_id: string) => void
    packUserId: string
    userId: string
    updateCard: (cardId: string, question: string, answer: string) => void
}

export const ItemCard = React.memo(({
                                        pack,
                                        deleteCard,
                                        onSetGradeHandler,
                                        packUserId,
                                        userId,
                                        updateCard
                                    }: PropsType) => {

    const [value, setValue] = React.useState<number | null>(pack.grade);

    const deleteCardHandler = () => deleteCard(pack._id)

    return (
        <tr>
            <td className={s.questionColumn}>{pack.question}</td>
            <td className={s.answerColumn}>{pack.answer}</td>
            <td className={s.updatedColumn}>{pack.updated.split('').slice(0, 10).join('')}</td>
            <td>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={async (event, newValue) => {
                        await onSetGradeHandler(newValue!, pack._id);
                        setValue(newValue);
                    }}
                />
            </td>
            <td>
                <DeleteCardModal cardName={pack.question}
                                 isDeletable={packUserId === userId}
                                 onRemoveCardHandler={deleteCardHandler}/>
                <EditCardModal q={pack.question}
                               a={pack.answer}
                               _id={pack._id}
                               isEditable={packUserId === userId}
                               updateCard={updateCard}/>
            </td>
        </tr>
    )
})
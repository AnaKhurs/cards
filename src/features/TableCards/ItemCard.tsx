import React from 'react';
import {CardType} from "../../bll/cards-reducer";
import {DeleteCardModal} from "../CustomModals/DeleteCardModal/DeleteCardModal";
import {EditCardModal} from "../CustomModals/EditCardModal/EditCardModal";
import Rating from "@mui/material/Rating";

type PropsType = {
    el: CardType
    deleteCard: (_id: string) => void
    onSetGradeHandler: (grade: number, card_id: string) => void
    packUserId: string
    userId: string
    updateCard: (cardId: string, question: string, answer: string) => void
}

export const ItemCard = ({el, deleteCard, onSetGradeHandler, packUserId, userId, updateCard}: PropsType) => {
    const [value, setValue] = React.useState<number | null>(el.grade);
    const deleteCardHandler = () => deleteCard(el._id)

    return (
        <tr key={el._id}>
            <td>{el.question}</td>
            <td>{el.answer}</td>
            <td>{el.updated.split('').slice(0, 10).join('')}</td>
            <td>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={async (event, newValue) => {
                        await onSetGradeHandler(newValue!, el._id);
                        setValue(newValue);
                    }}
                />
            </td>
            <td>
                <DeleteCardModal cardName={el.question}
                                 isDeletable={packUserId === userId}
                                 onRemoveCardHandler={deleteCardHandler}/>
                <EditCardModal q={el.question}
                               a={el.answer}
                               _id={el._id}
                               isEditable={packUserId === userId}
                               updateCard={updateCard}/>
            </td>
        </tr>
    )
}
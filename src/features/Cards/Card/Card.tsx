import React from 'react';
import {DeleteCardModal} from '../../CustomModals/DeleteCardModal/DeleteCardModal';
import {EditCardModal} from '../../CustomModals/EditCardModal/EditCardModal';
import {CardType} from '../../../bll/cards-reducer';
import Rating from '@mui/material/Rating';

type CardPropsType = {
    deleteCard: (_id: string) => void,
    updateCard: (cardId: string, question: string, answer: string) => void,
    onSetGradeHandler: (grade: number, card_id: string) => void,
    card: CardType,
    packUserId: string,
    userId: string,
}

export const Card = ({card: {answer, question, _id, grade, updated},
                         deleteCard, updateCard, packUserId, userId, onSetGradeHandler}: CardPropsType) => {

    const deleteCardHandler = () => deleteCard(_id)

    const [value, setValue] = React.useState<number | null>(grade);

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <div style={{width: '200px', marginRight: '10px'}}>{question}</div>
            <div style={{width: '200px', marginRight: '10px'}}>{answer}</div>
            <div style={{width: '150px', marginRight: '10px'}}>{updated}</div>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={async (event, newValue) => {
                    await onSetGradeHandler(newValue!, _id);
                    setValue(newValue);
                }}
            />
            <div>
                <DeleteCardModal cardName={question} isDeletable={packUserId === userId} onRemoveCardHandler={deleteCardHandler}/>
                <EditCardModal q={question} a={answer} _id={_id} isEditable={packUserId === userId} updateCard={updateCard}/>
            </div>
        </div>
    )
}
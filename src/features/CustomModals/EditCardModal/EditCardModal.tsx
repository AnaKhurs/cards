import {useAppSelector} from '../../../bll/store';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import c from '../../../common/styles/Common.module.scss';
import {Modal} from '../../Modal/Modal';
import s from './EditCardModal.module.scss';
import Typography from '@mui/material/Typography';
import {TextField} from '@mui/material';

type PropsType = {
    q: string;
    a: string;
    _id: string;
    isEditable: boolean;
    updateCard: (cardId: string, question: string, answer: string) => void,
}

export const EditCardModal = ({isEditable, updateCard, _id, q, a}: PropsType) => {

    const {status} = useAppSelector(state => state.app)
    const [active, setActive] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>(q)
    const [answer, setAnswer] = useState<string>(a)
    const onQuestionChange = (e: ChangeEvent<HTMLInputElement>) => setQuestion(e.currentTarget.value)
    const onAnswerChange = (e: ChangeEvent<HTMLInputElement>) => setAnswer(e.currentTarget.value)
    const onShowModalHandler = () => setActive(true)
    const onHideModalHandler = () => setActive(false)

    const onUpdatePackHandler = () => updateCard(_id, question, answer)
    const onEnterUpdateHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') updateCard(_id, question, answer)
    }

    return (
        <>
            <button className={c.button} disabled={status === 'loading'} onClick={onShowModalHandler}>Edit</button>
            <Modal active={active} setActive={setActive}>
                <div className={s.modalContent}>
                    {isEditable
                        ? <>
                            <Typography variant={'h6'} className={s.title}>Edit your pack's name</Typography>
                            <div className={s.actions}>
                                <div className={s.inputs}>
                                    <TextField
                                        variant={'standard'}
                                        label={'New question'}
                                        onKeyPress={onEnterUpdateHandler}
                                        value={question}
                                        onChange={onQuestionChange}
                                    />
                                    <TextField
                                        sx={{marginTop: '10px'}}
                                        variant={'standard'}
                                        label={'New answer'}
                                        onKeyPress={onEnterUpdateHandler}
                                        value={answer}
                                        onChange={onAnswerChange}
                                    />
                                </div>
                                <div className={s.buttons}>
                                    <button className={c.wideButton} onClick={onHideModalHandler}>Cancel</button>
                                    <button className={c.applyWideButton} onClick={onUpdatePackHandler}>Apply</button>
                                </div>
                            </div>
                        </>
                        : <>
                            <div className={s.modalContent}>
                                <Typography variant={'h6'} className={s.title}>That is not your pack</Typography>
                                <button className={c.wideButton} onClick={onHideModalHandler}>Got it</button>
                            </div>
                        </>}
                </div>
            </Modal>
        </>
    )
}
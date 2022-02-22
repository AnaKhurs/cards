import {useAppSelector} from '../../../bll/store';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import c from '../../../common/styles/Common.module.scss';
import {Modal} from '../../Modal/Modal';
import s from './AddNewCardModal.module.scss';
import Typography from '@mui/material/Typography';
import {TextField} from '@mui/material';

type PropsType = {
    addCardHandler: (question: string, answer: string) => void
}

export const AddNewCardModal = ({addCardHandler}: PropsType) => {

    const {status} = useAppSelector(state => state.app)
    const [active, setActive] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const onQuestionChange = (e: ChangeEvent<HTMLInputElement>) => setQuestion(e.currentTarget.value)
    const onAnswerChange = (e: ChangeEvent<HTMLInputElement>) => setAnswer(e.currentTarget.value)

    const onShowModalHandler = () => setActive(true)
    const onHideModalHandler = () => setActive(false)
    const addPackCallback = () => {
        onHideModalHandler()
        addCardHandler(question, answer)
        setQuestion('')
        setAnswer('')
    }
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addPackCallback()
    }

    return (
        <>
            <button
                style={{alignSelf: 'flex-start'}}
                className={c.applyWideButton}
                disabled={status === 'loading'}
                onClick={onShowModalHandler}>Add new card
            </button>
            <Modal active={active} setActive={setActive}>
                <div className={s.children}>
                    <Typography variant={'h6'}>
                        Add new card
                    </Typography>
                    <div className={s.inputs}>
                        <TextField
                            variant={'standard'}
                            label={'New question'}
                            onKeyPress={onEnterPressHandler}
                            value={question}
                            onChange={onQuestionChange}
                        />
                        <TextField
                            sx={{marginTop: '10px'}}
                            variant={'standard'}
                            label={'New answer'}
                            onKeyPress={onEnterPressHandler}
                            value={answer}
                            onChange={onAnswerChange}
                        />
                    </div>
                    <div className={s.buttons}>
                        <button disabled={status === 'loading'} onClick={onHideModalHandler} className={c.wideButton}>
                            Cancel
                        </button>
                        <button disabled={status === 'loading'} onClick={addPackCallback} className={c.applyWideButton}>
                            Add card
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
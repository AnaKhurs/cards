import React, {useState} from 'react'
import s from "./DemoUI.module.css";
import SuperInputText from "./SuperInputText/SuperInputText";
import SuperButton from "./SuperButton/SuperButton";
import SuperCheckbox from "./SuperCheckbox/SuperCheckbox";

export function DemoUI() {

    const [checked, setChecked] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const error = text ? '' : 'error'
    const showAlert = () => error ? alert('введите текст...') : alert(text)

    return (
        <div>
            <hr/>
            <div className={s.column}>
                <SuperInputText value={text} onChangeText={setText} onEnter={showAlert} error={error}/>
                <SuperInputText className={s.blue}/>
                <SuperButton onClick={showAlert}>default</SuperButton>
                <SuperButton red onClick={showAlert}>delete</SuperButton>
                <SuperButton disabled>disabled</SuperButton>
                <SuperCheckbox checked={checked} onChangeChecked={setChecked}>some text</SuperCheckbox>
            </div>
        </div>
    )
}
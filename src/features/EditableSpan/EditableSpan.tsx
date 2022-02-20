import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton/IconButton';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    onBlur: (newValue: string) => void
    onKeyPress: (newValue: string) => void
}

export const EditableSpan = React.memo( ({value,onChange,onKeyPress,onBlur}:EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(value);
    }

    const activateViewMode = useCallback(() => {
        setEditMode(false);
        onChange(title);
        onBlur(title)
    },[title])

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            setEditMode(false);
            onKeyPress(title);
            setTitle('')
        }
    },[title])

    return editMode
        ? <TextField value={title}
                     onChange={changeTitle}
                     onKeyPress={onKeyPressHandler}
                     autoFocus onBlur={activateViewMode}
                     variant='standard'
                     sx={{
                         input: {
                             height: '30px',
                             padding: '5px 10px'
                         }
                     }}
        />
        : <span onDoubleClick={activateEditMode}>{value}
            <IconButton onClick={activateEditMode}>
                <EditIcon/>
            </IconButton>
    </span>

});
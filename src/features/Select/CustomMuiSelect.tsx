import React, {FC} from "react";

import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";



type PropsType = {
    value: number
    onChangeOptions: (value: number) => void
    disabled: boolean
}
const options = [4, 8, 10, 12, 20]

export const CustomMuiSelect: FC<PropsType> = React.memo(({value = 8, onChangeOptions, disabled}) => {


        const handleChange = (e: SelectChangeEvent) => {
            onChangeOptions(Number(e.target.value))
        }

        return (
            <div>
                <FormControl disabled={disabled}
                    variant="standard" sx={{minWidth: 40, mt: 2}} size={'small'}>
                    <Select
                        value={value as unknown as string}
                        onChange={handleChange}
                    >
                        {options.map((option, i) => {
                            return <MenuItem key={options[i] + ' ' + i} value={option}>{option}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
        )
    }
)
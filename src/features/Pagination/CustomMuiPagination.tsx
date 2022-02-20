import React, {FC} from "react";

import {Pagination} from '@mui/material'


type PropsType = {
    onSetNewPage: (page: number) => void
    totalItemsCount: number
    pageCount: number
    currentPage: number
    disabled: boolean
}

export const CustomMuiPagination: FC<PropsType> = React.memo(({
                                                                  onSetNewPage,
                                                                  pageCount,
                                                                  currentPage,
                                                                  totalItemsCount,
                                                                  disabled
                                                              }) => {


        const totalAmountOfPages = Math.ceil(totalItemsCount / pageCount)

        return (
            <>
                <Pagination
                    count={totalAmountOfPages}
                    page={currentPage}
                    onChange={(_, num) => onSetNewPage(num)}
                    disabled={disabled}
                    sx={{marginY: '15px'}}
                    variant={'outlined'}
                    boundaryCount={2}
                />

            </>
        )
    }
)
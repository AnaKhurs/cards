import {useAppSelector} from "../../bll/store";
import {ChangeEvent, FC, KeyboardEvent, useEffect, useState} from "react";
import s from './Pagination.module.css'


type PropsType = {
    portionSize: number
    onSetNewPage: (page: number) => void
}

export const Pagination: FC<PropsType> = ({portionSize, onSetNewPage}) => {

    const {packs: {cardPacksTotalCount, pageCount, page: currentPage}} = useAppSelector(state => state.packs)

    let [portionNumber, setPortionNumber] = useState(1)



    const totalAmountOfPages = Math.ceil(cardPacksTotalCount / pageCount)

    const pages: number [] = []
    for (let i = 1; i <= totalAmountOfPages; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(totalAmountOfPages / portionSize)
    const currentPortion = Math.ceil(currentPage / portionSize)

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    const onPageChanged = (page: number) => {
        onSetNewPage(page)
    }

    useEffect(() => {
        setPortionNumber(currentPortion)
    }, [currentPortion])

    return (
        <div>
            <div>
                {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                    onSetNewPage((currentPortion - 1) * portionSize)

                }}>prev</button>}
                {pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                    .map(page => {
                        return <span className={currentPage === page ? s.active : s.neactive}
                                     key={page}
                                     onClick={() => onPageChanged(page)}
                        >{page} </span>
                    })}
                {currentPage !== pages[pages.length - 1]
                    ?
                    <span className={currentPage === pages[pages.length - 1] ? s.active : s.neactive}
                          onClick={() => {
                              onSetNewPage(pages[pages.length - 1])
                          }}>...{pages[pages.length - 1]}</span>
                    : ''
                }
                {portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                    onSetNewPage(portionSize + currentPage)
                }}>next</button>}
            </div>
        </div>
    )
}
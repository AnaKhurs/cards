import React from "react";


type ListPropsType<T> = {
    items: T[]
    renderItem: (item:T) => React.ReactNode
}

export function List <T>(props:ListPropsType<T>) {
    const {items,renderItem} = props

    return (
        <div>
            {items.map(renderItem)}
        </div>
    )
}
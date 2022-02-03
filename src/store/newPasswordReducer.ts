const initialState = {}

type InitialStateType = typeof initialState

export const newPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "newPasswordReducer/demo":
            return {...state}
        default:
            return state
    }
}

export const demoAC = () => ({type: "newPasswordReducer/demo"} as const)

export type demoAType = ReturnType<typeof demoAC>

type ActionsType = demoAType
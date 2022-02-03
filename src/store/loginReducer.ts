const initialState = {}

type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "loginReducer/demo":
            return {...state}
        default:
            return state
    }
}

export const demoAC = () => ({type: "loginReducer/demo"} as const)

export type demoAType = ReturnType<typeof demoAC>

type ActionsType = demoAType
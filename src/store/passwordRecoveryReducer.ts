const initialState = {}

type InitialStateType = typeof initialState

export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "passwordRecoveryReducer/demo":
            return {...state}
        default:
            return state
    }
}

export const demoAC = () => ({type: "passwordRecoveryReducer/demo"} as const)

export type demoAType = ReturnType<typeof demoAC>

type ActionsType = demoAType
const initialState = {}

type InitialStateType = typeof initialState

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "registrationReducer/demo":
            return {...state}
        default:
            return state
    }
}

export const demoAC = () => ({type: "registrationReducer/demo"} as const)

export type demoAType = ReturnType<typeof demoAC>

type ActionsType = demoAType
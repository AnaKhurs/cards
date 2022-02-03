const initialState = {}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "profileReducer/demo":
            return {...state}
        default:
            return state
    }
}

export const demoAC = () => ({type: "profileReducer/demo"} as const)

export type demoAType = ReturnType<typeof demoAC>

type ActionsType = demoAType
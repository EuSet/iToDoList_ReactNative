export type ScreenActionsType = ReturnType<typeof changeScreenAC>

export const ScreenReducer = (state: string | null, action: ScreenActionsType) => {
    switch (action.type) {
        case "CHANGE_SCREEN":
            return action.payload
        default:
            return state
    }

}
export const changeScreenAC = (id: string | null) => {
    return {type: 'CHANGE_SCREEN', payload: id} as const
}

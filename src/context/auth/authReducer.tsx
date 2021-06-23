export type AuthActionsType = ReturnType<typeof signInAC> |
    ReturnType<typeof signOutAC> | ReturnType<typeof showErrorAC>
export type InitAuthStateType = {
    auth:boolean
    error:string | null
}
export const initAuthState:InitAuthStateType = {
    auth:false,
    error:null
}
export const authReducer = (state: InitAuthStateType = initAuthState, action: AuthActionsType):InitAuthStateType => {
    switch (action.type) {
        case "auth/SIGN_IN":
            return {...state,auth:true}
        case "auth/SIGN_OUT":
            return {...state, auth:false}
        case "auth/SHOW_ERROR":
            return {...state, error:action.error}
        default:
            return state
    }

}
export const signInAC = () => {
    return {type: 'auth/SIGN_IN'} as const
}
export const signOutAC = () => {
    return {type: 'auth/SIGN_OUT'} as const
}
export const showErrorAC = (error:string | null) => {
    return {type: 'auth/SHOW_ERROR', error} as const
}

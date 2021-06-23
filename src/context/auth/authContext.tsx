import React from "react";
export type AuthContextType = {
    auth:boolean
    signIn:(email:string, password: string, userName:string) => void
    signOut: () => void
    signUp: (email:string, password: string, userName:string) => void
    error:string | null
    showError: (error:string | null) => void
}
export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)

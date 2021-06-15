import React from "react";
export type ScreenContextType = {
    changeScreen:(id:string | null) => void
    toDoId:string | null
}
export const ScreenContext = React.createContext<ScreenContextType>({} as ScreenContextType)

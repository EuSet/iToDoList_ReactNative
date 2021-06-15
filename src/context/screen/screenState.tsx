import React, {useReducer} from "react";
import {changeScreenAC, ScreenReducer} from "./screenReducer";
import {ScreenContext} from "./screenContext";

export const ScreenState = (props:any) => {
    const [toDoId, dispatch] = useReducer(ScreenReducer, null)
    const changeScreen = (id:string | null) => dispatch(changeScreenAC(id))
    return <ScreenContext.Provider value={{toDoId, changeScreen}}>
        {props.children}
    </ScreenContext.Provider>
}



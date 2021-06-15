import React from "react";
import {ToDoListType} from "../../../App";

export type contextType = {
    todos:Array<ToDoListType>
    addNewToDo:(title:string) => void
    addNewToDoTitle:(id:string, title:string) => void
    removeToDo:(todo: ToDoListType) => void

}
export const ToDoContext = React.createContext<contextType>({} as contextType)


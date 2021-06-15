import {ToDoListType} from "../../../App";

export type ToDoActionsType = ReturnType<typeof addNewToDoTitleAC> |
    ReturnType<typeof addNewToDoAC> | ReturnType<typeof removeToDoAC>
export type initialStateType = {
    todos:Array<ToDoListType>
}

export const ToDoReducer = (state:initialStateType, action:ToDoActionsType) => {
    switch (action.type) {
        case "ADD_NEW_TO_DO":
            const newToDo: ToDoListType = {
                id: Date.now().toString(),
                title: action.title
            }
            return {...state, todos:[newToDo, ...state.todos] }
        case "ADD_NEW_TO_DO_TITLE":
            return {...state, todos: state.todos.map(t => t.id === action.id ? {...t, title: action.title } : t)}
        case "REMOVE_TO_DO":
            return {...state, todos: state.todos.filter(t => t.id !== action.todo.id) }
        default:
            return state
    }
}

export const addNewToDoAC = (title:string) => {
    return {type:'ADD_NEW_TO_DO', title} as const
}
export const addNewToDoTitleAC = (id:string, title:string) => {
    return {type:'ADD_NEW_TO_DO_TITLE', id, title} as const
}
export const removeToDoAC = (todo: ToDoListType) => {
    return {type:'REMOVE_TO_DO', todo } as const
}

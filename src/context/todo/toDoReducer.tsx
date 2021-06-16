import {ToDoListType} from "../../../App";

export type ToDoActionsType = ReturnType<typeof addNewToDoTitleAC>
    | ReturnType<typeof addNewToDoAC> | ReturnType<typeof removeToDoAC>
    | ReturnType<typeof showErrorAC> | ReturnType<typeof clearErrorAC>
    | ReturnType<typeof showLoaderAC> | ReturnType<typeof hideLoaderAC>
    | ReturnType<typeof fetchToDosAC>
export type initialStateType = {
    todos:Array<ToDoListType>
    error:string | null
    loader:boolean
}

export const ToDoReducer = (state:initialStateType, action:ToDoActionsType) => {
    switch (action.type) {
        case "FETCH_TODOS":
            return {...state, todos: action.todos}
        case "ADD_NEW_TO_DO":
            const newToDo: ToDoListType = {
                id:action.id,
                title: action.title
            }
            return {...state, todos:[newToDo, ...state.todos] }
        case "ADD_NEW_TO_DO_TITLE":
            return {...state, todos: state.todos.map(t => t.id === action.id ? {...t, title: action.title } : t)}
        case "REMOVE_TO_DO":
            return {...state, todos: state.todos.filter(t => t.id !== action.todo.id) }
        case "SHOW_ERROR":
            return {...state, error:action.error}
        case "CLEAR_ERROR":
            return {...state, error:null}
        case "SHOW_LOADER":
            return {...state, loader:true}
        case "HIDE_LOADER":
            return {...state, loader:false}
        default:
            return state
    }
}
export const fetchToDosAC = (todos:Array<ToDoListType>) => {
    return {type:'FETCH_TODOS', todos} as const
}
export const addNewToDoAC = (title:string, id:string) => {
    return {type:'ADD_NEW_TO_DO', title, id} as const
}
export const addNewToDoTitleAC = (id:string, title:string) => {
    return {type:'ADD_NEW_TO_DO_TITLE', id, title} as const
}
export const removeToDoAC = (todo: ToDoListType) => {
    return {type:'REMOVE_TO_DO', todo } as const
}
export const showErrorAC = (error:string) => {
    return {type:'SHOW_ERROR', error} as const
}
export const clearErrorAC = () => {
    return {type:'CLEAR_ERROR'} as const
}
export const showLoaderAC = () => {
    return {type:'SHOW_LOADER'} as const
}
export const hideLoaderAC = () => {
    return {type:'HIDE_LOADER'} as const
}

import {ToDoContext} from "./toDoContext";
import React, {useContext, useReducer} from "react";
import {
    addNewToDoAC,
    addNewToDoTitleAC, clearErrorAC, fetchToDosAC, hideLoaderAC,
    initialStateType,
    removeToDoAC, showErrorAC,
    showLoaderAC,
    ToDoReducer
} from "./toDoReducer";
import {ToDoListType} from "../../../App";
import {ScreenContext} from "../screen/screenContext";
import {Alert} from "react-native";

export const ToDoState = (props: any) => {
    const {changeScreen} = useContext(ScreenContext)

    function init(initialState: initialStateType) {
        return initialState
    }

    const initialState = {
        todos: [],
        error: null,
        loader: false
    }
    const [state, dispatch] = useReducer(ToDoReducer, initialState, init)
    const addNewToDo = async (title: string) => {
        const res = await fetch('https://react-native-todo-2ff6d-default-rtdb.firebaseio.com/todos.json', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title})
        })
        const data = await res.json()
        console.log(data)
        dispatch(addNewToDoAC(title, data.name))
    }
    const fetchToDos = async () => {
        try {
            showLoader()
            clearError()
            const res = await fetch('https://react-native-todo-2ff6d-default-rtdb.firebaseio.com/todos.json', {
                method: 'GET',
                headers:{'Content-Type': 'application/json'}
            })
            const data = await res.json()
            const todos = Object.keys(data).map(key => ({...data[key], id: key}))
            console.log(todos)
            dispatch(fetchToDosAC(todos))
        } catch (e) {
            showError('Something wrong...')
        } finally {
            hideLoader()
        }
    }
    const addNewToDoTitle = (id: string, title: string) => dispatch(addNewToDoTitleAC(id, title))
    const removeToDo = (todo: ToDoListType) => {
        Alert.alert(
            "Remove To Do List",
            `Do you want to remove "${todo.title}"?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: () => {
                        changeScreen(null)
                        dispatch(removeToDoAC(todo))
                    }
                }
            ],
            {cancelable: false,}
        )
    }
    const showLoader = () => dispatch(showLoaderAC())
    const hideLoader = () => dispatch(hideLoaderAC())
    const showError = (error: string) => dispatch(showErrorAC(error))
    const clearError = () => dispatch(clearErrorAC())
    return <ToDoContext.Provider value={
        {
            todos: state.todos,
            addNewToDo,
            addNewToDoTitle,
            removeToDo,
            fetchToDos,
            loader:state.loader,
            error:state.error
        }
    }>
        {props.children}
    </ToDoContext.Provider>
}

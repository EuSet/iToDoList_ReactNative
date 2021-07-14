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
import {Https} from "../../api/https";
import {fire} from "../../firebase/fireConfig";



export const ToDoState = (props: any) => {
    const {changeScreen} = useContext(ScreenContext)
    const userId = fire.auth().currentUser?.uid
    function init(initialState: initialStateType) {
        return initialState
    }

//?orderBy="title"&startAt="React"&print=pretty - sort todos example
    const initialState = {
        todos: [],
        error: null,
        loader: false
    }
    const [state, dispatch] = useReducer(ToDoReducer, initialState, init)
    const addNewToDo = async (title: string) => {
        try {
            showLoader()
            clearError()
            const data = await Https.post(`https://react-native-todo-2ff6d-default-rtdb.firebaseio.com/users/${userId}/todos.json`, title)
            dispatch(addNewToDoAC(title, data.name))
        } catch (e) {
            showError('Something wrong...')
        } finally {
            hideLoader()
        }
    }
    const fetchToDos = async () => {
        try {
            showLoader()
            clearError()
            // const data = fire.database().ref(`/todos.json/`).once('value')
            const userId = fire.auth().currentUser?.uid
            const data = await Https.get(`https://react-native-todo-2ff6d-default-rtdb.firebaseio.com/users/${userId}/todos.json`)
            console.log(userId)
            if (data) {
                const todos = Object.keys(data).map(key => ({...data[key], id: key}))
                dispatch(fetchToDosAC(todos))
            }
        } catch (e) {
            showError('Something wrong...')
        } finally {
            hideLoader()
        }
    }
    const addNewToDoTitle = async (id: string, title: string) => {
        clearError()
        try {
            await Https.patch(`https://react-native-todo-2ff6d-default-rtdb.firebaseio.com/users/${userId}/todos/${id}.json`, title)
            dispatch(addNewToDoTitleAC(id, title))
        } catch (e) {
            showError('Something wrong...')
        }
    }

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
                    onPress: async () => {
                        clearError()
                        try {
                            await Https.delete(`https://react-native-todo-2ff6d-default-rtdb.firebaseio.com/users/${userId}/todos/${todo.id}.json`)
                            changeScreen(null)
                            dispatch(removeToDoAC(todo))
                        } catch (e) {
                            showError('Something wrong...')
                        }
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
            loader: state.loader,
            error: state.error
        }
    }>
        {props.children}
    </ToDoContext.Provider>
}

import {ToDoContext} from "./toDoContext";
import React, {useContext, useReducer} from "react";
import {addNewToDoAC, addNewToDoTitleAC, initialStateType, removeToDoAC, ToDoReducer} from "./toDoReducer";
import {ToDoListType} from "../../../App";
import {ScreenContext} from "../screen/screenContext";
import {Alert} from "react-native";

export const ToDoState = (props:any) => {
    const {changeScreen} = useContext(ScreenContext)
    function init(initialState:initialStateType) {
        return initialState
    }
    const initialState = {
        todos: [{id: '1', title: 'To learn React Native'}]
    }
    const [state, dispatch] = useReducer(ToDoReducer, initialState, init)
    const addNewToDo = (title:string) => dispatch(addNewToDoAC(title))
    const addNewToDoTitle = (id:string, title:string) => dispatch(addNewToDoTitleAC(id, title))
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
    return <ToDoContext.Provider value={
        {todos: state.todos,
            addNewToDo,
            addNewToDoTitle,
            removeToDo,
        }
    }>
        {props.children}
    </ToDoContext.Provider>
}

import React, {useState} from 'react';
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';
import {MainLayout} from "./src/components/MainLayout";
import {ToDoState} from "./src/context/todo/toDoState";
import {ScreenState} from "./src/context/screen/screenState";
import {AuthState} from "./src/context/auth/authState";

export type ToDosType = Array<ToDoListType>
export type ToDoListType = {
    id: string,
    title: string,
}
export type toDoIdType = string | null

async function loadApplication() {
    await Font.loadAsync({
        'roboto-regular': require('./assets/font/Roboto-Regular.ttf'),
        'roboto-bold': require('./assets/font/Roboto-Bold.ttf')
    })
}

export default function App() {
    const [isReady, setIsReady] = useState(false)
    if (!isReady) {
        return <AppLoading
            startAsync={loadApplication}
            onError={() => {
                console.log('error')
            }}
            onFinish={() => {
                setIsReady(true)
            }}
        />
    }

    return (
        <ScreenState>
            <ToDoState>
                <AuthState>
                    <MainLayout/>
                </AuthState>
            </ToDoState>
        </ScreenState>
    );
}


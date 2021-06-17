import React, {useContext, useState} from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {THEME} from "../styles/Theme";
import {Card} from "../styles/Card";
import {EditModal} from "../components/EditModal";
import {AppButton} from "../styles/AppButton";
import {AntDesign, Feather, MaterialIcons} from '@expo/vector-icons';
import {ToDoContext} from "../context/todo/toDoContext";
import {ScreenContext} from "../context/screen/screenContext";

type PropsType = {
}

export const ToDoScreen = (props:PropsType) => {
    const {todos, addNewToDoTitle, removeToDo} = useContext(ToDoContext)
    const {toDoId, changeScreen} = useContext(ScreenContext)
    const todo = todos.find(t => t.id === toDoId)!
    const [modal, setModal] = useState(false)
    const value = todo.title
    const onChangeToDoTitle = async (title:string) => {
       await addNewToDoTitle(todo.id, title)
        setModal(false)
    }
    return <View>
        <EditModal
            visible={modal}
            onCancel={() => setModal(false)}
            value={value}
            onChangeToDoTitle={onChangeToDoTitle}
        />

        <Card style={styles.card}>
        <Text style={styles.text}>{todo.title}</Text>
            <AppButton onPress={ () => {setModal(true)} }>
                <Feather name="edit" size={20} color="#fff" />
            </AppButton>
        </Card>
        <View style={styles.Buttons} >
            <View style={styles.Button}>
                <AppButton color={THEME.GREY_COLOR} onPress={() => {changeScreen(null)}}>
                    <AntDesign name="back" size={24} color="#fff" />
                </AppButton>
            </View>
            <View style={styles.Button}>
                <AppButton color={THEME.DANGER_COLOR} onPress={() => {removeToDo(todo)}}>
                    <MaterialIcons name="highlight-remove" size={24} color="#fff" />
                </AppButton>
            </View>
        </View>

    </View>
}

const styles = StyleSheet.create({
    Buttons:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    Button:{
        width:Dimensions.get("window").width /3
    },
    card:{
        marginBottom:10
    },
    text:{
        fontSize:20
    }

})

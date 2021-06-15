import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {ToDoListType} from "../../App";
import {AppText} from "../styles/AppText";

type PropsType = {
    t: ToDoListType
    removeToDo:(todo:ToDoListType) => void
    onOpen:(id:string) => void
}

export const ToDoList:React.FC<PropsType> = ({t, removeToDo, onOpen}) => {
    return <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {onOpen(t.id)} }
        onLongPress={() => {removeToDo(t)} }
    >
    <View style={styles.toDoList}>
        <AppText style={styles.text}>{t.title}</AppText>
    </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    toDoList:{
        marginTop:10,
        borderStyle:'solid',
        borderColor:'#eee',
        borderWidth:2,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        padding:10
    }
})

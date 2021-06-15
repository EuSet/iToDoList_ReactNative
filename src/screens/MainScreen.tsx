import React, {useContext} from "react";
import {FlatList, Image, ListRenderItem, StyleSheet, View} from "react-native";
import {AddItemForm} from "../components/AddItemForm";
import {ToDoList} from "../components/ToDoList";
import {ToDoListType} from "../../App";
import {ToDoContext} from "../context/todo/toDoContext";
import {ScreenContext} from "../context/screen/screenContext";


type PropsType = {
}

export const MainScreen = (props:PropsType) => {
    const {todos, addNewToDo, removeToDo} = useContext(ToDoContext)
    const {changeScreen} = useContext(ScreenContext)
    const renderItem:ListRenderItem<ToDoListType> = ({item}) => (
        <ToDoList
            removeToDo={removeToDo}
            onOpen={changeScreen}
            t={item}
        />
    )
    let content = <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
    />
    if(!todos.length){
        content = <View style={styles.imgWrap}>
            <Image style={styles.image} source={require('./../../assets/original.png')}/>
        </View>
    }
    return <View>
        <AddItemForm addNewToDo={addNewToDo}/>
        {content}
    </View>
}

const styles = StyleSheet.create({
    imgWrap:{
        justifyContent:"center",
        alignItems:"center",
        height:300,
        padding:10,

    },
    image:{
        resizeMode:"contain",
        width:'100%',
        height:'100%'
    }

})

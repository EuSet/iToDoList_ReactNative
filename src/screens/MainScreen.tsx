import React, {useCallback, useContext, useEffect} from "react";
import {FlatList, Image, ListRenderItem, StyleSheet, View} from "react-native";
import {AddItemForm} from "../components/AddItemForm";
import {ToDoList} from "../components/ToDoList";
import {ToDoListType} from "../../App";
import {ToDoContext} from "../context/todo/toDoContext";
import {ScreenContext} from "../context/screen/screenContext";
import {AppLoader} from "../components/AppLoader";
import {AppText} from "../styles/AppText";
import {AppButton} from "../styles/AppButton";
import {THEME} from "../styles/Theme";


type PropsType = {
}

export const MainScreen = (props:PropsType) => {
    const loadToDos = useCallback(async () => await fetchToDos(), [] )
    useEffect(() => {
        loadToDos()
    }, [])
    const {todos, addNewToDo, removeToDo, fetchToDos, loader, error} = useContext(ToDoContext)
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
    if(loader){
        return <AppLoader/>
    }
    if(error){
        return <View style={styles.center}>
            <AppText style={styles.error}>{error}</AppText>
            <AppButton onPress={loadToDos}>Try again</AppButton>
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
    },
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    error:{
        color:THEME.DANGER_COLOR,
        fontSize:20,
        paddingBottom:10
    }

})

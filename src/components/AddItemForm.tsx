import React, {useState} from "react";
import {Alert, StyleSheet, TextInput, View, Keyboard} from "react-native";
import {THEME} from "../styles/Theme";
import {MaterialIcons} from '@expo/vector-icons';
import {AppButton} from "../styles/AppButton";

type PropsType = {
    addNewToDo:(title:string) => void
}

export const AddItemForm = (props:PropsType) => {
    const [value, setValue] = useState('')
    const addNewItem = () => {
        if(value.trim()){
            props.addNewToDo(value)
            setValue('')
            Keyboard.dismiss()
        } else {
           Alert.alert('Field is required')
        }

    }
    return <View style={styles.block}>
        <TextInput
            value={value}
            onChangeText={setValue} style={styles.input}
            placeholder={'Add item'}
        />
        {/*<Button title={'Add'} onPress={addNewItem}/>*/}
        <AppButton onPress={addNewItem}>
            <MaterialIcons name="add-task" size={20} color="#fff"/>
        </AppButton>
    </View>
}

const styles = StyleSheet.create({
    block:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    input:{
        borderBottomColor:THEME.MAIN_COLOR,
        borderBottomWidth:2,
        padding:10,
        width:'70%'
    }
})

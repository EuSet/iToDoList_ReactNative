import React, {useState} from "react";
import {Button, Modal, StyleSheet, TextInput, View} from "react-native";
import {THEME} from "../styles/Theme";

type PropsType = {
    visible: boolean,
    onCancel: () => void
    value:string
    onChangeToDoTitle: (title:string) => void
}
export const EditModal:React.FC<PropsType> = props => {
    const {visible, onCancel, value, onChangeToDoTitle} = props
    const [title, setTitle] = useState(value)
    const onCancelFunc = () => {
        setTitle(value)
        onCancel()
    }
    return <Modal animationType={'slide'}
                  transparent={true}
                  visible={visible}>
        <View style={styles.wrap}>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholder={'add new title'}
            />
            <View style={styles.buttons}>
                <Button title={'Cancel'} color={THEME.DANGER_COLOR} onPress={onCancelFunc}/>
                <Button title={'Save'} onPress={() => {
                    onChangeToDoTitle(title)
                }}/>
            </View>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    wrap: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:'#fff'
    },
    input: {
        padding:10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width:'80%',
        fontSize:20
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: "space-around",
        width:'100%',
        marginTop:10
    }

})

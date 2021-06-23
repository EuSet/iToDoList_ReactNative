import {Button, StyleSheet, TextInput, View, Text} from "react-native";
import React, {useContext, useState} from "react";
import {THEME} from "../styles/Theme";
import {AuthContext} from "../context/auth/authContext";

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const {signIn, signUp, error, showError} = useContext(AuthContext)

    return <View>
        {error && <Text style={styles.inputError}>{error}</Text>}
        <TextInput value={userName} onChangeText={(e) => {
            setUserName(e)
            showError(null)
        }} style={styles.input} placeholder={'user name'}/>
        <TextInput autoCompleteType={'email'} value={email} onChangeText={(e) => {
            setEmail(e)
            showError(null)
        }} style={styles.input} placeholder={'email'}/>
        <TextInput value={password} onChangeText={(e) => {
            setPassword(e)
            showError(null)
        }} style={styles.input} placeholder={'password'}/>
        <Button title={'sign in'} onPress={() => signIn(email, password, userName)}/>
        <Button title={'sign up'} onPress={() => signUp(email, password, userName)}/>
    </View>
}

const styles = StyleSheet.create({
    input:{
        borderBottomColor:THEME.MAIN_COLOR,
        borderBottomWidth:2,
        padding:10,
        width:'70%'
    },
    inputError:{
        width:'100%',
        color: THEME.DANGER_COLOR
    }
})

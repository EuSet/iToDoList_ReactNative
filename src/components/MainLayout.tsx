import {StyleSheet, View} from "react-native";
import {Navbar} from "./Navbar";
import React, {useContext} from "react";
import {THEME} from "../styles/Theme";
import {MainScreen} from "../screens/MainScreen";
import {ToDoScreen} from "../screens/ToDoScreen";
import {ScreenContext} from "../context/screen/screenContext";
import {Login} from "../screens/LoginScreen";
import {AuthContext} from "../context/auth/authContext";

export const MainLayout = () => {
    const {toDoId} = useContext(ScreenContext)
    const {auth} = useContext(AuthContext)
    return (
        <View style={styles.wrap}>
            <Navbar/>
            <View style={styles.container}>
                {auth ? toDoId ? <ToDoScreen/> : <MainScreen/> : <Login/>}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20,
        flex:1
    },
    wrap: {
        flex:1
    }
});

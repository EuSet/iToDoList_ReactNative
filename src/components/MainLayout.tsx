import {StyleSheet, View} from "react-native";
import {Navbar} from "./Navbar";
import React, {useContext} from "react";
import {THEME} from "../styles/Theme";
import {MainScreen} from "../screens/MainScreen";
import {ToDoScreen} from "../screens/ToDoScreen";
import {ScreenContext} from "../context/screen/screenContext";

export const MainLayout = () => {
    const {toDoId} = useContext(ScreenContext)
    return (
        <View>
            <Navbar/>
            <View style={styles.container}>
                {toDoId ? <ToDoScreen/> : <MainScreen/>}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20
    }
});

import React from "react";
import {StyleSheet, View} from "react-native";
import {THEME} from "../styles/Theme";
import {AppTextBold} from "../styles/AppTextBold";

export const Navbar = () => {
    return <View style={styles.navbar}>
        <AppTextBold style={styles.text}>ToDo App</AppTextBold>
    </View>
}

const styles = StyleSheet.create({
    navbar: {
        height:70,
        alignItems:'center',
        justifyContent:'flex-end',
        backgroundColor: THEME.MAIN_COLOR,
        paddingBottom:10
    },
    text:{
        color:'white',
        fontSize:20
    }
})

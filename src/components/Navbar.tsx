import React, {useContext} from "react";
import {StyleSheet, View} from "react-native";
import {THEME} from "../styles/Theme";
import {AppTextBold} from "../styles/AppTextBold";
import {AuthContext} from "../context/auth/authContext";
import {Feather} from "@expo/vector-icons";
import {AppButton} from "../styles/AppButton";

export const Navbar = () => {
    const {signOut} = useContext(AuthContext)
    return <View style={styles.navbar}>
        <AppTextBold style={styles.text}>ToDo App</AppTextBold>
        <View style={styles.logOut}>
            <AppButton onPress={signOut}>
                <Feather name="log-out" size={20} color="#fff"/>
            </AppButton>
        </View>
    </View>
}

const styles = StyleSheet.create({
    navbar: {
        height:70,
        alignItems:'center',
        justifyContent:'flex-end',
        backgroundColor: THEME.MAIN_COLOR,
        paddingBottom:10,
        position:"relative"
    },
    text:{
        color:'white',
        fontSize:20
    },
    logOut:{
        position:"absolute",
        right:0,
        color:'#fff'

    }
})

import React from "react";
import {Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View} from "react-native";
import {THEME} from "./Theme";
import {AppTextBold} from "./AppTextBold";

type PropsType = {
    onPress: () => void
    style?:{[key:string]:string | number}
    color?:any
}

export const AppButton: React.FC<PropsType> = ({children, onPress, style, color = THEME.MAIN_COLOR}) => {
    const Wrapper:typeof React.Component = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback
    return <Wrapper onPress={onPress} activeOpacity={0.7}>
        <View style={ {...styles.button, backgroundColor:color, ...style} }>
            <AppTextBold>{children}</AppTextBold>
        </View>
    </Wrapper>
}

const styles = StyleSheet.create({
    button:{
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:5,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    },
    text:{
        color:'#fff'
    }
})

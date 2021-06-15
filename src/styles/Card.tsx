import React from "react";
import {StyleSheet, View} from "react-native";

type PropsType = {
    children: React.ReactNode;
    style?:{[key:string]:string | number}

}

export const Card = (props:PropsType) => {
    return <View style={ {...styles.card, ...props.style} }>{props.children}</View>
}

const styles = StyleSheet.create({
    card:{
        padding:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        shadowColor:'#000',
        shadowOpacity:0.3,
        shadowOffset:{width:2, height:2},
        backgroundColor:'#fff',
        borderRadius:10
    }
})

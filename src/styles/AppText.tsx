import React from "react";
import {StyleSheet, Text} from "react-native";

type PropsType = {
style?:{[key:string]:string | number}
}

export const AppText:React.FC<PropsType> = ({...props}) => {
    return <Text style={{...styles.default, ...props.style}}>{props.children}</Text>
}

const styles = StyleSheet.create({
    default: {
        fontFamily:'roboto-regular'
    }
})

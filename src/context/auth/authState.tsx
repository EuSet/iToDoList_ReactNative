import React, {useReducer} from "react";
import {authReducer, initAuthState, showErrorAC, signInAC, signOutAC} from "./authReducer";
import {AuthContext} from "./authContext";
import {fire} from "../../firebase/fireConfig";


export const AuthState = (props:any) => {

    // function writeUserData(userId, name, email, imageUrl) {
    //     fire.database().ref('users/' + userId).set({
    //         username: name,
    //         email: email
    //         //some more user data
    //     });
    // }
    const [state, dispatch] = useReducer(authReducer, initAuthState)
    const showError = (error:string | null) => dispatch(showErrorAC(error))
    const signIn = async (email:string, password: string, userName:string) => {
        try {
            await fire.auth().signInWithEmailAndPassword(email, password)
            if(fire.auth().currentUser?.emailVerified){
                dispatch(signInAC())
                showError(null)
            } else {
                showError('you need to verify your mail')
            }
        } catch (e) {
            showError(e.toString())
            console.log(e.toString())
        }



    }
    // try {
    //     await fire.auth().onAuthStateChanged((user) => {
    //         if(user){
    //             console.log(user)
    //             dispatch(signInAC())
    //         } else {
    //
    //         }
    //     })
    // } catch (e) {
    //     throw new Error()
    // }
    const signOut = async () => {
        try {
           await fire.auth().signOut()
            dispatch(signOutAC())
        } catch (e) {
            throw new Error(e)
        }

    }
    const signUp = async (email:string, password: string, userName:string) => {
        try {
            const res = await fire.auth().createUserWithEmailAndPassword(email, password)
            res.user?.updateProfile({
                displayName:userName
            })
            try {
                showError('Please, verifid your email. Follow the link that we sent you and sign in')
                await fire.auth().currentUser?.sendEmailVerification()
                const userId = fire.auth().currentUser?.uid
                await fire.database().ref(`users/${userId}`).set({
                    username: userName,
                    email: email
                });
            } catch (e) {
                showError(e.toString())
                console.log(e.toString())
            }
        } catch (e) {
            showError(e.toString())
            console.log(e.toString())
        }
    }

    return <AuthContext.Provider value={{
        auth:state.auth,
        signIn,
        signOut,
        signUp,
        error: state.error,
        showError
    }}>
        {props.children}
    </AuthContext.Provider>
}

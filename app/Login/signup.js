import { KeyboardAvoidingView } from "react-native";
import { Text, Input, Button } from "@rneui/base"
import { onAuthStateChanged, getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from '../../config/firebase.js';
import { router } from "expo-router";

export default function Signup() {
    const auth = getAuth(app);


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                router.replace('/home')
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    })
    const signUp = () => {
        console.log(email, password)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
                alert("SIGNED UP")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
                // ..
            });

    }


    return (
        <KeyboardAvoidingView>
            <Input placeholder="Email" type="email" value={email} onChangeText={(e) => { setEmail(e) }} />
            <Input placeholder="Password" type="password" value={password} onChangeText={(e) => { setPassword(e) }} />

            <Button onPress={() => { signUp() }} color={"primary"}>
                Sign Up
            </Button>

        </KeyboardAvoidingView>
    )
}
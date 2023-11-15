import { KeyboardAvoidingView } from "react-native";
import { Text, Input, Button } from "@rneui/base"
import { onAuthStateChanged, getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, router } from 'expo-router';

import { app } from '../../config/firebase.js';

export default function Login() {
    const auth = getAuth(app);


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
                alert("SIGNED In")
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


            <Button style={{ marginTop: 5 }} onPress={() => { signIn() }} color={"primary"}>
                Sign in
            </Button>
            <Link href={{
                pathname: "/Login/signup",
                params: {}
            }}>
                Sign Up
            </Link>
            <Button style={{ marginTop: 5 }} onPress={() => {
                signOut(auth).then(() => {
                    alert("SIGNED OUT")
                }).catch((error) => {
                    // An error happened.
                });
            }} color={"primary"}>
                Sign out
            </Button>
        </KeyboardAvoidingView>
    )
}
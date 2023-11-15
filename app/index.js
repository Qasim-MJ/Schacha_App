import Home from "./home/index.js";
import Login from "./Login/index.js";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from "react";




export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return (
        <SafeAreaProvider>
            {isLoggedIn === true ? (<Home />) : (<Login />)}
        </SafeAreaProvider>
    )
}

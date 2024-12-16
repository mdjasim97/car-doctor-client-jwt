import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import axios from 'axios';
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }


    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail }
            setUser(currentUser)
            setLoading(false)

            if (currentUser) {
                axios.post("http://localhost:4000/jwt", loggedUser, {withCredentials:true})
                    .then(res => {
                        console.log("Token create done", res.data)
                    })
            }
            else{
                axios.post("http://localhost:4000/logout", loggedUser, {withCredentials:true})
                .then(res => {
                    console.log("logout Successful token", res.data)
                })
            }
        })

        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = { createUser, signInUser, user, loading, logout }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
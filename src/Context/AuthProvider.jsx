import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContex';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';
const googleProvider = new GoogleAuthProvider()


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // create account with email and pass 
    const createUser = (email, pass) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    // update user profile
    const updateUserProfile = (updateData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updateData);
    }

    // login with email and pass
    const login = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }

    //login with google
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    //logout 
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // set observer
    useEffect(() => {
        setLoading(true)
        const unSubcribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)

        })
        return () => unSubcribe()
    }, [])



    const userInfo = {
        user,
        loading,
        setLoading,
        createUser,
        updateUserProfile,
        login,
        logOut,
        googleSignIn,
    }

    return <AuthContext value={userInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;
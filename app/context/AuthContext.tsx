"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

const UserContext = createContext({});

export const AuthContextProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>({});

  const signUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password);
    return setDoc(doc(db, "users", email), {
      watchList: [],
    });
  };

  const signIn = (email: string, password:string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
      return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })
    return () => {
        unsubscribe()
    }
  }, [])


  return (
    <UserContext.Provider value={{signUp, signIn, logOut, user}}>
       {children}
    </UserContext.Provider>
  )
};

export const UserAuth = () => {
    return useContext(UserContext);
}

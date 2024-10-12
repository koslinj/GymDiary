import { FIREBASE_AUTH } from "../config/FirebaseConfig"
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "@/config/axiosConfig"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(undefined)

  useEffect(() => {
    const unsub = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setIsAuthenticated(true)
        setUser(user)
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
    })
  }, [])

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      const accessToken = response.user.accessToken;
      await AsyncStorage.setItem('accessToken', accessToken); // Persist token
      return { success: true }
    } catch (e) {
      return { success: false, msg: e.message }
    }
  }

  const logout = async () => {
    try {
      await signOut(FIREBASE_AUTH)
      return { success: true }
    } catch (e) {
      return { success: false, msg: e.message }
    }
  }

  const register = async (email, password, nickname, description, profile_photo, date_of_birth) => {
    try {
      const registerData = { nickname, email, password, description, profile_photo, date_of_birth };
      const res = await axios.post("/public/register", registerData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 204) {
        throw new Error("User with such email already exists!");
      }

      return res.data
    } catch (e) {
      throw new Error("Registration failed. Please try again.");
    }
  }

  const uploadProfileImage = async (uniqueFilename, file) => {
    try {
      const formDataToUpload = new FormData();
      formDataToUpload.append('profilePhoto', {
        uri: file.uri,
        type: file.mimeType,
        name: uniqueFilename,
      });

      const res = await axios.post("/public/profilePhoto", formDataToUpload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      return res.data
    } catch (e) {
      throw new Error("Profile image uploading failed. Please try again.");
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, uploadProfileImage, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const value = useContext(AuthContext)

  if (!value) {
    throw new Error('useAuth has to be inside AuthContextProvider')
  }

  return value
}
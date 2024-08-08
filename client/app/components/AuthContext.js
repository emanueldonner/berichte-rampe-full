"use client"

import React, { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		if (typeof window !== "undefined") {
			const savedUser = localStorage.getItem("user")
			return savedUser ? JSON.parse(savedUser) : null
		}
		return null
	})

	const login = (userData) => {
		if (typeof window !== "undefined") {
			localStorage.setItem("user", JSON.stringify(userData))
		}
		setUser(userData)
	}

	const logout = () => {
		if (typeof window !== "undefined") {
			localStorage.removeItem("user")
		}
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)

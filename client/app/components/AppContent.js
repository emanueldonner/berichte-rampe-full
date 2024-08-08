"use client"

import React from "react"
import { useAuth } from "./AuthContext"
import LoginPage from "./LoginPage/LoginPage"

const AppContent = ({ children }) => {
	const { user } = useAuth()

	return <>{user ? children : <LoginPage />}</>
}

export default AppContent

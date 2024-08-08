"use client"
// LoginPage.js
import React, { useState } from "react"
import { useAuth } from "../AuthContext"
import { useRouter } from "next/navigation"
import { mockLogin } from "../../utils/mockupServer"
import styles from "./LoginPage.module.css"

const LoginPage = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const { login } = useAuth()
	const router = useRouter()

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			const response = await mockLogin(email, password)
			if (response.success) {
				login(response.user)
				router.push("/berichte")
			}
		} catch (error) {
			setError("Invalid email or password")
		}
	}

	return (
		<div className={styles["login-container"]}>
			<form onSubmit={handleLogin}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Login</button>
				{error && <p className={styles["error"]}>{error}</p>}
			</form>
		</div>
	)
}

export default LoginPage

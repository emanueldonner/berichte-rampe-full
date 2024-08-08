// Header.js
"use client"

import React from "react"
import { useAuth } from "../AuthContext"
import styles from "./Header.module.css"
import Link from "next/link"

const HeaderComponent = () => {
	const { user, logout } = useAuth()

	return (
		<div className={styles["header"]}>
			<div className={styles["header-title"]}>
				<h2>Berichte Upload</h2>
			</div>
			<div className={styles["header-nav"]}>
				<div className={styles["header-nav-inner"]}>
					<ul>
						{user ? (
							<>
								<li>
									<Link href="/berichte">Alle Berichte</Link>
								</li>
								{/* <li>
									<Link href="/upload">Upload</Link>
								</li> */}
								<li>
									<button onClick={logout}>Logout</button>
								</li>
							</>
						) : user === null ? (
							<>
								<li>
									<a href="/berichte">Berichte</a>
								</li>
								<li>
									<a href="#">Settings</a>
								</li>
								<li>
									<button onClick={logout}>Logout</button>
								</li>
							</>
						) : (
							<li>
								<a href="/login">Login</a>
							</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default HeaderComponent

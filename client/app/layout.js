import "@/styles/globals.css"
import "../public/wiener-melange/assets/css/critical.min.css"
import "../public/wiener-melange/assets/css/main.min.css"
import "../public/wiener-melange/assets/css/main.scss"
import "../public/wiener-melange/assets/css/base.min.css"
import "../public/wiener-melange/assets/css/base-tokens.min.css"
import "../public/wiener-melange/assets/css/wiener-melange.min.css"

import { AuthProvider, useAuth } from "./components/AuthContext"
import AppContent from "./components/AppContent"

import Header from "./components/Header/Header"
import LoginPage from "./components/LoginPage/LoginPage"

export const metadata = {
	title: "Home",
	description: "Welcome to Berichte Upload.",
}

export default function RootLayout({ children }) {
	return (
		<AuthProvider>
			<html lang="en">
				<body>
					<Header />
					<main>
						<AppContent>{children}</AppContent>
					</main>
				</body>
			</html>
		</AuthProvider>
	)
}

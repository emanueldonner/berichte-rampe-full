export const mockLogin = (email, password) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (email === "user@example.com" && password === "password") {
				resolve({
					success: true,
					user: {
						id: 1,
						email: "user@example.com",
						name: "John Doe",
					},
				})
			} else {
				reject({ success: false, message: "Invalid credentials" })
			}
		}, 1000)
	})
}

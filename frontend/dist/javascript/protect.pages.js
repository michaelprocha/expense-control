export default async function verifyLogin() {
	const login = await fetch("http://localhost:3000/login/verify", {
		method: "GET",
		credentials: "include",
	});

	if (login.status === 401) {
		window.location.href = "http://127.0.0.1:5500/frontend/dist/login.html";
		return decoded;
	}

	const decoded = await login.json();
	return decoded;
}
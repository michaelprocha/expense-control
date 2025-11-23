const form = document.querySelector("form");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");

async function login(login) {
	try {
		const response = await fetch("http://localhost:3000/login", {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(login),
		});

		if (!response.ok) {
			const e = await response.json();
			console.log(e.message);
			return;
		}

		const data = await response.json();
		if (data.redirect) {
			window.location.href = data.redirect;
			return;
		}
	} catch (e) {
		console.log("ERRO DE REDE:", e.message);
	}
}

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const loginUser = {
		email: `${inputEmail.value}`,
		password: `${inputPassword.value}`,
	};
	await login(loginUser);
});

const form = document.querySelector("form");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const errorContainer = document.querySelector("#error-container");
const errorTitle = document.querySelector("#error-title");
const errorMessage = document.querySelector("#error-message");

async function login(login) {
	if (!errorContainer.classList.contains("hidden")) {
		errorContainer.classList.add("hidden");
	}
	try {
		const response = await fetch("http://localhost:3000/login", {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(login),
		});

		if (!response.ok) {
			const data = await response.json();
			if (data.message === "Falha inesperada") {
				errorContainer.classList.remove("hidden");
				errorContainer.classList.add("flex");
				errorTitle.textContent = data.message;
				errorMessage.textContent = "Por favor, tente novamente mais tarde.";
			}else {
				errorContainer.classList.remove("hidden");
				errorContainer.classList.add("flex");
				errorTitle.textContent = data.message;
				errorMessage.textContent = "Por favor, verifique e tente novamente.";
			}
			return;
		}

		const data = await response.json();
		if (data.redirect) {
			window.location.href = data.redirect;
			return;
		}
	} catch (e) {
		errorContainer.classList.remove("hidden");
		errorContainer.classList.add("flex");
		errorTitle.textContent = "Falha inesperada";
		errorMessage.textContent = "Tente novamente mais tarde.";
	}
}

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	await login({ email: `${inputEmail.value}`, password: `${inputPassword.value}` });
});
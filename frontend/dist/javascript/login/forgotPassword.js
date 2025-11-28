const form = document.querySelector("form");
const inputEmail = document.querySelector("#email");
const errorContainer = document.querySelector("#error-container");
const errorTitle = document.querySelector("#error-title");
const errorMessage = document.querySelector("#error-message");

async function forgotPassword(email) {
	try {
		const response = await fetch("http://localhost:3000/forgotPassword", {
			method: "POST",
			credentials: "include",
			headers: { "Content-type": "application/json; charset='utf-8'" },
			body: JSON.stringify({ email: email }),
		});

		const data = await response.json();

		if (errorContainer.classList.contains("bg-negative")) {
			errorContainer.classList.remove("bg-negative");
			errorContainer.classList.add("bg-positive");
		}

		errorContainer.classList.remove("hidden");
		errorContainer.classList.add("flex");
		errorTitle.textContent = data.message;
		errorMessage.textContent = "O email de recuperação foi enviado.";
		return;

	} catch (error) {
		if (errorContainer.classList.contains("bg-positive")) {
			errorContainer.classList.add("bg-negative");
			errorContainer.classList.remove("bg-positive");
		}

		errorContainer.classList.remove("hidden");
		errorContainer.classList.add("flex");
		errorTitle.textContent = "Falha inesperada";
		errorMessage.textContent = "Tente novamente mais tarde.";
		return;
	}
}

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	await forgotPassword(inputEmail.value);
});

const inputFirstName = document.querySelector("#first_name");
const inputLastName = document.querySelector("#last_name");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const form = document.querySelector("form");
const errorContainer = document.querySelector("#error-container");
const errorTitle = document.querySelector("#error-title");
const errorMessage = document.querySelector("#error-message");

async function register(newRegister) {
	if (!errorContainer.classList.contains("hidden")) {
		errorContainer.classList.add("hidden");
	}
	try {
		const response = await fetch("http://localhost:3000/register", {
			body: JSON.stringify(newRegister),
			credentials: "include",
			method: "POST",
		});

		if (!response.ok) {
			const data = await response.json();

			if (errorContainer.classList.contains("bg-positive")) {
				errorContainer.classList.add("bg-negative");
				errorContainer.classList.remove("bg-positive");
			}

			if (data.message === "Falha inesperada") {
				errorContainer.classList.remove("hidden");
				errorContainer.classList.add("flex");
				errorTitle.textContent = data.message;
				errorMessage.textContent = "Tente novamente mais tarde.";
			} else {
				errorContainer.classList.remove("hidden");
				errorContainer.classList.add("flex");
				errorTitle.textContent = data.message;
				errorMessage.textContent = "Verifique o email ou recupere a senha.";
			}
			return;
		}

		const data = await response.json();

		if (errorContainer.classList.contains("bg-negative")) {
			errorContainer.classList.remove("bg-negative");
			errorContainer.classList.add("bg-positive");
		}

		errorContainer.classList.remove("hidden");
		errorContainer.classList.add("flex");
		errorTitle.textContent = data.message;
		errorMessage.textContent = "Clique em voltar para fazer login";
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
	const newRegister = {
		firstName: inputFirstName.value,
		lastName: inputLastName.value,
		email: inputEmail.value,
		password: inputPassword.value,
	};
	await register(newRegister);
});

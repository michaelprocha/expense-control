const params = new URLSearchParams(window.location.search);
const token = params.get("token");
history.replaceState({}, "", "passwordReset.html");

const form = document.querySelector("form");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#password-confirm");
const errorContainer = document.querySelector("#error-container");
const errorTitle = document.querySelector("#error-title");
const errorMessage = document.querySelector("#error-message");

function errorValidate() {
	if (errorContainer.classList.contains("bg-positive")) {
		errorContainer.classList.add("bg-negative");
		errorContainer.classList.remove("bg-positive");
	}

	errorContainer.classList.remove("hidden");
	errorContainer.classList.add("flex");
	errorTitle.textContent = "Senha";
	errorMessage.textContent = "As senhas digitadas não são iguais.";
	return;
}

function validatePassword(PasswordOne, PasswordTwo) {
	if (PasswordOne === PasswordTwo) {
		return PasswordOne;
	} else {
		return false;
	}
}

async function sendNewPassword(password) {
	try {
		if (!errorContainer.classList.contains("hidden")) {
			errorContainer.classList.add("hidden");
		}
		const response = await fetch("http://localhost:3000/passwordReset", {
			method: "POST",
			credentials: "include",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({ password: password, token: token }),
		});

		if (response.status === 401) {
			if (errorContainer.classList.contains("bg-positive")) {
				errorContainer.classList.add("bg-negative");
				errorContainer.classList.remove("bg-positive");
			}

			errorContainer.classList.remove("hidden");
			errorContainer.classList.add("flex");
			errorTitle.textContent = "Pagina expirada";
			errorMessage.textContent = "Envie novamente seu email";
			return;
		}

		if (response.status === 500) {
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

		if (errorContainer.classList.contains("bg-negative")) {
			errorContainer.classList.remove("bg-negative");
			errorContainer.classList.add("bg-positive");
		}

		errorContainer.classList.remove("hidden");
		errorContainer.classList.add("flex");
		errorTitle.textContent = "Senha alterada";
		errorMessage.textContent = "Você já pode fazer login com a nova senha";
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
	}
}

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	const passwordValue = password.value;
	const passwordConfirmValue = passwordConfirm.value;
	const newPassword = validatePassword(passwordValue, passwordConfirmValue);
	if (newPassword) {
		await sendNewPassword(newPassword);
		return;
	}
	errorValidate();
});

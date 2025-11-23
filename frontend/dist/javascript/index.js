const form = document.querySelector("form");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");

async function login(login) {
	try {
		const response = await fetch("http://localhost:3000/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(login)
		});
        const objResponse = await response.json();
        console.log(objResponse);
    
	} catch (e) {
        console.log(e);
        console.log('falhou')
    }
}

form.addEventListener("submit", async (e) => {
	e.preventDefault();
    const loginUser = {
        email: `${inputEmail.value}`,
        password: `${inputPassword.value}`
    }
	await login(loginUser);
});

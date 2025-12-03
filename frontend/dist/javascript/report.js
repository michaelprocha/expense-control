const savedValueElement = document.querySelector("#saved-value-report");
const amountSpentElement = document.querySelector("#amount-spent");
const remainingAmountElement = document.querySelector("#remaining-amount");
const goalElement = document.querySelector("#goal");
const formElement = document.querySelector("form");
const inputSavedEelement = document.querySelector("#saved-value");
const inputTrgetEelement = document.querySelector("#spending-target");
const exitElement = Array.from(document.querySelectorAll('[data-function="exit"]'));

async function getIncome() {
	try {
		const response = await fetch("http://localhost:3000/getIncome", {
			method: "GET",
			credentials: "include",
		});

		if (response.status === 401 || response.status === 500) {
			window.location.href = "http://127.0.0.1:5500/frontend/dist/index.html";
			return;
		}

		const data = await response.json();
		renderIncome(data);
		return;
	} catch (error) {
		window.location.href = "http://127.0.0.1:5500/frontend/dist/index.html";
		return;
	}
}

function renderIncome(income) {
	let values = [];
	for (const value in income) {
		const cut = income[value].length - 2;
		const start = income[value].substring(0, cut);
		const end = income[value].substring(cut);
		const finalValue = `R$ ${start},${end}`;
		values.push(finalValue);
	}
	
	savedValueElement.textContent = values[1];
	amountSpentElement.textContent = values[2];
	remainingAmountElement.textContent = values[3];
	goalElement.textContent = values[0];
}

async function editIncome(newIncome) {
	try {
		const response = await fetch("http://localhost:3000/editIncome", {
			method: "PATCH",
			credentials: "include",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(newIncome),
		});

		if (response.status === 500 || response.status === 401) {
			window.location.href = "http://127.0.0.1:5500/frontend/dist/index.html";
			return;
		}

		await getIncome();
		return;
	} catch (error) {
		window.location.href = "http://127.0.0.1:5500/frontend/dist/index.html";
		return;
	}
}

async function logout() {
	try {
		const response = await fetch("http://localhost:3000/logout", {
			credentials: "include",
			method: "POST",
		});

		const data = await response.json();

		if (data.redirect) {
			window.location.href = data.redirect;
		}
	} catch (error) {}
}

await getIncome();

exitElement.forEach((element) => {
	element.addEventListener("click", async (event) => {
		event.preventDefault();
		await logout();
	});
});

formElement.addEventListener("submit", async (event) => {
	event.preventDefault();
	const newIncome = {
		savedValue: parseInt(inputSavedEelement.value),
		targetValue: parseInt(inputTrgetEelement.value),
	};
	await editIncome(newIncome);
});

inputSavedEelement.addEventListener("input", function () {
	let value = this.value.replace(/\D/g, "");
	value = (value / 100).toFixed(2) + "";
	value = value.replace(".", ",");
	this.value = value;
});

inputTrgetEelement.addEventListener("input", function () {
	let value = this.value.replace(/\D/g, "");
	value = (value / 100).toFixed(2) + "";
	value = value.replace(".", ",");
	this.value = value;
});

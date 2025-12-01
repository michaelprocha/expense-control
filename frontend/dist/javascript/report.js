const savedValueElement = document.querySelector("#saved-value-report");
const amountSpentElement = document.querySelector("#amount-spent");
const remainingAmountElement = document.querySelector("#remaining-amount");
const goalElement = document.querySelector("#goal");
const formElement = document.querySelector("form");
const inputSavedEelement = document.querySelector("#saved-value");
const inputTrgetEelement = document.querySelector("#spending-target");

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
	savedValueElement.textContent = income.total_saved;
	amountSpentElement.textContent = income.total_value_products;
	remainingAmountElement.textContent = income.remaining_amount;
	goalElement.textContent = income.spending_target;
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

await getIncome();

formElement.addEventListener("submit", async (event) => {
	event.preventDefault();
	const newIncome = {
		savedValue: parseInt(inputSavedEelement.value),
		targetValue: parseInt(inputTrgetEelement.value),
	};
	await editIncome(newIncome);
});

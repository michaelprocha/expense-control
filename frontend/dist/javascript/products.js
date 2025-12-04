import verifyLogin from "./protect.pages.js";

const productsList = document.querySelector("#products-list");
const formElement = document.querySelector("form");
const productName = document.querySelector("#product");
const productValue = document.querySelector("#value");
const productDate = document.querySelector("#date");
const menuElement = document.querySelector("#menu");
const navMenuElement = document.querySelector("#nav-menu");
const exitElement = Array.from(document.querySelectorAll('[data-function="exit"]'));

async function verifyToken() {
	try {
		const result = await verifyLogin();
		if (result.status === 401 || result.status === 500) {
			window.location.href = "http://127.0.0.1:5500/frontend/dist/login.html";
			return;
		}
		const products = await getProducts();
		renderProducts(products);
		return;
	} catch (error) {
		window.location.href = "http://127.0.0.1:5500/frontend/dist/login.html";
		return;
	}
}

async function getProducts() {
	const login = await fetch("http://localhost:3000/getProducts", {
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

function renderProducts(products) {
	let appendProduct = "";

	products.forEach((product) => {
		const date = product.product_date.substring(0, 10);
		const dateFormated = `${date.substring(8)}/${date.substring(5, 7)}/${date.substring(0, 4)}`;
		const cut = product.product_value.length - 2;
		const start = product.product_value.substring(0, cut);
		const end = product.product_value.substring(cut);
		const formatedValue = `R$ ${start},${end}`;

		appendProduct += `<li data-id="${product.product_id}" class="w-full max-w-70 gap-3 p-4 bg-primary rounded-2xl flex flex-col justify-between items-center">
		<div class="flex flex-col items-center gap-3">
		<h4 class="text-l capitalize">${product.product_name}</h4>
		<div class="w-full flex flex-col items-center justify-between gap-2">
		<p>Valor: ${formatedValue}</p>
		<p>Data: ${dateFormated}</p>
		</div>
		</div>
		<div class="flex bg-negative rounded-2xl items-center justify-center h-8 w-26 max-w-26">
		<a id="remove" class="font-bold uppercase">Excluir</a>
		</div>
		</li>`;
	});
	productsList.innerHTML = appendProduct;
}

async function deleteProduct(productId, productElement) {
	try {
		const response = await fetch("http://localhost:3000/deleteProduct", {
			method: "DELETE",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(productId),
		});

		if (response.status === 401 || response.status === 500) {
			window.location.href = "http://127.0.0.1:5500/frontend/dist/login.html";
			return;
		}

		if (response.status === 204) {
			productElement.remove();
			return;
		}
	} catch (error) {
		window.location.href = "http://127.0.0.1:5500/frontend/dist/login.html";
		return;
	}
}

async function addProduct(product) {
	try {
		const response = await fetch("http://localhost:3000/addProduct", {
			method: "POST",
			credentials: "include",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(product),
		});

		if (response.status === 401 || response.status === 500) {
			window.location.href = "http://127.0.0.1:5500/frontend/dist/login.html";
			return;
		}

		const data = await response.json();

		renderProductAdd(data.id, product);
	} catch (error) {
		window.location.href = "http://127.0.0.1:5500/frontend/dist/login.html";
		return;
	}
}

function renderProductAdd(productId, product) {
	const productLi = document.createElement("li");
	productLi.setAttribute("id", productId);
	const dateFormated = `${product.productDate.substring(8)}/${product.productDate.substring(
		5,
		7
	)}/${product.productDate.substring(0, 4)}`;

	const stringValue = `${product.productValue}`;
	const cut = stringValue.length - 2;
	const start = stringValue.substring(0, cut);
	const end = stringValue.substring(cut);
	const formatedValue = `R$ ${start},${end}`;

	productLi.classList.add(
		"w-full",
		"max-w-70",
		"p-4",
		"bg-primary",
		"rounded-2xl",
		"flex",
		"flex-col",
		"justify-between",
		"gap-3",
		"items-center"
	);
	productLi.innerHTML = `<div class="flex flex-col items-center gap-3">
		<h4 class="text-l capitalize">${product.productName}</h4>
		<div class="w-full flex flex-col items-center justify-between gap-2">
		<p>Valor: ${formatedValue}</p>
		<p>Data: ${dateFormated}</p>
		</div>
		</div>
		<div class="flex bg-negative rounded-2xl items-center justify-center h-8 w-26 max-w-26">
		<a id="remove" class="font-bold uppercase">Excluir</a>
		</div>`;
	productsList.append(productLi);
	productName.value = "";
	productValue.value = "";
	productDate.value = "";
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

await verifyToken();

exitElement.forEach((element) => {
	element.addEventListener("click", async (event) => {
		event.preventDefault();
		await logout();
	});
});

formElement.addEventListener("submit", async (event) => {
	event.preventDefault();
	const product = {
		productName: productName.value,
		productValue: parseInt(productValue.value.replace(",", "")),
		productDate: productDate.value,
	};
	await addProduct(product);
});

productsList.addEventListener("click", async (event) => {
	const element = event.target;
	if (element.id) {
		if (element.id === "remove") {
			const productElement = element.parentElement.parentElement;
			const productId = parseInt(element.parentElement.parentElement.dataset.id);
			await deleteProduct(productId, productElement);
		}
	}
});

menuElement.addEventListener("click", () => {
	if (navMenuElement.classList.contains("hidden")) {
		navMenuElement.classList.add("flex");
		navMenuElement.classList.remove("hidden");
		return;
	}
	navMenuElement.classList.remove("flex");
	navMenuElement.classList.add("hidden");
	return;
});

productValue.addEventListener("input", function () {
	let value = this.value.replace(/\D/g, "");
	value = (value / 100).toFixed(2) + "";
	value = value.replace(".", ",");
	this.value = value;
});

import verifyLogin from "./protect.pages.js";

const productsList = document.querySelector("#products-list");
const formElement = document.querySelector("form");
const productName = document.querySelector("#product");
const productValue = document.querySelector("#value");
const productDate = document.querySelector("#date");

async function verifyToken() {
	try {
		const result = await verifyLogin();
		if (result.status === 401 || result.status === 500) {
			window.location.href = "http://127.0.0.1:5500/frontend/dist/index.html";
			return;
		}
		const products = await getProducts();
		renderProducts(products);
		return;
	} catch (error) {
		window.location.href = "http://127.0.0.1:5500/frontend/dist/index.html";
		return;
	}
}

async function getProducts() {
	const login = await fetch("http://localhost:3000/getProducts", {
		method: "GET",
		credentials: "include",
	});

	if (login.status === 401) {
		window.location.href = "http://127.0.0.1:5500/frontend/dist/index.html";
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
		appendProduct += `<li data-id="${product.product_id}" class="p-4 bg-primary rounded-2xl flex flex-col justify-between">
		<div class="flex flex-col items-center gap-2">
		<h4 class="text-l">${product.product_name}</h4>
		<div class="w-full flex justify-between">
		<p>R$ ${product.product_value}</p>
		<p>${dateFormated}</p>
		</div>
		</div>
		<div class="flex">
		<a id="remove" class="uppercase">Excluir</a>
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
			window.location.href = "http://127.0.0.1:5500/frontend/dist/index.html";
			return;
		}

		if (response.status === 204) {
			productElement.remove();
			return;
		}
	} catch (error) {
		window.location.href = "http://127.0.0.1:5500/frontend/dist/index.html";
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
			window.location.href = "http://127.0.0.1:5500/frontend/dist/index.html";
			return;
		}

		const data = await response.json();

		renderProductAdd(data.id, product);
	} catch (error) {
		window.location.href = "http://127.0.0.1:5500/frontend/dist/index.html";
		return;
	}
}

function renderProductAdd(productId, product) {
	const productLi = document.createElement("li");
	productLi.setAttribute("id", productId);
	const dateFormated = `${product.productDate.substring(8)}/${product.productDate.substring(5, 7)}/${product.productDate.substring(0, 4)}`;
	productLi.classList.add("p-4", "bg-primary", "rounded-2xl", "flex", "flex-col", "justify-between");
	productLi.innerHTML = `<div class="flex flex-col items-center gap-2">
		<h4 class="text-l">${product.productName}</h4>
		<div class="w-full flex justify-between">
		<p>R$ ${product.productValue}</p>
		<p>${dateFormated}</p>
		</div>
		</div>
		<div class="flex">
		<a id="remove" class="uppercase">Excluir</a>
		</div>`;
	productsList.append(productLi);
}

await verifyToken();

formElement.addEventListener("submit", async (event) => {
	event.preventDefault();
	const product = {
		productName: productName.value,
		productValue: parseInt(productValue.value),
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

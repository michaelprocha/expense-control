import verifyLogin from "./protect.pages.js";

const productsList = document.querySelector("#products-list");

const result = await verifyLogin();
async function getProducts() {
	const login = await fetch("http://localhost:3000/login/products", {
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
		appendProduct += `<li id="product-id-${product.product_id}" class="p-4 bg-primary rounded-2xl flex flex-col justify-between">
							<div class="flex flex-col items-center gap-2">
									<h4 class="text-l">${product.product_name}</h4>
								<div class="w-full flex justify-between">
									<p>R$ ${product.product_value}</p>
									<p>${dateFormated}</p>
								</div>
							</div>
							<div class="w-full flex justify-between">
								<a id="edit">EDITAR</a>
								<a id="remove">EXCLUIR</a>
							</div>
						</li>`;
	});
	productsList.innerHTML = appendProduct;
}

const products = await getProducts();
renderProducts(products);
console.log(products);

productsList.addEventListener("click", (event) => {
	console.log(event.target);
	const element = event.target;
	if (element.id) {
		if (element.id === "edit") {
			console.log("editar");
		} else if (element.id === "remove") {
			console.log("remover");
		}
	}
});

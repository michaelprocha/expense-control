import http from "http";
import { URL } from "url";
import login from "./login/login.js";
import register from "./login/register.js";
import forgotAccess from "./login/forgotPassword.js";
import logout from "./javascript/logout.js";
import products from "./javascript/products.js";
import validToken from "./javascript/verify.js";
import getIncome from "./javascript/getIncome.js";
import editIncome from "./javascript/editIncome.js";
import addProduct from "./javascript/addProduct.js";
import passwordReset from "./javascript/password.js";
import removeProduct from "./javascript/removeProduct.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	if (req.method === "OPTIONS") {
		res.writeHead(204);
		return res.end();
	}

	const urlReq = new URL(req.url, "http://localhost:3000");

	if (req.method === "POST") {
		if (urlReq.pathname === "/login") {
			login(req, res);
			return;
		} else if (urlReq.pathname === "/forgotPassword") {
			forgotAccess(req, res);
			return;
		} else if (urlReq.pathname === "/register") {
			register(req, res);
			return;
		} else if (urlReq.pathname === "/logout") {
			logout(res);
			return;
		} else if (urlReq.pathname === "/add-product") {
			const decoded = validToken(req, res);
			if (decoded.valid === false) {
				return;
			}
			addProduct(decoded, req, res);
			return;
		}
	} else if (req.method === "PATCH" || req.method === "PUT") {
		if (urlReq.pathname === "/login/forgot") {
			const decoded = validToken(req, res);
			if (decoded.valid === false) {
				return;
			}
			passwordReset(req, res);
			return;
		} else if (urlReq.pathname === "/editIncome") {
			const decoded = validToken(req, res);
			if (decoded.valid === false) {
				return;
			}
			editIncome(decoded, req, res);
			return;
		}
	} else if (req.method === "DELTE") {
		const decoded = validToken(req, res);
		if (decoded.valid === false) {
			return;
		}
		removeProduct(decoded, req, res);
		return;
	} else {
		const decoded = validToken(req, res);
		if (decoded.valid === false) {
			return;
		}
		if (urlReq.pathname === "/login/verify") {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ valid: true, message: "access allowed" }));
			return;
		} else if (urlReq.pathname === "/login/products") {
			products(decoded, res);
			return;
		} else if (urlReq.pathname === "getIncome") {
			getIncome(decoded, res);
			return;
		}
	}
});

server.listen(PORT, () => {
	console.log(`server on port: ${PORT}`);
});

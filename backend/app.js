import http from "http";
import { URL } from "url";
import login from "./javascript/login.js";
import products from "./javascript/products.js";
import validToken from "./javascript/verify.js";
import register from "./javascript/register.js";
import forgotAccess from "./javascript/forgot.js";
import passwordReset from "./javascript/password.js";

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
		}else if(urlReq.pathname === "/login/forgot"){
			forgotAccess(req, res);
			return;
		}else if(urlReq.pathname === '/register'){
			register(req, res);
			return;
		}
	} else if (req.method === "PATCH" || req.method === "PUT") {
		passwordReset(req, res);
		return;
	} else if (req.method === "DELTE") {
	} else {
		const decoded = validToken(req, res);
		if (decoded.valid === false) {
			return;
		}
		if (urlReq.pathname === "/login/verify") {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({valid: true, message: "access allowed"}));
			return;
		} else if (urlReq.pathname === "/login/products") {
			products(decoded, req, res);
			return;
		}
	}
});

server.listen(PORT, () => {
	console.log(`server on port: ${PORT}`);
});
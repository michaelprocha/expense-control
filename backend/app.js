import http from "http";
import { URL } from "url";
import login from "./javascript/login.js";
import verifyLogin from "./javascript/verify.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	if (req.method === "OPTIONS") {
		res.writeHead(204);
		return res.end();
	}

	const urlReq = new URL(req.url, "http://localhost:3000");
	if (urlReq.pathname === "/login" && req.method === "POST") {
		login(req, res);
		return;
	}else if(urlReq.pathname === '/login/verify' && req.method === 'GET'){
		verifyLogin(req, res);
	}
});

server.listen(PORT, () => {
	console.log(`server on port: ${PORT}`);
});

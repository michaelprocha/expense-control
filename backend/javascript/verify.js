import jwt from "jsonwebtoken";

export default function verifyLogin(req, res) {
	const cookie = req.headers.cookie;
	if (!cookie) {
		res.writeHead(401, { "Content-Type": "application/json" });
		return res.end(JSON.stringify({ message: "Login não permitido" }));
	}

	const token = cookie
		.split("; ")
		.find(c => c.startsWith("token="))
		?.split("=")[1];

	if (!token) {
		res.writeHead(401, { "Content-Type": "application/json" });
		return res.end(JSON.stringify({ message: "Token ausente" }));
	}

	try {
		const decoded = jwt.verify(token, "token");
		res.writeHead(200, { "Content-Type": "application/json" });
		return res.end(JSON.stringify({ valid: true, user: decoded }));
	} catch (e) {
		res.writeHead(401, { "Content-Type": "application/json" });
		return res.end(JSON.stringify({ message: "Token inválido ou expirado" }));
	}
}

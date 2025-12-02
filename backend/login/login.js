import jwt from "jsonwebtoken";
import db from "../database/db.js";
import argon2 from "argon2";

export default function login(req, res) {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});
	req.on("end", () => {
		const data = JSON.parse(body);
		const query = "SELECT user_id, email, access FROM usuarios WHERE email = ?";
		db.query(query, data.email, async (e, result) => {
			if (e) {
				res.statusCode = 500;
				res.setHeader("Content-type", "application/json; charset=utf-8");
				res.end({ message: "Falha inesperada" });
				return;
			}
			if (result[0]) {
				const ok = await argon2.verify(result[0].access, data.password);
				if (!ok) {
					res.statusCode = 401;
					res.setHeader("Content-type", "application/json; charset=utf-8");
					res.end(JSON.stringify({ message: "Email ou senha incorreta" }));
					return;
				}

				const token = jwt.sign({ id: result[0].user_id }, "token", { expiresIn: "1h" });

				res.statusCode = 200;
				res.setHeader("Content-type", "application/json; charset=utf-8");
				res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Secure; SameSite=None; Path=/`);
				res.end(JSON.stringify({ redirect: "products.html" }));
				return;
			} else {
				res.statusCode = 401;
				res.setHeader("Content-type", "application/json; charset=utf-8");
				res.end(JSON.stringify({ message: "Email ou senha incorreta" }));
				return;
			}
		});
	});
}

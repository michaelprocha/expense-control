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
		console.log(data);
		const query = "SELECT user_id, email, access FROM usuarios WHERE email = ?";
		db.query(query, data.email, async (e, result) => {
			if (e) {
				console.log(`Erro na consulta: ${e.message}`);
				return;
			}
			if (result[0]) {
				const ok = await argon2.verify(result[0].access, data.password);
				if (!ok) {
					res.statusCode = 401;
					res.statusMessage = `Erro ao logar`;
					res.setHeader("Content-type", "application/json; charset=utf-8");
					res.end(JSON.stringify({ message: "senha incorreta" }));
					return;
				}

				const token = jwt.sign({ id: result[0].user_id }, "token", { expiresIn: "1h" });

				res.statusCode = 200;
				res.statusMessage = `login`;
				res.setHeader("Content-type", "application/json; charset=utf-8");
				res.setHeader("Set-Cookie", `token=${token}; HttpOnly; SameSite=None; Path=/`);
				res.end(JSON.stringify({ redirect: "products.html" }));
			} else {
				res.statusCode = 401;
				res.statusMessage = `Erro ao logar`;
				res.setHeader("Content-type", "application/json; charset=utf-8");
				res.end(JSON.stringify({ message: "email incorreto" }));
				return;
			}
		});
	});
}

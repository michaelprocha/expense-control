import pkg from "jsonwebtoken";
import db from "../database/db.js";
import argon2 from 'argon2';

export default function login(req, res) {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});
	req.on("end", () => {
		const data = JSON.parse(body);
		console.log(data);
		const query = 'SELECT email, access FROM usuarios WHERE email = ?';
		db.query(query, data.email, async (e, result) => {
			if (e) {
				console.log(`Erro na consulta: ${e.message}`);
				return;
			}
			if (result[0]) {
				const ok = await argon2.verify(result[0].access, data.password);
				if (!ok) {
					res.statusCode = 200;
					res.statusMessage = `Feito login`;
					res.setHeader("Content-type", "application/json; charset=utf-8");
					res.end(JSON.stringify({status: "incorreto"}));
					return;
				}
				res.statusCode = 200;
				res.statusMessage = `Feito login`;
				res.setHeader("Content-type", "application/json; charset=utf-8");
				res.end(JSON.stringify({status: "correto"}));
			}
		});
	});
}
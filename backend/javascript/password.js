import jwt from "jsonwebtoken";
import db from "../database/db.js";
import argon2 from 'argon2';

export default function passwordReset(req, res) {
	let body = "";

	req.on("data", (chunk) => (body += chunk.toString()));
    
	req.on("end", async () => {

		const data = JSON.parse(body);

		try {
            const confirm = jwt.verify(data.token, "token");
            const hash = await argon2.hash(data.password);
			const query = `UPDATE usuarios SET access = ? WHERE user_id = ?`;
			db.query(query, [hash, confirm.id], (err) => {
                if (err) {
                    res.writeHead(500, {"Content-type": "application/json"});
                    res.end(JSON.stringify({erro: 'server error'}));
                    return
                }
                res.writeHead(200, { "Content-type": "application/json" });
                res.end(JSON.stringify({ password: "reset" }));
            });
		} catch (error) {
			res.writeHead(401, { "Content-type": "application/json" });
			res.end(JSON.stringify({ valid: false }));
		}
	});
}

import db from "../database/db.js";
import argon2 from 'argon2';

export default function register(req, res) {
	let body = "";

	req.on("data", (chunk) => (body += chunk.toString()));

	req.on("end", () => {
		const data = JSON.parse(body);
		const { email, firstName, lastName, password } = data;
        
        const verifyEmail = 'SELECT email FROM usuarios WHERE email = ?';
        db.query(verifyEmail, email, async (error, result) => {
            if (error) {
                res.writeHead(500, {"Content-type": "application/json"});
                res.end(JSON.stringify({message: 'unknown error'}));
                return;
            }

            if (result.length > 0) {
                res.writeHead(200, {"Content-type": "application/json"});
                res.end(JSON.stringify({message: "Email is already registered."}));
                return;
            }
            
            const hash = await argon2.hash(password);
            const query = `INSERT INTO usuarios (email, first_name, last_name, access) VALUES ( ?, ?, ?, ?)`;
            db.query(query, [ email, firstName, lastName, hash ], (error) => {
                if (error) {
                    res.writeHead(500, {"Content-type": "application/json"});
                    res.end(JSON.stringify({message: 'unknown error'}));
                    return;
                }
                
                res.writeHead(200, {"Content-type": "application/json"});
                res.end(JSON.stringify({message: "Email registered."}));
            });
        });
	});
}
import db from "../database/db.js";
import jwt from "jsonwebtoken";
import transporter from "../nodemailer/transporter.js";

export default function forgotAccess(req, res) {
	let body = "";
	req.on("data", (chunk) => (body += chunk.toString()));
	req.on("end", () => {
		const data = JSON.parse(body);
		const query = 'SELECT user_id, email FROM usuarios WHERE email = ?';
		db.query(query, data.email, async (err, result) => {
            if (err) {
                res.writeHead(500, { "Content-type": "application/json" });
				res.end(JSON.stringify({ message: "unknown error" }));
				return;
			}
            
            res.writeHead(200, { "Content-type": "application/json" });

			if (!result[0]) {
                res.end(JSON.stringify({ message: "email sentxxx." }));
				return;
			}
            
			const token = jwt.sign({ id: result[0].user_id }, "token", { expiresIn: "10m" });
            
			const link = `http://127.0.0.1:5500/frontend/dist/reset.html?token=${token}`;
            
			await transporter.sendMail({
                from: `InfoMoney <${process.env.SMTP_USER}>`,
				to: data.email,
				subject: "Recuperação de senha",
				html: `<p>Para resetar sua senha clique aqui:</p><a href="${link}">Recuperar senha</a>`,
			});
            
            res.end(JSON.stringify({ message: "email sent." }));
            return;
		});
	});
}

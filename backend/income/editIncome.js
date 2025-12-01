import db from "../database/db.js";

export default function editIncome(decoded, req, res) {
	let body = "";

	req.on("data", (chunk) => (body += chunk.toString()));

	req.on("end", () => {
		const data = JSON.parse(body);
		const { savedValue, targetValue} = data;
		console.log(data);
		console.log(savedValue);
		console.log(targetValue);

		const queryEditIncome = `UPDATE income SET spending_target = ?, total_saved = ? WHERE usuario_user_id = ?`;

		db.query(queryEditIncome, [targetValue, savedValue, decoded.id], (error) => {
			if (error) {
				res.writeHead(500, { "Content-type": "application/json" });
				res.end(JSON.stringify({ message: "unknown error" }));
				return;
			}

			res.writeHead(200, { "Content-type": "application/json" });
			res.end(JSON.stringify({ message: "edited" }));
			return;
		});
	});
}

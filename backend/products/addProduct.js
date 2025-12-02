import db from "../database/db.js";

export default function addProduct(decoded, req, res) {
	let body = "";

	req.on("data", (chunk) => (body += chunk.toString()));

	req.on("end", async () => {
		const data = JSON.parse(body);
		const { productName, productValue, productDate } = data;

		const queryAddProduct = `INSERT INTO product (usuario_user_id, product_name, product_value, product_date) VALUES (?, ?, ?, ?)`;

		db.execute(queryAddProduct, [decoded.id, productName, productValue, productDate], (error, result) => {
			if (error) {
				res.writeHead(500, { "Content-type": "application/json" });
				res.end(JSON.stringify({ message: "Falha inesperada" }));
				return;
			}
			res.writeHead(200, { "Content-type": "application/json" });
			res.end(JSON.stringify({ id: result.insertId }));
			return;
		});
	});
}

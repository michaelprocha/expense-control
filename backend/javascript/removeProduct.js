import db from "../database/db.js";

export default function removeProduct(decoded, req, res) {
    let body = '';

    req.on('data', chunk => body += chunk.toString());

    req.on('end', () => {
        const data = JSON.parse(body);

        const queryRmProduct = 'DELETE FROM product WHERE product_id = ? AND usuario_user_id = ?';

        db.query(queryRmProduct, [data.id, decoded.id], (error) => {
            if (error) {
                res.writeHead(500, {"Content-type": "application/json"});
                res.end(JSON.stringify({message: "unknown error"}));
                return;
            }

            res.writeHead(200, {"Content-type": "application/json"});
            res.end(JSON.parse({message: "product removed"}));
            return;
        });
    });
}
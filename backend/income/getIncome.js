import db from "../database/db.js";

export default function getIncome(decoded, res){
    const queryGetIncome = `SELECT spending_target, total_saved, COALESCE(SUM(product.product_value), 0) AS total_value_products, (spending_target - COALESCE(SUM(product.product_value), 0)) AS remaining_amount FROM income LEFT JOIN product ON product.usuario_user_id = income.usuario_user_id WHERE income.usuario_user_id = ? GROUP BY income.income_id`;

    db.query(queryGetIncome, decoded.id, (error, result) => {
        if (error) {
            res.writeHead(500, {"Content-type": "application/json"});
            res.end(JSON.stringify({message: "unknown error"}));
            return;
        }

        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify(result[0]));
        return;
    });
}
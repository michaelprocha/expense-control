import db from "../database/db.js";

export default function products(decoded, req, res){
    const query = 'SELECT product_id, product_name, product_value, product_date FROM product WHERE usuario_user_id = ?;'
    db.query(query, decoded.id, (err, result)=>{
        if (err) {
            res.writeHead(500, { "Content-type": "application/json" });
            res.end(JSON.stringify({error: "internal server error"}));
            return;
        }
        
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(result));
    })
}
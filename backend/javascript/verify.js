import jwt from "jsonwebtoken";

function verifyLogin(req) {
	const cookie = req.headers.cookie;
	if (!cookie) {
		return { valid: false, message: "not allowed" };
	}

	const token = cookie
		.split("; ")
		.find((c) => c.startsWith("token="))
		?.split("=")[1];

	if (!token) {
		return { valid: false, message: "token missing" };
	}

	try {
		const decoded = jwt.verify(token, "token");
		return decoded;
	} catch (err) {
		if (err.name === "TokenExpiredError") {
			return { valid: false, message: "expired token" };
		}

		if (err.name === "JsonWebTokenError") {
			return { valid: false, message: "invalid token" };
		}

		return { valid: false, message: "unknown error" };
	}
}


export default function validToken(req, res) {
	const decoded = verifyLogin(req)
	if (decoded.valid === false) {
		if (decoded.message === "unknown error") {
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify(decoded));
			return {valid: false};
		} else {
			res.writeHead(401, { "Content-Type": "application/json" });
			res.end(JSON.stringify(decoded));
			return {valid: false};
		}
	} 
	return decoded;
}
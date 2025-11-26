export default function logout(res) {
	res.writeHead(200, {
		"Set-Cookie": "token=; Secure; HttpOnly; Path=/; SameSite=None; Max-Age=0",
		"Content-Type": "application/json",
	});

    res.end(JSON.stringify({ message: "Logout efetuado" }));
    return;
}

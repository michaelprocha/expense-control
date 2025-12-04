const menuElement = document.querySelector("#menu");
const navMenuElement = document.querySelector("#nav-menu");

menuElement.addEventListener("click", () => {
	if (navMenuElement.classList.contains("hidden")) {
		navMenuElement.classList.add("flex");
		navMenuElement.classList.remove("hidden");
		return;
	}
	navMenuElement.classList.remove("flex");
	navMenuElement.classList.add("hidden");
	return;
});
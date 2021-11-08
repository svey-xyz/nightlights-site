let header:Element;

export const mount = (container: Element) => {
	header = container;

	window.onscroll = function () { scrollIndicator() }
	window.addEventListener("resize", scrollIndicator);
}

function scrollIndicator() {
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	var scrolled = (winScroll / height) * 100;
	document.getElementById('scrollProgressBar')!.style.width = scrolled + "%";
}
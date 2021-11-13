import LazyLoad from "vanilla-lazyload";

/******** VARIABLES ********/
var height: number;
const lazyLoadOptions = {
	elements_selector: ".lazy",
	to_webp: true,
};

/******** INITIALIZATION ********/
export function themeInit() {
	let lazy = document.addEventListener("DOMContentLoaded", createLazyLoadInstance);

	height = window.innerHeight;
	global.vh = height * 0.01;

	window.addEventListener("resize", resize);
	resize();

	global.primaryBg = getComputedStyle(document.documentElement).getPropertyValue('--primary-bg');
	global.primaryAccent = getComputedStyle(document.documentElement).getPropertyValue('--primary-accent');

	// document.addEventListener("DOMContentLoaded", createLazyLoadInstance);

}

const createLazyLoadInstance = () => {
	// return new LazyLoad(lazyLoadOptions);
};

function resize() {
	if (!global.mobile) {
		height = window.innerHeight;
		global.vh = height * 0.01;
	}

	document.documentElement.style.setProperty('--vh', `${global.vh}px`);
}
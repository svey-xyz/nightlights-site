
/******** VARIABLES ********/
var height: number;

/******** INITIALIZATION ********/
export function themeInit() {

	height = window.innerHeight;
	global.vh = height * 0.01;

	window.addEventListener("resize", resize);
	resize();

	global.primaryBg = getComputedStyle(document.documentElement).getPropertyValue('--primary-bg');
	global.primaryAccent = getComputedStyle(document.documentElement).getPropertyValue('--primary-accent');
}

function resize() {
	if (!global.mobile) {
		height = window.innerHeight;
		global.vh = height * 0.01;
	}

	document.documentElement.style.setProperty('--vh', `${global.vh}px`);
}
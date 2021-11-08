/******** ALLOW TRANSPARENCY CLICK THROUGH ********/
const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement("canvas").getContext("2d");
let stack: Array<HTMLElement> = [];
let clickThroughTargetClass: string;

export const pngClickThrough = function (ev: MouseEvent, target: any, classTarget: string): any {
	clickThroughTargetClass = classTarget;

	if (!target.classList.contains(clickThroughTargetClass)) clickThroughRelease(target);
	if (!target.offsetParent) return;

	// Get click coordinates
	const isImage = /img/i.test(target.tagName),
		x = ev.pageX - target.offsetParent.offsetLeft,
		y = ev.pageY - target.offsetParent.offsetTop;


	ctx.canvas.width = getWinWidth();
	ctx.canvas.height = getWinHeight();
	let alpha;

	// Draw image to canvas and read Alpha channel value
	if (isImage) {
		var rect = target.getBoundingClientRect();
		ctx.drawImage(target, rect.left, rect.top, target.width, target.height);
		alpha = ctx.getImageData(x, y, 1, 1).data[3]; // [0]R [1]G [2]B [3]A
	}

	if (alpha === 0) {
		target.style.pointerEvents = "none";
		stack.push(target);
		return pngClickThrough(ev, document.elementFromPoint(ev.clientX, ev.clientY), clickThroughTargetClass); // REPEAT
	} else {
		return clickThroughRelease(target);
	}
}

function clickThroughRelease(target: any): any {
	stack.forEach(el => (el.style.pointerEvents = "auto")); // Show all hidden elements
	stack = [];               // Reset stack

	if (!target.classList.contains(clickThroughTargetClass)) return null;
	return target;
}

/******** MATHS ********/
function getWinWidth(): number {
	return Math.max(
		document.body.scrollWidth,
		document.documentElement.scrollWidth,
		document.body.offsetWidth,
		document.documentElement.offsetWidth,
		document.documentElement.clientWidth
	);
}

function getWinHeight(): number {
	return Math.max(
		document.body.scrollHeight,
		document.documentElement.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.offsetHeight,
		document.documentElement.clientHeight
	);
}
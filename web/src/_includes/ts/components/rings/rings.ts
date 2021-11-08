import { pngClickThrough } from '../../utilities/transparencyClickThrough'
import { updateURLParameter } from '../../utilities/updateURLParameter'
let QRCode = require('qrcode')

interface ringsArray {
	[index: string]: NodeListOf<HTMLElement>;
}
let rings:ringsArray = {};
let ringNames: Array<string> = ['centerRing', 'innerRingOne', 'innerRingTwo', 'outerRingOne', 'outerRingTwo'];
let activeRings: Array<string> = [];
let numArtists: number = 0;

let qrCanvas: HTMLElement;
let qrClose: HTMLElement;


let ringsParamString: string = 'rings'

export const mount = (container: Element) => {
	qrCanvas = <HTMLElement>document.getElementById('qrcodeCanvas');
	qrClose = <HTMLElement>document.getElementById('qrClose');

	qrClose.onclick = function () {
		let overlay: HTMLElement = <HTMLElement>document.getElementById('qrOverlay');
		overlay.classList.add('hidden');
	};

	const ringsParam = new URL(window.location.href).searchParams.get(ringsParamString);

	
	ringNames.forEach(ringName => {
		let currentRingCode = ringNames.indexOf(ringName);

		rings[ringName] = container.querySelectorAll(`[data-ring='${ringName}']`);
		numArtists = numArtists ? numArtists : rings[ringName].length;

		let firstRing = ringsParam ? ringsParam[currentRingCode] : Math.floor(Math.random() * numArtists);

		rings[ringName].forEach(ring => {
			let ringCode = Number(ring.getAttribute('data-artistcode'));

			if (ringCode == firstRing) addRing(ring);

			ring.onclick = function (event) {
				switchRing(pngClickThrough(event, event.target, 'designRing'))
			};
		})
	});
}

function switchRing(selectedRing:HTMLElement): void {
	if (!selectedRing) return;

	let ringCode: number = Number(selectedRing.getAttribute('data-artistcode'));
	let nextRingCode: number = ringCode + 1 >= numArtists ? 0 : ringCode + 1;

	let newRing: HTMLElement = selectedRing;

	ringNames.forEach(ringName => {
		if (ringName == selectedRing.getAttribute('data-ring')) {
			rings[ringName].forEach(ring => {
				let ringCodeCheck = Number(ring.getAttribute('data-artistcode'));

				if (ringCodeCheck == nextRingCode) newRing = ring;
			})
		}
	});

	selectedRing.classList.remove('block');
	selectedRing.classList.add('hidden');

	addRing(newRing);
}

function addRing(ring: HTMLElement) {
	let ringName = <string>ring.getAttribute('data-ring');
	let ringCode = <string>ring.getAttribute('data-artistcode');

	activeRings[ringNames.indexOf(ringName)] = ringCode;

	ring.classList.add('block');
	ring.classList.remove('hidden');

	generateRingsCode();
}

function generateRingsCode(): void {
	var opts = {
		errorCorrectionLevel: 'M',
		type: 'image/webp',
		scale: 12,
		quality: 1,
		margin: 2,
		color: {
			dark: "#000000",
			light: "#FFFFFF"
		}
	}

	window.history.replaceState('', '', updateURLParameter(window.location.href, ringsParamString, activeRings.join('')));
	QRCode.toCanvas(qrCanvas, 'sample text', opts, function (error: any) {
		if (error) console.error(error)
	})
}
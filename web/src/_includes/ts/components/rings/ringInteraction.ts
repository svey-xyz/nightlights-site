import { ringSection } from "./rings";
import { pngClickThrough } from '../../utilities/transparencyClickThrough'


export const mount = (container: Element) => {
	new ringInteraction(container)
}

class ringInteraction extends ringSection {
	QRCode = require('qrcode')
	qrCanvas: HTMLElement;
	qrOverlay: HTMLElement

	constructor(container: Element) {
		super(<Element>container.querySelector('#ringContainer'));

		this.qrCanvas = <HTMLElement>container.querySelector('#qrcodeCanvas');
		this.qrOverlay = <HTMLElement>container.querySelector('#qrOverlay');

		let qrClose = <HTMLElement>container.querySelector('#qrClose');
		let qrButton = <HTMLElement>container.querySelector('#qrButton');

		qrClose.onclick = () => {
			this.qrOverlay.classList.add('hidden');
		};

		qrButton.onclick = () => {
			this.generateQRCode();
		}

		const codeParam = new URL(window.location.href).searchParams.get('code');
		if (codeParam && codeParam == 'open') this.generateQRCode();
	}

	generateQRCode(): any {
		this.qrOverlay.classList.remove('hidden');

		var qrOpts = {
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

		this.QRCode.toCanvas(this.qrCanvas, `${this.ringsQRPass}${this.activeCodes(true)}`, qrOpts, function (error: any) {
			if (error) console.error(error)
		})
	}

	handleInput(e: Event) {
		super.handleInput(e);

		let selectedRing = pngClickThrough(<MouseEvent>e, e.target, 'designRing');
		if(!selectedRing) return;

		let ringType = <string>selectedRing.getAttribute('data-ringtype');
		let ringCode: number = this.rings.get(ringType)!.indexOf(selectedRing);

		let nextRingCode: number = ringCode + 1 >= this.rings.get(ringType)!.length ? 0 : ringCode + 1;

		this.addRing(this.rings.get(ringType)![nextRingCode]);
	}
}


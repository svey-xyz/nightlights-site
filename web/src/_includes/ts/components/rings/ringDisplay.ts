import { ringSection } from "./rings";
import { Html5Qrcode } from 'html5-qrcode'
import { Html5QrcodeSupportedFormats } from 'html5-qrcode'


export const mount = (container: Element) => {
	new ringDisplay(container)
}

class ringDisplay extends ringSection {
	ratios = [1, 2, 64]
	rotationRatio:number = 360 / 12

	constructor(container: Element) {
		super(<Element>container.querySelector('#ringContainer'));
		this.mainLoop();
		this.initializeScanning();

	}

	/******** MAIN LOOP ********/
	mainLoop = () => {
		setTimeout(() => { requestAnimationFrame(this.mainLoop); }, 1000);

		let dt: Date = new Date();
		this.rotateRings(dt.getSeconds());
	}

	rotateRings(sec: number): void {
		let centre: HTMLElement = this.activeRings.get(this.ringNames[0])!
		let innerOne: HTMLElement = this.activeRings.get(this.ringNames[1])!
		let innerTwo: HTMLElement = this.activeRings.get(this.ringNames[2])!
		let outerOne: HTMLElement = this.activeRings.get(this.ringNames[3])!
		let outerTwo: HTMLElement = this.activeRings.get(this.ringNames[4])!

		let rotation = sec * this.rotationRatio;

		if (sec % this.ratios[0] == 0) {
			centre.style.rotate = `${rotation / this.ratios[0]}deg`
		}

		if (sec % this.ratios[1] == 0) {
			innerOne.style.rotate = `${rotation / this.ratios[1]}deg`
			innerTwo.style.rotate = `${rotation / this.ratios[1]}deg`
		}

		if (sec % this.ratios[2] == 0) {
			outerOne.style.rotate = `${rotation / this.ratios[2]}deg`
			outerTwo.style.rotate = `${rotation / this.ratios[2]}deg`
		}
	}



	/******** Handle QR Code Scanning ********/
	initializeScanning(): void {
		Html5Qrcode.getCameras().then(devices => {
			if (devices && devices.length) {
				var cameraId = devices[0].id;				
			
				const html5QrCode = new Html5Qrcode(
					"reader", { formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE], verbose: false });

				html5QrCode.start(
					cameraId,
					{
						fps: 2,
						qrbox: 400,
						
					},
					qrCodeMessage => {
						this.loadRingsFromQR(qrCodeMessage);
					},
					errorMessage => {
						// console.log(errorMessage)
					})
					.catch(err => {
						// Start failed, handle it.
					});
			}
		}).catch(err => {
			// handle err
		});
	}

	loadRingsFromQR(qrCodeMessage:string) {
		var rings = qrCodeMessage.split('.');
		// if (rings[0] == PASS.split('.')[0]) {
		// 	rings.shift()

		// 	if (Object.values(artistPicks) == rings.toString()) {
		// 		console.log('ring already active')
		// 		return;
		// 	}

		// 	for (i = 0; i < ringNames.length; i++) {
		// 		this.addRing(ringNames[i], rings[i]);
		// 	}
		// }
	}
}

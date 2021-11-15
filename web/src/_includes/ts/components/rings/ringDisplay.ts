import { ringSection } from "./rings";
import { Html5Qrcode } from 'html5-qrcode'
import { Html5QrcodeSupportedFormats } from 'html5-qrcode'


export const mount = (container: Element) => {
	new ringDisplay(container)
}

class ringDisplay extends ringSection {
	ringGroupRatios: { [index: string]: number; } = { 'centre': 1, 'inner': 2, 'outer': 64 }
	ringGroups: { [index: string]: HTMLElement[]; } = {};
	
	rotationRatio: number = 360 / 12
	counter: number = 0

	constructor(container: Element) {
		super(<Element>container.querySelector('#ringContainer'));
		this.updateRingGroups();

		this.mainLoop();
		this.initializeScanning();
	}

	/******** MAIN LOOP ********/
	mainLoop = () => {
		setTimeout(() => { requestAnimationFrame(this.mainLoop); }, 1000);

		this.counter++
		let rotation = (this.counter % (this.ringGroupRatios['outer'] * 12)) * this.rotationRatio;

		for (let group in this.ringGroups) {
			if (this.counter % this.ringGroupRatios[group] == 0) {
				let groupRotation = (rotation / this.ringGroupRatios[group])

				this.ringGroups[group].forEach(ring => {
					ring.setAttribute('style', `transform: rotate(${groupRotation}deg) translate(-50%, -50%)`)
				})
			}
		}
	}

	updateRingGroups(): void {
		this.ringGroups = {
			'centre': [this.activeRings.get(this.ringNames[0])!],
			'inner': [this.activeRings.get(this.ringNames[1])!, this.activeRings.get(this.ringNames[2])!],
			'outer': [this.activeRings.get(this.ringNames[3])!, this.activeRings.get(this.ringNames[4])!]
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
		let ringsCode: Array<string> = qrCodeMessage.split('-');

		if (ringsCode[0] == this.ringsQRPass) {
			ringsCode.forEach((code, index) => {
				if (index == 0 && code == this.ringsQRPass) return;
				else {
					let ringType: string = this.ringNames[index - 1]
					let ringGroup: HTMLElement[] = this.rings.get(ringType)!
					let loadRing = ringGroup[Number(code)]

					this.addRing(loadRing)
				}
			});
		}

		this.updateRingGroups()
	}
}

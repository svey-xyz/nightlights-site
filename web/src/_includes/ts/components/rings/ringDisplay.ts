import { ringSection } from "./rings";
import { ringClass } from "./ringClass";
import { Html5Qrcode } from 'html5-qrcode'
import { Html5QrcodeSupportedFormats } from 'html5-qrcode'


export const mount = (container: Element) => {
	new ringDisplay(container)
}

class ringDisplay extends ringSection {
	ringGroupRatios: { [index: string]: number; } = { 'centre': 1, 'inner': 2, 'outer': 64 }
	ringGroupRotations: { [index: string]: number; } = { 'centre': 0, 'inner': 0, 'outer': 0 };
	ringGroups: { [index: string]: ringClass[]; } = {};
	
	rotationRatio: number = 360 / 12
	counter: number = 0
	ringsScale: number = 1.0
	scaleInteger: number = 0.01

	constructor(container: Element) {
		super(<Element>container.querySelector('#ringContainer'));
		this.updateRingGroups();

		document.addEventListener('keydown', (e) => {
			switch (e.code) {
				case 'ArrowUp':
					this.ringsScale += this.scaleInteger;
					this.updateRingTransforms();
					break;
				case 'ArrowDown':
					this.ringsScale -= this.scaleInteger
					this.updateRingTransforms();
					break;
				case 'Space':
					this.randomizeRings();
				default:
					break;
			}
		});	

		this.mainLoop();
		this.initializeScanning();
	}

	/******** MAIN LOOP ********/
	mainLoop = () => {
		setTimeout(() => { requestAnimationFrame(this.mainLoop); }, 1000);

		this.counter++
		this.updateRingTransforms();
	}

	randomizeRings(): void {	
		this.ringNames.forEach(ringType => {
			let rand = Math.floor(Math.random() * this.numArtists);
			this.addRing(this.rings.get(ringType)![rand])
		})
	}

	updateRingGroups(): void {
		this.ringGroups = {
			'centre': [...this.rings.get(this.ringNames[0])!],
			'inner': [...this.rings.get(this.ringNames[1])!, ...this.rings.get(this.ringNames[2])!],
			'outer': [...this.rings.get(this.ringNames[3])!, ...this.rings.get(this.ringNames[4])!]
		}
	}

	updateRingTransforms(): void {
		for (let group in this.ringGroups) {
			let rotation = ((this.counter % (this.ringGroupRatios[group] * 12)) * this.rotationRatio) / this.ringGroupRatios[group];
			let rotateTurn = this.counter % this.ringGroupRatios[group] === 0

			this.ringGroups[group].forEach(ring => {
				if (rotateTurn) this.ringGroupRotations[group] = rotation;
				ring.getElement().setAttribute('style', `transform: rotate(${this.ringGroupRotations[group]}deg) scale(${this.ringsScale})`)
			})
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
						qrbox: 550,
						
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
					let ringGroup: ringClass[] = this.rings.get(ringType)!
					let loadRing = ringGroup[Number(code)]

					this.addRing(loadRing)
				}
			});
		}
	}
}

import { updateURLParameter } from '../../utilities/updateURLParameter'
import { ringClass } from "./ringClass";

export class ringSection {

	ringContainer: HTMLElement;
	
	ringNames: Array<string> = ['centerRing', 'innerRingOne', 'innerRingTwo', 'outerRingOne', 'outerRingTwo'];
	rings: Map<string, ringClass[]> = new Map<string, ringClass[]>();
	activeRings: Map<string, ringClass> = new Map<string, ringClass>();

	numArtists: number;
	ringsParamString: string = 'rings'
	ringsQRPass: string = 'nl'
	codeSeparator: string = '-'

	inputHandler: (e: Event) => void;

	constructor(container: Element) {
		this.ringContainer = <HTMLElement>container;
		this.inputHandler = this.handleInput.bind(this);

		this.numArtists = Array.from(container.querySelectorAll('.designRing')).length / this.ringNames.length - 1;

		const ringsParam = new URL(window.location.href).searchParams.get(this.ringsParamString);
		
		this.ringNames.forEach(ringName => {
			let nodeListRings: NodeListOf<HTMLElement> = container.querySelectorAll(`[data-ringtype='${ringName}']`)
			let currentRingSelection = this.ringsFromElements(Array.from(nodeListRings))

			this.rings.set(ringName, currentRingSelection);

			let paramCode: any = ringsParam ? ringsParam : '';
			let artistParamCodes: Array<string> = paramCode.split(this.codeSeparator);
			let artistCode: any = artistParamCodes[this.ringNames.indexOf(ringName)]
			let firstRing = artistCode && !isNaN(artistCode) ? artistCode : Math.floor(Math.random() * this.numArtists);

			currentRingSelection.forEach((ring, index) => {
				if (index == firstRing) this.addRing(ring);
				ring.getElement().addEventListener('mousedown', this.inputHandler);
			})
		});
	}

	handleInput(e: Event): void { };

	addRing(newRing: ringClass) {
		let newRingType = newRing.getElement().getAttribute('data-ringtype')!;
		this.activeRings.set(newRingType, newRing);

		newRing.getElement().classList.add('block');
		newRing.getElement().classList.remove('hidden');

		this.ringNames.forEach(ringName => {
			if (ringName == newRingType) {
				this.rings.get(ringName)!.forEach(ring => {
					if (ring != newRing) {
						ring.getElement().classList.remove('block')
						ring.getElement().classList.add('hidden')
					}
				})
			}
		});

		window.history.replaceState('', '', updateURLParameter(window.location.href, this.ringsParamString, this.activeCodes()));
	}

	activeCodes(): string {
		let code:string = '';

		this.activeRings.forEach((ring) => {
			code += `${this.rings.get(ring.getElement().getAttribute('data-ringtype')!)!.indexOf(ring)}${this.codeSeparator}`
		});

		return code.slice(0, -1);
	}

	ringsFromElements(ringSelection: HTMLElement[]): ringClass[] {
		let rings: ringClass[] = []
		ringSelection.forEach(ringElement => {
			rings.push(new ringClass(ringElement))
		});

		return rings;
	}
}

ringSection.prototype.handleInput = function (e: Event) {
	// Handle click
};
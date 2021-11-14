import { updateURLParameter } from '../../utilities/updateURLParameter'


export class ringSection {

	ringContainer: HTMLElement;
	
	ringNames: Array<string> = ['centerRing', 'innerRingOne', 'innerRingTwo', 'outerRingOne', 'outerRingTwo'];
	rings: Map<string, HTMLElement[]> = new Map<string, HTMLElement[]>();
	activeRings: Map<string, HTMLElement> = new Map<string, HTMLElement>();

	numArtists: number;
	ringsParamString: string = 'rings'
	ringsQRPass: string = 'nl-'

	inputHandler: (e: Event) => void;

	constructor(container: Element) {
		this.ringContainer = <HTMLElement>container;
		this.inputHandler = this.handleInput.bind(this);

		this.numArtists = Array.from(container.querySelectorAll('.designRing')).length / this.ringNames.length - 1;

		const ringsParam = new URL(window.location.href).searchParams.get(this.ringsParamString);
		
		this.ringNames.forEach(ringName => {
			let nodeListRings: NodeListOf<HTMLElement> = container.querySelectorAll(`[data-ringtype='${ringName}']`)
			let currentRingSelection = Array.from(nodeListRings)

			this.rings.set(ringName, currentRingSelection);

			let paramCode: any = ringsParam ? ringsParam[this.ringNames.indexOf(ringName)] : '';
			let firstRing = paramCode && !isNaN(paramCode) ? paramCode : Math.floor(Math.random() * this.numArtists);

			currentRingSelection.forEach((ring, index) => {
				if (index == firstRing) this.addRing(ring);
				ring.addEventListener('mousedown', this.inputHandler);
			})
		});
	}

	handleInput(e: Event): void { };

	addRing(newRing: HTMLElement) {
		let newRingType = newRing.getAttribute('data-ringtype')!;
		this.activeRings.set(newRingType, newRing);

		newRing.classList.add('block');
		newRing.classList.remove('hidden');

		this.ringNames.forEach(ringName => {
			if (ringName == newRingType) {
				this.rings.get(ringName)!.forEach(ring => {
					if (ring != newRing) {
						ring.classList.remove('block')
						ring.classList.add('hidden')
					}
				})
			}
		});

		window.history.replaceState('', '', updateURLParameter(window.location.href, this.ringsParamString, this.activeCodes(false)));
	}

	activeCodes(seperators: boolean): string {
		let code:string = '';

		this.activeRings.forEach((ring) => {
			code += this.rings.get(ring.getAttribute('data-ringtype')!)!.indexOf(ring)
			if (seperators) code += '.';
		});

		return seperators ? code.slice(0, -1) : code;
	}
}

ringSection.prototype.handleInput = function (e: Event) {
	// Handle click
};
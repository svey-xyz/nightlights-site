
export class ringClass {
	ringElement: HTMLElement

	constructor(ringElement: HTMLElement) {
		this.ringElement = ringElement;
	}

	getElement(): HTMLElement {
		return this.ringElement;
	}
}
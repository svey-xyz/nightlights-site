import { ringSection } from "./rings";

export const mount = (container: Element) => {
	new ringDisplay(container)
}

class ringDisplay extends ringSection {
	constructor(container: Element) {
		super(<Element>container.querySelector('#ringContainer'));
	}
}
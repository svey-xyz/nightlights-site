import { BiCard } from "react-icons/bi";

export default {
	title: 'Artist Cards',
	name: 'artistCards',
	type: 'object',
	icon: BiCard,
	fields: [
		{
			title: 'Artists',
			name: 'artists',
			type: 'array',
			description: 'Selected artists will appear as cards linking to their pages\`.',
			of: [{
				type: 'reference',
				to: [{ type: 'artist' }]
			}]
		}
	],
	preview: {
		prepare(value) {
			return {
				title: 'Artists',
				subtitle: 'Selected artists for card layout.'
			}
		}
	}
}
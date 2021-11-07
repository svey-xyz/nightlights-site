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
			description: 'Select and order included artists.',
			of: [{
				type: 'reference',
				to: [{ type: 'artist' }]
			}]
		}
	]
}
import { ImEmbed2 } from "react-icons/im";

export default {
	title: 'Embed',
	name: 'embed',
	type: 'object',
	icon: ImEmbed2,
	fields: [
		{
			title: 'Embed title.',
			name: 'embedTitle',
			type: 'string',
			description: 'Give your embed a title.'
		},
		{
			name: 'url',
			type: 'url',
			title: 'Embed from elsewhere.',
			description: 'Add the url to the content to be embedded.'
		}
	],
	preview: {
		select: {
			title: 'url'
			// subtitle: 'releaseDate'
		}
	}
}
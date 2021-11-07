import { ImEmbed2 } from "react-icons/im";

export default {
	title: 'Embed',
	name: 'embed',
	type: 'object',
	icon: ImEmbed2,
	fields: [
		{
			name: 'url',
			type: 'url',
			title: 'Link to the content to be embedded.',
			description: 'Currently works with: Vimeo, YouTube, Instagram, Twitter, and more.'
		}
	],
	preview: {
		select: {
			title: 'url'
			// subtitle: 'releaseDate'
		}
	}
}
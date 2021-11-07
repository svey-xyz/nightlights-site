export default {
	title: 'Image',
	name: 'altImage',
	type: 'image',
	fields: [
		{
			type: 'string',
			name: 'alt',
			title: 'Alternative text',
			description: 'What text should appear in place of the image.',
			options: {
				isHighlighted: true
			}
		}
	]
}
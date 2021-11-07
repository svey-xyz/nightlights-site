export default {

	title: 'Default Page Template',
	name: 'defaultPage',
	type: 'object',
	fields: [
		{
			title: 'Blocks',
			name: 'blocks',
			type: '_blocks',
			description: 'The main content of the page.',
		}
	],
	preview: {
		select: {
			title: 'title'
		}
	}
}
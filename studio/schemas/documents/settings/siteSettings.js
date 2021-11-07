

export default {
	title: 'Site Settings',
	name: 'siteSettings',
	type: 'document',
	__experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: Rule => Rule.required().error(`This site needs a fun name!`)
		},
		{
			title: 'Logo',
			name: 'logo',
			type: 'image',
			description: 'Site logo displayed in header. Ideally an SVG',
			// validation: Rule => Rule.required()
		},
		{
			title: 'Description',
			name: 'description',
			type: 'text',
			description: 'Concise description of the site.',
			validation: Rule => [
				Rule.required(),
				Rule.min(45).warning("Try to be more descriptive."),
				Rule.max(200).warning("This may be too descriptive!")
			]
		},
		{
			title: 'Keywords',
			name: 'keywords',
			type: 'array',	
			description: 'Keywords that describe my site.',
			of: [{type: 'string'}],
			options: {
				layout: 'tags'
		}
		}
	]
}

import { HiAtSymbol } from 'react-icons/hi';

export default {
	title: 'Social',
	name: 'socialSite',
	description: 'Link to a social platform.',
	icon: HiAtSymbol,
	type: 'object',	
	fields: [
		{
			title: 'Social Title',
			name: 'socialTitle',
			type: 'string',
			description: 'The title associated with the account prefixed with the address sign (e.g. @username)',
			validation: Rule => Rule.required()
		},
		{		
			title: 'Social Type',
			name: 'socialType',
			type: 'string',
			options: {
				list: [
					{ title: 'Website', value: 'website' },
					{ title: 'Twitter', value: 'twitter' },
					{ title: 'Instagram', value: 'instagram' },
					{ title: 'Facebook', value: 'facebook' },
					{ title: 'Vimeo', value: 'vimeo' },
					{ title: 'LinkedIn', value: 'linkedin' },
					{ title: 'GitHub', value: 'github' },
				]
			},
			validation: Rule => Rule.required()
		},
		{
			title: 'URL',
			name: 'url',
			type: 'url',
			validation: Rule => Rule.required()
		}
	],
	preview: {
		select: {
			title: 'socialTitle',
			type: 'socialType'
		},
		prepare(value) {
			return {
				title: `Social type: ${value.type}`,
				subtitle: value.title
			}
		}
	}
}
import conditionalFields from "../../../lib/conditionalFields";

import { BiLink } from "react-icons/bi";

export default {
	title: 'Link',
	name: 'link',
	type: 'object',
	icon: BiLink,
	inputComponent: conditionalFields,
	fields: [
		{
			type: 'object',
			name: 'input',
			fields: [
				{
					name: 'condition',
					title: 'Template Select',
					type: 'string',
					options: {
						list: [
							{ title: 'Internal Page', value: 'internalPage' },
							{ title: 'External Link', value: 'externalLink' },
						],
						// layout: 'radio',
					}
				}
			]
		},
		{
			type: 'object',
			name: 'options',
			fields: [
				{
					title: 'External Link',
					name: 'externalLink',
					type: 'url',
					description: 'An external link.'
				},
				{
					title: 'Internal Page',
					name: 'internalPage',
					type: 'reference',
					description: 'Reference to a page on your site',
					to: [{ type: 'page' }],
				},
			]
		}
	]
}
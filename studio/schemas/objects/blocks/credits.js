import { IoPeopleCircleSharp } from "react-icons/io5";

export default {
	title: 'Credits',
	name: 'credits',
	type: 'object',
	icon: IoPeopleCircleSharp,
	fields: [
		{
			title: 'Credits',
			name: 'credits',
			type: 'array',
			description: 'List the people involved!',
			of: [{
				type: 'object',
				icon: IoPeopleCircleSharp,
				fields: [
					{
						title: 'Credit Name',
						name: 'creditName',
						type: 'string',
						description: 'The name of the contributor.',
					},
					{
						title: 'Credit Blurb',
						name: 'creditBlurb',
						type: 'string',
						description: 'A short blurb about the contributor.',
					},
					{
						title: 'Credit Link',
						name: 'creditLink',
						type: 'url',
						description: 'The contributor\`s chosen link.',
					}
				]
			}]
		}
	],
	preview: {
		prepare(value) {
			return {
				title: 'Credit\'s block.',
				subtitle: 'A list of incredible contributors!'
			}
		}
	}
}
import { SiGithubsponsors } from "react-icons/si";

export default {
	title: 'Sponsors',
	name: 'sponsors',
	type: 'object',
	icon: SiGithubsponsors,
	fields: [
		{
			title: 'Sponsors',
			name: 'sponsors',
			type: 'array',
			description: 'Define a list of sponsors!',
			of: [{
				type: 'object',
				fields: [
					{
						title: 'Sponsor Name',
						name: 'sponsorName',
						type: 'string',
						description: 'Name of the sponsor.',
					},
					{
						title: 'Sponsor Image',
						name: 'sponsorImage',
						type: 'image',
						description: 'Logo of the sponsor.',
					},
					{
						title: 'Sponsor Link',
						name: 'sponsorLink',
						type: 'url',
						description: 'Link to sponsor\'s chosen page.',
					}
				]
			}]
		}
	],
	preview: {
		prepare(value) {
			return {
				title: 'Sponsors\' block.',
				subtitle: 'A list of incredible sponsors!'
			}
		}
	}
}
import SlugInput from 'sanity-plugin-better-slug'

export default {
	title: 'Site Navigation',
	name: 'navigation',
	type: 'document',
	__experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
	fields: [
		{
			title: 'Home Page',
			name: 'homePage',
			type: 'reference',
			description: 'Select the page to be used for the root of the site.',
			to: [{ type: 'page' }],
		},
		{
			title: 'Interactive Page',
			name: 'interactivePage',
			type: 'reference',
			description: 'Select the interactive page.',
			to: [{ type: 'page' }],
		},
		{
			title: 'Artist Subpath',
			name: 'artistSubpath',
			type: 'slug',
			inputComponent: SlugInput,
			description: 'Set the subpath slug for the artists\' pages.'
		}
	],
}

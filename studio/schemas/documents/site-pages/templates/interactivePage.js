import { RiLayoutMasonryFill } from 'react-icons/ri';


export default {

	title: 'Interactive Page Template',
	name: 'interactivePage',
	type: 'object',
	fields: [
		{
			name: 'note',
			type: 'note',
			options: {
				icon: RiLayoutMasonryFill,
				headline: 'No customization available for selected template.',
				message: 'This template is for the interactive page only.',
				tone: 'transparent'
			}
		},
	]
}
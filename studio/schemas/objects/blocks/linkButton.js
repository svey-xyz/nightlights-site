import { MdOutlineSmartButton } from 'react-icons/md';

export default {
	title: 'Link Button',
	name: 'linkButton',
	type: 'object',
	icon: MdOutlineSmartButton,
	fields: [
		{
			title: 'Link',
			name: 'link',
			type: 'navPage',
			// description: 'Select and order included artists.',
		}
	],
	preview: {
		prepare(value) {
			return {
				title: `Link Button`,
				subtitle: 'Links to an internal page using a custom button.'
			}
		}
	}
}
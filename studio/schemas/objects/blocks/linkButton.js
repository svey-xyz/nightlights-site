import { MdOutlineSmartButton } from 'react-icons/md';

export default {
	title: 'Link Button',
	name: 'linkButton',
	type: 'object',
	icon: MdOutlineSmartButton,
	fields: [
		{
			title: 'Button Text',
			name: 'buttonText',
			type: 'string',
		},
		{
			title: 'Link',
			name: 'link',
			type: 'link',
		}
	],
	preview: {
		select: {
			title: 'buttonText',
		},
		prepare(value) {	
			return {
				title: `${value.title}`,
				subtitle: 'Links to a page using a custom button.'
			}
		}
	}
}
import { BsImageFill } from "react-icons/bs";

export default {
	title: 'Image',
	name: 'image',
	type: 'object',
	icon: BsImageFill,
	fields: [
		{
			title: 'Image Title',
			name: 'title',
			type: 'string',
			description: 'Used as the alt text for screen readers.',
			validation: Rule => Rule.required()

		},
		{
			title: 'Image',
			name: 'image',
			type: 'image',
			description: 'The image to be used.',
			validation: Rule => Rule.required()
		},
	],
	preview: {
		select: {
			title: 'title',
			image: 'image'
		},
		prepare(value) {
			return {
				title: value.title,
				thumbnail: value.image
			}
		}
	}
}
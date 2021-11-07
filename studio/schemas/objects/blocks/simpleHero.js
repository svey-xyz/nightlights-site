import { IoImage } from "react-icons/io5";

export default {
	title: 'Simple Hero',
	name: 'simpleHero',
	type: 'object',
	description: 'Hero blocks should generally be the first item on a page.',
	icon: IoImage,
	fields: [
		{
			title: 'Hero Image',
			name: 'heroImage',
			type: 'image',
			validation: Rule => Rule.required()
		}
	],
	preview: {
		select: {
			thumb: 'heroImage'
		},
		prepare(value) {
			return {
				title: "Simple Hero Section",
				media: value.thumb
			}
		}
	}
}
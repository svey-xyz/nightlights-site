import { GrTextAlignFull } from "react-icons/gr";

export default {
	title: 'Text Section',
	name: 'textSection',
	type: 'object',
	icon: GrTextAlignFull,
	fields: [
		{
			title: 'Text',
			name: 'text',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'Add formatted text to appear within the block.',
		},
		{
			title: 'Text Type',
			name: 'textType',
			type: 'string',
			description: 'The type of text.',
			options: {
				list: [
					{ title: 'Plain', value: 'plain' },
					{ title: 'Collapsible', value: 'collapsible' },
					{ title: 'Block', value: 'block' },
				],
				// layout: 'radio',
			},
			initialValue: 'plain',
			validation: Rule => Rule.required()
		}
	],
	preview: {
		select: {
			blocks: 'text',
			textType: 'textType'
		},
		prepare(value) {
			const block = (value.blocks || []).find(block => block._type === 'block')
			return {
				title: block ?
					block.children.filter(child => child._type === 'span').map(span => span.text).join('') :
					'No title',
				subtitle: `Text Block Style: ${value.textType}`
			}
		}
	}
}
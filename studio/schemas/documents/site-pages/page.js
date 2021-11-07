import conditionalFields from "../../lib/conditionalFields";
import SlugInput from 'sanity-plugin-better-slug'
import { isUniqueAcrossAllDocuments } from '../../lib/isUniqueAcrossAllDocuments'
import { validateSlug } from '../../lib/validateSlug'

import client from 'part:@sanity/base/client'

import defaultPage from './templates/defaultPage';
import interactivePage from './templates/interactivePage';

import { RiPagesFill } from 'react-icons/ri';
import { AiOutlineFileSearch } from 'react-icons/ai'


export default {
	title: "Pages",
	name: "page",
	type: 'document',
	icon: RiPagesFill,
	fieldsets: [
		{ 
			name: 'pageSettings',
			title: 'Page Settings',
			options: {
				collapsible: true,
				collapsed: false
			}
		}
	],
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			fieldset: 'pageSettings',
			description: 'Title of the page for internal use.',
			validation: Rule => [
				Rule.required().error("Page needs a title!"),
				Rule.custom((title, context) => {
					const id = context.document._id.replace(/^drafts\./, '')
					const draftID = `drafts.${id}`

					return client.fetch(`count(*[_type == "page" && title == "${title}" && !(_id == "${id}") && !(_id == "${draftID}")])`)
						.then(count => {
							if (count > 0) {
								return 'This might be confusing, page titles should be unique.'
							} else {
								return true
							}
						})
				}).warning()
			]
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			inputComponent: SlugInput,
			fieldset: 'pageSettings',
			description: 'Custom slugs are generally not recommended, use the generate option.',
			options: {
				source: 'title',
				isUnique: isUniqueAcrossAllDocuments,
				basePath: ' '
			},
			validation: Rule => Rule.custom((slug) => validateSlug(slug))
		},
		{
			name: 'note',
			type: 'note',
			fieldset: 'pageSettings',
			options: {
				icon: AiOutlineFileSearch,
				headline: 'Optimization Tip',
				message: 'The following fields are incredibly important for your SEO. <br><a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title#page_titles_and_seo">Read more about good titles.</a>',
				tone: 'transparent'
			}
		},
		{
			title: 'Descriptive Title',
			name: 'descriptiveTitle',
			type: 'string',
			fieldset: 'pageSettings',
			description: 'A more descriptive title, that will appear in browsers and search engines.',
			validation: Rule => [
				Rule.required(),
				Rule.min(15).warning("Try to make the title as accurate and meaningful as possible!"),
				Rule.max(55).warning("This may be too descriptive, and won't all appear in search engines!")
			]
		},
		{
			title: 'Page Description',
			name: 'description',
			type: 'text',
			fieldset: 'pageSettings',
			description: 'A concise description of the page, if none is provided this page will use the site wide descriptor.',
			validation: Rule => [
				Rule.min(45).warning("Try to be more descriptive."),
				Rule.max(200).warning("This may be too descriptive!")
			]
		},
		{
			title: "Page Content",
			name: 'pageContent',
			type: 'object',
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
									{ title: 'Blocks', value: 'defaultPage' },
									{ title: 'Interactive', value: 'interactivePage' }
								],
								// layout: 'radio',
							}
						}
					]
				},
				{
					type: 'object',
					name: 'options',
					fields: [defaultPage, interactivePage ]
				}
			]
		},
	]
};

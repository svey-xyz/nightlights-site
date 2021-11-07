import client from 'part:@sanity/base/client'
import SlugInput from 'sanity-plugin-better-slug'
import { isUniqueAcrossAllDocuments } from '../lib/isUniqueAcrossAllDocuments'
import { validateSlug } from '../lib/validateSlug'

import { BsPersonBadgeFill } from 'react-icons/bs';

export default {
		
	title: 'Artists',
	name: 'artist',
	type: 'document',
	icon: BsPersonBadgeFill,
	fields: [
		{
			title: 'Artist Name',
			name: 'artistName',
			type: 'string',
			description: 'Name of the artist.',
			validation: Rule => Rule.required()
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			inputComponent: SlugInput,
			description: 'Set the slug for the artist\'s page.',
			options: {
				source: 'title',
				isUnique: isUniqueAcrossAllDocuments,
				basePath: async (document) => {
					const projectsRoot = await client.fetch(`*[_id == "navigation"]{"archivePageSlug":archivePage->slug.current}[0].archivePageSlug`)

					return projectsRoot ? `/${projectsRoot}` : ' '
				}
			},
			validation: Rule => Rule.custom((slug) => validateSlug(slug))
		},
		{
			title: 'Cover Image',
			name: 'artistCover',
			type: 'image',
			description: 'This will appear on the artist\'s card, but not on their page.',
			validation: Rule => Rule.required()
		},
		{
			title: 'Bio',
			name: 'artistBio',
			type: 'array',
			description: 'A description about the artist and their work.',
			of: [{ type: 'block' }]
		},
		{
			title: 'Socials',
			name: 'artistSocials',
			description: 'A list of all related social media accounts.',
			type: 'array',
			of: [{ type: 'socialSite' }]
		}
	],
	preview: {
		select: {
			title: 'title',
			thumbnail: 'thumbnail',
		},
		prepare(value) {
			return {
				title: value.title,
				media: value.thumbnail,
				subtitle: `A fantastic Nightlights contributor!`
			}
		}
	}
}
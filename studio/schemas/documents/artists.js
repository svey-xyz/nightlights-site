import sanityClient from 'part:@sanity/base/client'
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
				source: 'artistName',
				isUnique: isUniqueAcrossAllDocuments,
				basePath: async (document) => {
					const client = sanityClient.withConfig({ apiVersion: '2021-06-07' })
					const projectsRoot = await client.fetch(`*[_id == "navigation"]{"artistSlug":artistSubpath.current}[0].artistSlug`)

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
		},
		{
			title: 'Artist Ring Patterns',
			name: 'artistRings',
			description: 'All rings must be on the same size canvas. 2160x2160px',
			type: 'object',
			fields: [
				{ title: 'Centre Ring', type: 'image', name: 'centerRing', validation: Rule => Rule.required() },
				{ title: 'Inner Ring-1', type: 'image', name: 'innerRingOne', validation: Rule => Rule.required() },
				{ title: 'Inner Ring-2', type: 'image', name: 'innerRingTwo', validation: Rule => Rule.required() },
				{ title: 'Outer Ring-1', type: 'image', name: 'outerRingOne', validation: Rule => Rule.required() },
				{ title: 'Outer Ring-2', type: 'image', name: 'outerRingTwo', validation: Rule => Rule.required() },
			],
			options: {
				collapsible: true,
				collapsed: true
			},
			validation: Rule => Rule.required()
		},
		{
			title: 'Artist Code',
			name: 'artistCode',
			description: 'Used for integrating with projection.',
			type: 'number',
			validation: Rule => Rule.required().integer().positive().max(9).custom(async(artistID, context) => {

				const id = context.document._id.replace(/^drafts\./, '')
				console.log(id)
				const params = {
					draft: `drafts.${id}`,
					published: id,
					artistID
				}

				const query = `!defined(*[_type == 'artist'
          && artistCode == $artistID
          && !(_id in [$draft, $published])][0]._id)`

				const client = sanityClient.withConfig({ apiVersion: '2021-06-07' })
				let test = await client.fetch(query, params);
				console.log(test)
				return test ? test : "Must use a unique artist code.";
			})
		}
	],
	preview: {
		select: {
			name: 'artistName',
			artistCover: 'artistCover',
		},
		prepare(value) {
			return {
				title: value.name,
				media: value.artistCover,
				subtitle: `A fantastic Nightlights contributor!`
			}
		}
	}
}
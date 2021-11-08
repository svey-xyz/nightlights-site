const sanityFetch = require("../../lib/utils/sanity/sanityFetch");
const groq = require('groq')

module.exports = async () => {
	const query = groq`{
		"artists":*[_type == "artist"]{
			"artistSlug":slug.current,
			...,
		}
	}`

	const data = await sanityFetch('artists', query)
	
	return data;
}
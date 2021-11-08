const sanityFetch = require("../../lib/utils/sanity/sanityFetch");
const groq = require('groq')

module.exports = async () => {
	const query = groq`{
		"siteSettings":*[_id == "siteSettings"]{...}[0],
		"about":*[_id == "about"] {
			...
		}[0],
		"navigation":*[_id == "navigation"] {
			"artistSubpath":artistSubpath.current,
		}[0]
	}`

	const data = sanityFetch('siteSettings', query)

	return data;
}
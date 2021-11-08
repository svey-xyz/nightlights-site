const Image = require("@11ty/eleventy-img");
const imageUrl = require('@sanity/image-url');

const client = require('../utils/sanity/sanityClient');

module.exports = async (src, cls, alt, sizes, widths, dataAttr = []) => {
	const builder = imageUrl(client)
	let url = builder.image(src).url();

	let options = {
		widths: widths,
		formats: ["svg", "webp", "jpeg"],
		outputDir: "./www/assets/img/",
		urlPath: "/assets/img/",
		// svgShortCircuit: true,
		filenameFormat: function (id, src, width, format) { // and options
			return `${id}-${width}.${format}`;
		},
		cacheOptions: {
			duration: "4w",
			directory: "./cache/img",
			removeUrlQueryParams: false,
		},
		sharpWebpOptions: {
			quality: 95,
			alphaQuality: 100,
			smartSubsample: false,
			reductionEffort: 1
		}
	}

	let metadata = await Image(url, options);

	let imageAttributes = Object.assign({
			class: cls,
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		},
		...dataAttr
	);

	let html = Image.generateHTML(metadata, imageAttributes);

	// You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
	return html;
};
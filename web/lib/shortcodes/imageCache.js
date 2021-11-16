const Image = require("@11ty/eleventy-img");
const imageUrl = require('@sanity/image-url');

const client = require('../utils/sanity/sanityClient');

module.exports = async (src, imgClasses, alt, sizes, widths, dataAttr = '', picClasses = '') => {
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

	let lowestSrc = metadata["webp"][0];

	const srcset = Object.keys(metadata).reduce(
		(acc, format) => ({
			...acc,
			[format]: metadata[format].reduce(
				(_acc, curr) => `${_acc} ${curr.srcset} ,`,
				""
			),
		}),
		{}
	);

	const source = `<source type="image/webp" srcset="${srcset["webp"]}" >`;

	const img = `<img
		class="${imgClasses}"
		alt="${alt}"
		src="${lowestSrc.url}"
		sizes='${sizes}'
		data-src="${srcset["webp"]}"
		width="${lowestSrc.width}"
		height="${lowestSrc.height}" 
		>
	`;

	return `<picture class="${picClasses}" ${dataAttr}> ${source} ${img} </picture>`;

};
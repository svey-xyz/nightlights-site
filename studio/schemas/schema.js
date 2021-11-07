// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Documents
import siteSettings from './documents/settings/siteSettings'
import navigation from './documents/settings/navigation'
import page from './documents/site-pages/page'
import artist from './documents/artists'

// Objects
import _blocks from './objects/_blocks'
import socialSite from './objects/utilities/items/socialSite'
import navPage from "./objects/utilities/navigation/internalPage";
import link from './objects/utilities/items/link.js'


// Degraded need to be removed
import altImage from './objects/utilities/items/altImage.js'


const documents = [siteSettings, navigation, page, artist]
const objects = [_blocks, socialSite, altImage, link, navPage]


// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
	types: schemaTypes.concat([...documents, ...objects]),
})

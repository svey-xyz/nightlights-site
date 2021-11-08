import embed from './blocks/embed';
import textSection from './blocks/textSection';
import artistCards from './blocks/artistCards'
import sponsors from './blocks/sponsors'
import simpleHero from './blocks/simpleHero'
import linkButton from './blocks/linkButton'
import video from './blocks/video'


export default {
	title: 'Blocks',
	name: '_blocks',
	type: 'array',
	of: [simpleHero, textSection, video, artistCards, linkButton, sponsors, embed],
}
import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default ({ isDev }) => {
	if (!isDev){
		Vue.use(VueGtag, {
			config: { id: 'G-XGNBVJEK2R' }
		});
	} else {
		console.log("Skipping GA in development")
	}
}
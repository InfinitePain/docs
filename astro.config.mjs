import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.pixelstack.live',
	integrations: [
		starlight({
			title: 'IP\'s Docs',
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 2 },
			editLink: {
				baseUrl: 'https://github.com/InfinitePain/docs/edit/main/',
			},
			social: {
				github: 'https://github.com/InfinitePain',
			},
			sidebar: [{
				label: 'Guides',
				autogenerate: {directory: 'guides'},
				collapsed: true,
				},{
				label: 'About',
				link: 'about'
			},],
			customCss: [
				'@fontsource-variable/inter-tight',
				'@fontsource-variable/roboto-mono',
				'./src/styles/kbd.css',
			],
			components: {
				PageTitle: './src/components/PageTitle.astro',
				LastUpdated: './src/components/LastUpdated.astro',
				Sidebar: './src/components/Sidebar.astro',
			},
			lastUpdated: true,
			pagination: false,
		}),
		react(),
	],
	vite: {
		resolve: {
			alias: {
				'@astrojs/starlight': '/node_modules/@astrojs/starlight',
			},
		},
	},
});

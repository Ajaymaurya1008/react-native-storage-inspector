// https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'React Native Storage Inspector',
  tagline: "Browse, search, and edit all your app's persisted data",
  favicon: 'img/logo.svg',

  url: 'https://ajaymaurya1008.github.io',
  baseUrl: '/react-native-storage-inspector/',

  organizationName: 'Ajaymaurya1008',
  projectName: 'react-native-storage-inspector',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/Ajaymaurya1008/react-native-storage-inspector/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Storage Inspector',
      logo: {
        alt: 'React Native Storage Inspector',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/docs/introduction', label: 'Docs', position: 'left' },
        { to: '/docs/demo', label: 'Demo', position: 'left' },
        {
          href: 'https://github.com/Ajaymaurya1008/react-native-storage-inspector',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/react-native-storage-inspector',
          label: 'npm',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Introduction', to: '/docs/introduction' },
            { label: 'Installation', to: '/docs/installation' },
            { label: 'Usage', to: '/docs/usage' },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Ajaymaurya1008/react-native-storage-inspector',
            },
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/react-native-storage-inspector',
            },
          ],
        },
        {
          title: 'Legal',
          items: [{ label: 'MIT License', to: '/docs/license' }],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} react-native-storage-inspector. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

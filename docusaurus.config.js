// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Omar Alobaid',
  tagline: 'Mechatronic Systems Engineering student, HSRW',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Change when the site is deployed (e.g. GitHub Pages).
  url: 'https://omaroped.github.io',
  baseUrl: '/',
  organizationName: 'omaroped',
  projectName: 'omaroped.github.io',

  onBrokenLinks: 'throw',
  // Section ids on the home page are plain ids, which the anchor checker can't see.
  onBrokenAnchors: 'ignore',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Omar Alobaid',
        items: [
          {href: '/#thesis', label: 'Thesis', position: 'left'},
          {href: '/#experience', label: 'Experience', position: 'left'},
          {href: '/#skills', label: 'Skills', position: 'left'},
          {href: '/#contact', label: 'Contact', position: 'left'},
          {
            href: 'https://github.com/omaroped',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `© ${new Date().getFullYear()} Omar Alobaid · Kleve, Germany`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'dooboolab',
  tagline: `기술로 세상을 이롭게 합니다.`,
  url: 'https://dooboolab.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'icon/dooboolab_favicon.png',
  organizationName: 'dooboolab',
  projectName: 'dooboolab.com',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      navbar: {
        logo: {
          alt: 'dooboolab logo',
          src: 'icon/dooboolab_logo.png',
          srcDark: 'icon/dooboolab_logo_dark.png',
        },
        items: [
          {
            to: 'docs/about-us/introduction',
            position: 'right',
            label: 'About Us',
          },
          {
            to: 'docs/works/projects/dooboo',
            label: 'Works',
            position: 'right',
          },
          {
            to: 'docs/careers/job-description',
            label: 'Careers',
            position: 'right',
          },
          {href: 'https://blog.dooboo.io', label: 'Blog', position: 'right'},
          {
            href: 'https://github.com/dooboolab-community',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

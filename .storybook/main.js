const path = require('path');

module.exports = {
  // Automatically import all files ending in *.stories.js, *.story.js, and *.storybook.js
  stories: ['../**/*.stor@(y(?:book)?|ies).@(js|mdx)'],
  core: { builder: "storybook-builder-vite" },
  addons: [
    '@storybook/preset-scss',
    '@storybook/addon-essentials',
    // use postcss 8
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
};

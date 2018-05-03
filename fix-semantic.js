// https://www.artembutusov.com/webpack-semantic-ui/

const fs = require('fs');

// relocate default config
fs.writeFileSync(
  'node_modules/semantic-ui-less/theme.config',
  "@import '../../src/client/common/styles/semantic-ui/theme.config';\n",
  'utf8'
);

// fix well known bug with default distribution
fixFontPath('node_modules/semantic-ui-less/themes/default/globals/site.variables');
fixFontPath('node_modules/semantic-ui-less/themes/flat/globals/site.variables');
fixFontPath('node_modules/semantic-ui-less/themes/material/globals/site.variables');

function fixFontPath(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const newContent = content.replace(
    "@fontPath  : '../../themes/",
    "@fontPath  : 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/themes/"
  );
  fs.writeFileSync(filename, newContent, 'utf8');
}

const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const appStoreStartStr = '{/* APP STORE SECTION */}';
const andSoMuchMoreStr = '{/* AND SO MUCH MORE SECTION */}';

const appStoreStartIdx = code.indexOf(appStoreStartStr);
const soMuchMoreIdx = code.indexOf(andSoMuchMoreStr);

const appStoreBlock = code.substring(appStoreStartIdx, soMuchMoreIdx);

// Remove the app store block from its original place
code = code.substring(0, appStoreStartIdx) + code.substring(soMuchMoreIdx);

// Insert the app store block at the very end before the last closing tags
const endingTags = '    </div>\n  );\n}';
code = code.replace(endingTags, '\n      ' + appStoreBlock + endingTags);

fs.writeFileSync('src/app/page.tsx', code, 'utf8');
console.log('Moved section successfully.');

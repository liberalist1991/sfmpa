const pagesMap = require('../../config').server.page;

let jsEntryRules = {},
    pageUrlRules = [],
    vmDataRules = {};

for (let page in pagesMap) {

    if (pagesMap.hasOwnProperty(page)) {
        let pageItem = pagesMap[page];

        jsEntryRules[page] = [`./src/page/${page}/index.js`];

        pageUrlRules.push({
            from: new RegExp(pageItem.url),
            to: `./dist/vm/${page}.html `
        });

        if (!!pageItem.data) {
            vmDataRules[page] = pageItem.data
        }
    }
}

module.exports = {
    pagesMap: pagesMap,
    jsEntryRules: jsEntryRules,
    pageUrlRules: pageUrlRules,
    vmDataRules: vmDataRules
};

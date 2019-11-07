const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const beautify = require('js-beautify').js_beautify;
const mutilPage = require('./mutil-page')
const cfgs = require('../../config');

function resolve(dir) {
    return path.join(process.cwd(), dir)
}

module.exports = (app) => {
    Object.keys(mutilPage.vmDataRules).map(rule => {
        fetch(mutilPage.vmDataRules[rule], {
            headers: {
            }
        }).then(res => res.json()).then(body => {
            fs.writeFileSync(
                resolve(`mock/vm/${rule}.js`),
                    beautify(`module.exports=${JSON.stringify(body)}`)
            );
        });
    });

    let listTpl = ['<h3>page</h3>'];
    Object.keys(mutilPage.pagesMap).map(page => {
        let pageItem = mutilPage.pagesMap[page];
        listTpl.push(
            `<p style="text-indent:20px"><a href="/${pageItem.url}" >${page}</a>${pageItem.data ? ` <a href = "${pageItem.data}" target="_blank" > 直出数据 </a>` : ''}</p >`);
    })

    const dist = resolve('dist');
    if (!fs.existsSync(dist)) {
        fs.mkdirSync(dist);
    }
    fs.writeFileSync(`${dist}/list.html`, listTpl.join(' '), 'utf8')
}

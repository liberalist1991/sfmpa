const fs = require('fs-extended')
const path = require('path')
require('shelljs/global')

module.exports = function (filename) {
  if (fs.existsSync(filename)) {
      console.log(`${filename}已存在 !`)
      return
  }
  fs.copyDirSync(path.resolve(__dirname, '../example'), filename);

  exec(`cd ${filename} && npm install`);

  console.log(
    `init template ok! cd ${filename} && npm run dev`
  );
}

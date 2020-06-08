#! usr/bin/env node

const download = require('download-git-repo');

module.exports = (target) => {
  target = path.join(target || '.', 'download-temp');

  return new Promise((resolve, reject) => {
    download('https://github.com/yizhixiaoyao0/base-module-vue.git#master',
    target, {clone: true}, err => {
      if(err) {
        reject(err)
      } else {
        resolve(target)
      }
    }
    )
  })
}
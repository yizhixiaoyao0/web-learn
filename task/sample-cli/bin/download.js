#!/usr/bin/env node

const download = require('download-git-repo');
const path = require('path');
const ora = require('ora')

module.exports = (target) => {
  target = path.join(target || '.', '.download-temp');

  return new Promise((resolve, reject) => {
    const url = 'direct:https://github.com/yizhixiaoyao0/base-module-vue.git#master';
    const spinner = ora(`正在下载项目模板，源地址：${url}`)
    spinner.start();
    download(url,
    target, {clone: true}, err => {
      if(err) {
        spinner.fail();
        reject(err)
      } else {
        spinner.succeed() 
        resolve(target)
      }
    }
    )
  })
}
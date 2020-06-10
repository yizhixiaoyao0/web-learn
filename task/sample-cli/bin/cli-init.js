#!/usr/bin/env node

const download = require('./download');
const inquirer = require('inquirer');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const program = require('commander');

program.usage('<project-name>').parse(process.argv);

let projectName = program.args[0];

if (!projectName) {  // project-name 必填
  // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
  program.help();
  return
}

const list = glob.sync('*');  /// 遍历目录

// 获取当前根目录
let rootName = undefined;

// 判断当前项目是否已经存在
if (list.length) {
  if (list.filter(file => {
    // 获取文件绝对路径
    const fileName = path.resolve(process.cwd(), path.join('.', file));
    const isDir = fs.statSync(fileName, (err) => { throw new Error('filename error') }).isDirectory();

    // 当前目录内文件不为空时， 判断是否存在
    return file === projectName && isDir

  }).length !== 0) {

    console.log(`Project ${projectName} already exists`)
    return
  }
  rootName = Promise.resolve(projectName);
} else if (rootName === projectName) {
  rootName = inquirer.prompt([
    {
      name: 'buildInCurrent',
      message: '当前目录为空，且目录名称和项目名称相同，是否直接在当前目录下创建新项目？',
      type: 'confirm',
      default: true
    }
  ]).then(answer => {
    return Promise.resolve(answer.buildInCurrent ? '.' : projectName)
  })
} else {
  rootName = Promise.resolve(projectName);
}

init();

function init() {
  rootName.then(projectRoot => {
    if (projectRoot !== '.') {
      fs.mkdirSync(projectRoot)
    }
    return download(projectRoot).then(target => {
      return {
        projectRoot,
        downloadTemp: target,
        name: projectRoot,
      }
    })
  }).then(context => {
    return inquirer.prompt([
      {
        name: 'projectName',
        message: '项目的名称',
        default: context.name
      }, {
        name: 'projectVersion',
        message: '项目的版本号',
        default: '1.0.0'
      }, {
        name: 'projectDescription',
        message: '项目的简介',
        default: `A project named ${context.name}`
      }
    ]).then(answers => {
      return {
        ...context,
        metadata: {
          ...answers
        }
      }
    })
  }).then((context) => {
    const desDir = path.join(process.cwd(), context.projectRoot);
    const temlDir = path.join(process.cwd(), context.downloadTemp);

    const task = [];

    copyFile(temlDir, desDir, context);

    delDir(temlDir);
  })
}

function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}

function copyFile(temlDir, desDir, context) {
    
  if (fs.existsSync(temlDir)) {
    if (!fs.existsSync(desDir)) {
      fs.mkdirSync(desDir);
    }

    // 将模板下的文件全部转换到目标目录
    let files = fs.readdirSync(temlDir, { withFileTypes: true });
    if (!files) throw new Error('err');

    files.forEach(file => {
      const teml = path.join(temlDir, file.name);
      const des = path.join(desDir, file.name);
      if (file.isFile()) {
        // 通过模板引擎去渲染文件
        ejs.renderFile(teml, context.metadata, (err, result) => {
          if (err) throw err;

          // 将结果写入目标
          fs.writeFileSync(des, result);
        })
      } else {
        try {
          // 判断读(R_OK | W_OK)写权限
          fs.accessSync(path.join(des, '..'), fs.constants.W_OK)
          copyFile(teml, des, context)
        } catch (error) {
          console.log('folder write error:', error);
        }
      }
    })
    
  } else {
    console.log(temlDir, desDir)
  }
}


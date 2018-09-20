let co = require('co');
let prompt = require('co-prompt');
let chalk = require('chalk');
let download = require('download-git-repo');
let ora = require('ora');
let fs  = require('fs');
let templates = require("../templates");
let copydir = require('copy-dir');

let nameToPathMap = {};

let rmdirSync = (function () {
  function iterator(url, dirs) {
    var stat = fs.statSync(url);
    if(stat.isDirectory()){
      dirs.unshift(url); // 收集目录
      inner(url,dirs);
    }
    else if(stat.isFile()) {
      fs.unlinkSync(url); // 直接删除文件
    }
  }
  function inner(path, dirs) {
    var arr = fs.readdirSync(path);
    for(var i = 0, el ; el = arr[i++];){
      iterator(path + "/" + el, dirs);
    }
  }
  return function(dir, cb) {
    cb = cb || function () {};
    var dirs = [];

    try{
      iterator(dir,dirs);
      for(var i = 0, el; el = dirs[i++];) {
        fs.rmdirSync(el); // 一次性删除所有收集到的目录
      }
      cb();
    }
    catch(e) { // 如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
      e.code === "ENOENT" ? cb() : cb(e);
    }
  }
})();

module.exports = function(name) {
  getTemps(templates);
  co(generator(name));
}

function getTemps(templates) {
  for(let key in templates.list) {
    let item = templates.list[ key ];
    nameToPathMap[item.name] = item.path;
  };
}

let generator = function *(tempName) {
  let path = nameToPathMap[ tempName ];
  if(!tempName) {
    // 如果没有传 name
    console.log('    可用模板列表:')
    for(let key in nameToPathMap) {
      console.log(
        '     ' 
        + chalk.green(key) 
        + ' : ' 
        + chalk.green(nameToPathMap[ key ])
      );
    };
    tempName = yield prompt("    请选择模板名称:");
    path = nameToPathMap[ tempName ];
  }

  if(path) {
    downloadTemplates(path, tempName);
  } 
  else {
    console.log(chalk.red(`   ✘模版[ ${tempName} ]不存在`));
    process.exit(0);
  }
}

function downloadTemplates(path, name) {
  let spanner = ora("   正在构建，客官請稍等......");
  spanner.start();
  // 刪除原文件
  if(fs.existsSync(__dirname + '/download')) {
    rmdirSync(__dirname + '/download');
    process.exit(0);
  }     
  download(path, __dirname + '/download', function(err) {     
    if(err) {
      spanner.stop();
      console.log('    ', '----------------------------------------');
      console.log('    ', chalk('x构建失败'), err);
      process.exit(0);
    }
    startBuildProject(spanner, name);
  });
}

function startBuildProject(spanner, name) {
  let targetPath = process.cwd() + "/" + name;
  copydir.sync(__dirname + '/download', targetPath);
  console.log('    ', '----------------------------------------');
  console.log('    ', chalk.green('★'), chalk.green('项目构建成功'));
  rmdirSync(__dirname + '/download');
  spanner.stop();
  process.exit(0);
}
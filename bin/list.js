let co = require('co');
let prompt = require('co-prompt');
let chalk = require('chalk');
let templates = require("../templates.js");

module.exports = function() {
  for(let key in templates.list) {
    let item = templates.list[ key ];
    console.log(
      '  ' + chalk.green('★') +
      '  ' + chalk.green(item.name) +
      ' -' + item.desc
    );
  };
  if(!templates.list || templates.list.length == 0) {
    console.log(chalk.yellow('当前无可用模板'));
  }
}
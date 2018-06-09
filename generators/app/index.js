'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const yosay = require('yosay');
const yoHelper = require('yeoman-generator-helper');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the top-notch ${chalk.red('generator-fei-github')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'project_name',
        message: 'Your project name?',
        default: path.basename(process.cwd())
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your description?'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      yoHelper.rewriteProps(this.props);
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath('{**,.*}'), this.destinationPath('.'), this.props);
  }

  install() {
    this.log('Well DONE!');
    // This.installDependencies();
  }
};

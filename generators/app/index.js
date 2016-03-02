'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('generator-zjdd-shop-module') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'project_name',
      message: 'Your project name?',
      default: path.basename(process.cwd())
    }, {
      type: 'input',
      name: 'description',
      message: 'Your description?'
    }, {
      type: 'input',
      name: 'homepage',
      message: 'Your homepage?',
      default:'https://github.com/afeiship'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },
  writing: function () {
    this._writingEditorConfig();
    this._writingGitIgnore();
    this._writingLicense();
    this._writingGulp();
    this._writingPackageJson();
  },
  _writingEditorConfig: function () {
    this.fs.copy(
      this.templatePath('_editorconfig'),
      this.destinationPath('.editorconfig')
    );
  },

  _writingGitIgnore: function () {
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
  },
  _writingLicense: function () {
    this.fs.copy(
      this.templatePath('LICENSE.txt'),
      this.destinationPath('LICENSE.txt')
    );
  },
  _writingGulp: function () {
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
  },
  _writingPackageJson: function () {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
  }
});

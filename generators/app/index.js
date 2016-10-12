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
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },
  writing: function () {
    this._writingGulpDir();
    this._writingNpmrc();
    this._writingEditorConfig();
    this._writingGitIgnore();
    this._writingLicense();
    this._writingGulp();
    this._writingPackageJson();
    this._writingReadme();
    this._writingBowerJson();
  },
  _writingGulpDir:function() {
    this.fs.copy(
      this.templatePath('./gulp'),
      this.destinationPath('./gulp')
    );
  },
  _writingNpmrc:function() {
    this.fs.copy(
      this.templatePath('.npmrc'),
      this.destinationPath('.npmrc')
    );
  },
  _writingEditorConfig: function () {
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );
  },
  _writingGitIgnore: function () {
    this.fs.copy(
      this.templatePath('.gitignore'),
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
  },
  _writingReadme:function(){
    this.fs.copyTpl(
      this.templatePath('README.MD'),
      this.destinationPath('README.MD'),
      this.props
    );
  },
  _writingBowerJson:function(){
    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      this.props
    );
  }
});

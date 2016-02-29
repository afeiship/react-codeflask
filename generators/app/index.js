'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
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
    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    );
  }
});

(function () {

  var global = global || this;

  var nx = global.nx || require('next-js-core2');
  var <%= ShortProjectName %> = nx.declare('nx.<%= ShortProjectName %>', {

  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = <%= ShortProjectName %>;
  }

}());

(function () {

  var global = global || window || self || this;

  var nx = global.nx || require('next-js-core2');
  var Nx<%= ShortProjectName %> = nx.declare('nx.<%= ShortProjectName %>', {

  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Nx<%= ShortProjectName %>;
  }

}());

(function () {

  global = global || this;

  var nx = global.nx || require('next-js-core2');
  var <%= ProjectName %> = nx.declare('nx.<%= ProjectName %>', {

  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = <%= ProjectName %>;
  }

}());

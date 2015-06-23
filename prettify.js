var PrettyStream = require('bunyan-prettystream');

module.exports = function makePretty(stream) {
  var prettyStream = new PrettyStream();

  prettyStream.pipe(stream);

  return prettyStream;
};

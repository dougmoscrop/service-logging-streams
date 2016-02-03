var fs = require('fs'),
  fluentStream = require('effluent-logger'),
  bunyanTcpStream = require('bunyan-logstash-tcp'),
  prettify = require('./prettify');

function fileStream(fileName) {
  var stream = fs.createWriteStream(fileName);

  return {
    type: 'raw',
    level: 'debug',
    stream: prettify(stream)
  };
}

function getStream(opts) {
  if (process.env.NODE_ENV === 'test') {
    return fileStream(opts.fileName);
  }

  if (process.env.NODE_ENV === 'production') {
    return {
      level: 'info',
      stream: process.stdout
    };
  }

  if (opts.fluentd) {
    return {
      type: 'raw',
      stream: new fluentStream(opts.fluentd)
    };
  } else if (opts.logstash) {
    return {
      type: 'raw',
      stream: bunyanTcpStream.createStream(opts.logstash)
    };
  } else {
    return {
      level: 'info',
      stream: prettify(process.stdout)
    };
  }
}

module.exports = function(opts) {
  opts = opts || {};
  opts.fileName = opts.fileName || 'test.log';

  return [].concat(getStream(opts));
};

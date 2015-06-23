var fs = require('fs'),
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

function consoleStream() {
  if (process.env.NODE_ENV !== 'production') {
    return {
      type: 'raw',
      level: 'error',
      stream: prettify(process.stdout)
    };
  } else {
    return {
      level: 'info',
      stream: process.stdout
    };
  }
}

module.exports = function(opts) {
  opts = opts || {};
  opts.fileName = opts.fileName || 'test.log';

  var streams = [];

  if (opts.logstash) {
    streams.push({
      type: 'raw',
      stream: bunyanTcpStream.createStream(opts.logstash)
    });
  }

  streams.push(process.env.NODE_ENV === 'test' ? fileStream(opts.fileName) : consoleStream());

  return streams;
};

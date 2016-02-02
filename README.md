Some default streams for use with `service-logging`

Usage:

```javascript
    var logging = require('service-logging'),
		streams = require('service-logging-streams');

	logging({

		/* ... */

		streams: streams({
			fileName: 'my_service.log' // defaults to 'test.log',
			logstash: { // if not specified no logstash stream will be created
				host: 'blah.com',
				port: 1234
			},
			fluentd: { // if not specified no fluentd stream will be created
				tag: 'development',
				type: 'forward',
				host: 'localhost',
				port: 24224
			}
		}).concat(/* you could add other streams here */)

		/* ... */

	});
```

Creates a local stream and (optionally) a logstash and/or fluentd stream.

Local stream properties:

Environent    | Level | Pretty
------------- | ----- | -------
*Test*        | Debug | Yes
*Development* | Error | Yes
*Production*  | Info  | No

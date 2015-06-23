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
			}
		}).concat(/* you could add other streams here */)
		
		/* ... */
		
	});
```

Creates a local stream and (optionally) a logstash stream.

Local stream properties:

Environent    | Level | Pretty
------------- | ----- | -------
*Test*        | Debug | Yes
*Development* | Error | Yes
*Production*  | Info  | No
# Kenny Loggins

## Overview

Kenny Loggins is a logging framework based on the [log4js](https://github.com/stritti/log4js) framework.
It consists of the logging framework itself, plus various appenders (each appender is a seperate project). 
The framework simply forwards logging events to the appropriate appender based on name and logging level, 
and the appender handles it from there. 

There are appenders for printing the event to the console, writing the event to a file, etc.

There is no requirement for clients to configure any appenders. If no appropriate appenders are found by the 
Kenny Loggins framework, it simply drops the event. This permits a project (project A) to include another project
that supports Kenny Loggins (project B), without requiring project A to have any knowledge of Kenny Loggins. 
***


## Installation
```
NPM package coming soon
```

## Exposed API Objects
```
export {
    KennyLoggins,   // see "Kenny Loggins API"
    Level,          // see "Level API"
    BaseAppender    // see "Base Appender API
}
```

## Kenny Loggins API
Primary logging instance that holds, fetches and creates loggers based on configurations.

### configure
- **This should be earlier in application load. No loggers will be available until after configure is ran**
- Logger configuration order matters, as priority is top to bottom.
- Only the first matching appender will be applied. 
    - Names can use wildcards ('service.*')
    - Appender patterns are regex patterns.
- Level dictates the minimum log threshold for the appender to output a message.
- **globals** are attributes that get applied to every appender message.

```javascript
import { KennyLoggins, Level } from 'kenny-loggins'

KennyLoggins
    .configure({
        loggers:[
            { // Will match first
                name: 'common.services.orders',             // Required
                level: Level.INFO,                          // Optional
                appenders: [consoleAppender, ajaxAppender], // Optional
            },
            { // Will match second,
                name: '^common',
                appenders: [new consoleAppender()],
                level: Level.INFO
            }
        ],
        formatters: [ // see "Formatters"
            { name: 'res', format: (res) => {
                return {
                    statusCode: res.statusCode,
                    header: res.header
                }
            }}
        ],
        globals: {
            someGlobalAttribute: 'some global value'
        }
    }
);
```

### getLogger
Returns a new or already created instance of a logger. See "Logger API" for information on logger instances.
```
import { KennyLoggins, Level } from 'kenny-loggins'
const logger = KennyLoggins.getLogger('common_web.serviceClients.menuClient')
```


### Logger API
Loggers are implementations of logger configurations. They are used in the application to send data to their configured
appenders. All messages are cloned to prevent mutation of the original object.

Log message types
```javascript
logger.info('message')
logger.info('message', new Error('Error Message'))
logger.info({})
```

Log level types
```javascript
logger.fatal('Fatal Data');
logger.error('Error Data');
logger.warn('Warn Data');
logger.info('Info Data');
logger.debug('Debug Data');
logger.trace('Trace Data');
```

## Logging Event
```json
{
    "name": "", // logger name ()
    "dateLogged": "Wed Mar 15 2017 13:42:40 GMT-0400 (EDT)", // new Date();
    "message": "" // string
    "exception": {
        
    }
}
```

## Base Appender API
*Only for extension by appenders*

Appenders are responsible for delivering LogEvents to their destination. Every Appender must implement a 
~~doAppend(loggingEvent)~~ ```append(loggingEvent)``` method.

```javascript
export default class AjaxAppender extends BaseAppender {
    constructor(config) { // Configuration object
        super(config) // Always pass config to BaseAppender
    }
    
    append(loggingEvents) {
        // Log array of events
    }
    
    @deprecated
    append(loggingEvent) {
        // Do logging stuff here
    }
}
```

### Appender Queueing
All appenders inherit queueing by default. Appenders can be configured to queue messages for bulk messaging by 
default. Once it meets either size or interval threshold it will flush the queue passing the array of events on to the 
appender.

```javascript
const someAppender = new SomeAppender({
    // # of events before flushing the queue
    // default: 1
    // min: 1
    queueSize: 1,
    // milliseconds to wait before flushing queue.
    // default: 60000ms (1 minute)
    // min: 1000ms (1 second)
    // 0 = disabled
    queueInterval: 60000,
    // type of queue storage to use
    // default: non-persistent (only basic array, no storage)
    // 'persistent-session': uses browser session storage if available (fallback to non-persistant)
    queueType: 'persistent-session'
})
```

### Level API
Levels are used during configuration to determine which log messages are enabled. 
```
Level.OFF       // Number.MAX_VALUE,
Level.FATAL:    // 50000,
Level.ERROR     // 40000,
Level.WARN      // 30000,
Level.INFO      // 20000,
Level.DEBUG     // 10000,
Level.TRACE     // 5000,
Level.ALL       // Number.MIN_VALUE,
```

## Formatters
Formatters are functions that take a single logging event field value as a parameter and return a new value to replace the 
original event field value.

Example:

The following will look for a field in every logging event object called ```res``` and run 
in through ```responseFormatter```
```javascript
const responseFormatter = (res) => {
    return {
        statusCode: res.statusCode,
        header: res.header
    }
}

KennyLoggins.configure({
    // ...logger conigurations
    formatters: [
        { name: 'res', format: responseFormatter }
    ]
})
```

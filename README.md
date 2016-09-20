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


## Appenders
Appenders are responsible for delivering LogEvents to their destination. Every Appender must implement a 
doAppend(loggingEvent) method. Appenders should extend BaseAppender.

Appenders usually are only responsible for writing the event data to the target destination. Some appenders 
wrap other appenders so that they can modify the LogEvent, etc.

Appenders always have a name so that they can be referenced from Loggers.

## Installation
Kenny Loggins is installed via NPM, and resides in the Nexus repository. 
So you must first configure npm so it points to the correct Nexus server, then install it to your project via
npm.

    ### Confiuring Nexus
Point NPM to nexus server using the following console commands
```bash
$ npm config set strict-ssl false
$ npm config set registry https://nexus/repository/npm-all/=true
```

    ### Project Installation
Install in project
```sh
$ npm i -S wendys-kenny-loggins
```

## Usage
To use Kenny Loggins in your project, you need to

- configure 1 or more appenders
- get a logger instance
- pass the event/data/info you wish to be logged to the logger

### Configuration

- Appender configuration order matters, as priority is top to bottom.
- Only the first matching appender will be applied. 
    - Names can use wildcards ('common.service.*')
    - Appender patterns are regex patterns.
- Level dictates the minimum log threshold for the appender to output a message.
- **globals** are attributes that get applied to every appender message.

```javascript
require('wendys-kenny-loggins')
    .KennyLoggins
    .configure({
        appenders:
            [{ // Will match first
                name: 'common.services.orders',
                appenders: [consoleAppender, ajaxAppender],
                level: require('wendys-kenny-loggins').Level.INFO
            },
            { // Will match second,
                pattern: '^common',
                appenders: [new consoleAppender()],
                level: require('wendys-kenny-loggins').Level.INFO
            }],
        globals: {
            someGlobalAttribute: 'some global value'
        }
    }
);
```

### Getting a Logger Instance

Get's a new instance of a logger, or returns an existing logger using a regex string as a key.
```javascript
var logger = require('wendys-kenny-loggins')
                .KennyLoggins
                .getLogger('web.common.services.careers');
```

### Using the Logger

KennyLoggins supports 4 logging levels. Each appender is assigned both a name 
and a logging level. This enables the use of different logs for different levels. 

Each log level listed here also will include logging statements for those levels listed above it. 
So an appender set up for INFO will also receive logging events for WARN, ERROR and FATAL. The lower 
on the list, the more verbose the output

- OFF
- FATAL
- ERROR
- WARN
- INFO
- DEBUG
- TRACE
- ALL


#### info
```javascript
logger.info('Info Data');
```
#### debug
```javascript
logger.debug('Debug Data');
```
#### warn
```javascript
logger.warn('Warn Data');
```
#### error
```javascript
logger.error('Error Data');
```

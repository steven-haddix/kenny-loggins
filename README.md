# Kenny Loggins

### Confiuring Nexus
Point NPM to nexus server using the following console commands
```bash
$ npm config set strict-ssl false
$ npm config set registry https://nexus/repository/npm-all/
```

### Project Installation
Install in project
```sh
$ npm i -S wendys-kenny-loggins
```
---

## KennyLoggins
KennyLoggins is a singleton. Once configured, **getLogger** will return the matching logger anywhere in the project. If no logger is matches a default unconfigured logger will be returned. It will not output anything.

### configuration
- Appender configuration order matters as priority is top to bottom.
- Only the first matching appender will be applied.
- Appender patterns are regex patters.
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

### getLogger
Gets a new instance of a logger or returns an existing logger using a regex string as a key.
```javascript
var logger = require('wendys-kenny-loggins')
                .KennyLoggins
                .getLogger('web.common.services.careers');
```
## Logger
### info
```javascript
logger.info('Info Data');
```
### debug
```javascript
logger.debug('Debug Data');
```
### warn
```javascript
logger.warn('Warn Data');
```
### error
```javascript
logger.error('Error Data');
```
---
## AjaxAppender
```javascript
var ajaxAppender = new (require('wendys-kenny-loggins').AjaxAppender)({
    url: 'http://localhost:8080/log'
})
```
## ConsoleAppender
```javascript
var ajaxAppender = new (require('wendys-kenny-loggins').ConsoleAppender)()
```
---
## Level
Enum for log levels
```javascript
require('wendys-kenny-loggins').Level.INFO
```

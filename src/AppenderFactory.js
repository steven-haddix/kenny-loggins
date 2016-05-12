import Ajax from './appenders/ajax';
import ConsoleAppender from './appenders/Console';
import { findFirstElementByName } from './helpers/find';

const Appenders = [Ajax, ConsoleAppender];

export const appenderTypes = {
    Ajax: 0,
    Console: 1
};

export function create(appender, config) {
    return new Appenders[appender](config);
}

function getAppenderType(appender) {
    switch (appender.toLowerCase()) {
        case 'ajax':
            return appenderTypes.Ajax;
        case 'console':
            return appenderTypes.Console;
        default:
            return appenderTypes.Console;
    }
}

export function createAppenders(appenders, configs) {
    return appenders.map(
        (appender) => {
            const appenderType = getAppenderType(appender);
            const config = findFirstElementByName(appender, configs);
            return create(appenderType, config);
        }
    );
}



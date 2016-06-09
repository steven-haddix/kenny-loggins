import KL from './KennyLoggins';
import { Level } from './level';
import AjaxAppender from './appenders/ajax';
import ConsoleAppender from './appenders/console';

const KennyLoggins = new KL();

export {
    KennyLoggins,
    Level,
    AjaxAppender,
    ConsoleAppender
};

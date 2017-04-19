/*
 * Taken from [node-bunyan](https://github.com/trentm/node-bunyan/blob/master/lib/bunyan.js#L1127)
 */
function getFullErrorStack(ex) {
    var ret = ex.stack || ex.toString();
    if (ex.cause && typeof (ex.cause) === 'function') {
        var cex = ex.cause();
        if (cex) {
            ret += '\nCaused by: ' + getFullErrorStack(cex);
        }
    }
    return (ret);
}

export function formatError(err) {
    if (!err || !err.stack) {
        return err;
    }
    return {
        message: err.message,
        name: err.name,
        stack: getFullErrorStack(err),
        code: err.code,
        signal: err.signal
    }
}
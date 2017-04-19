export function getArgs(spy, count = 0, arg = 0) {
    const calls = spy.getCalls()
    if(calls && calls[count] && calls[count].args[arg]) {
        return calls[count].args[arg]
    }
    return {}
}
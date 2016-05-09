/**
 * Level Enumeration.
 */
export const Level = {
	OFF: Number.MAX_VALUE,
	FATAL: 50000,
	ERROR: 40000,
	WARN: 30000,
	INFO: 20000,
	DEBUG: 10000,
	TRACE: 5000,
	ALL: Number.MIN_VALUE,
	toString(value) {
		switch (value) {
			case Number.MAX_VALUE:
				return 'OFF';
			case 50000:
				return 'FATAL';
			case 40000:
				return 'ERROR';
			case 30000:
				return 'WARN';
			case 20000:
				return 'INFO';
			case 10000:
				return 'DEBUG';
			case 5000:
				return 'TRACE';
			case Number.MIN_VALUE:
				return 'ALL';
			default:
				return 'OFF';
		}
	},
	toLevel(string) {
		switch (string) {
			case 'OFF':
				return this.OFF;
			case 'FATAL':
				return this.FATAL;
			case 'ERROR':
				return this.ERROR;
			case 'WARN':
				return this.WARN;
			case 'INFO':
				return this.INFO;
			case 'DEBUG':
				return this.DEBUG;
			case 'TRACE':
				return this.TRACE;
			case 'ALL':
				return this.ALL;
			default:
				return this.OFF;
		}
	}
};

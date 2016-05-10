export const defaults = {
    ajax: {
        interval: 30000,
        threshold: 1,
        url: 'http://localhost:3000/api/log',
        layout: ''
    },
    console: {
        threshold: 1,
        layout: ''
    },
    browser: {
        threshold: 1,
        layout: ''
    },
    getDefaultConfig(appenderType) {
        switch (appenderType) {
            case 'ajax':
                return this.ajax;
            case 'console':
                return this.console;
            case 'browser':
                return this.browser;
            default:
                return {};
        }
    }
};

export function configure(context, defaultConfig, newConfig) {
    Object.assign(context, defaultConfig, newConfig);
}

/**
 * Created by shadd01 on 4/19/16.
 */

export const defaults = {
    ajax: {
        interval: 30000,
        threshold: 1,
        url: 'http://localhost:3000/api/log',
        layout: 'simple'
    },
    console: {
        threshold: 1,
        layout: 'simple'
    },
    browser: {
        threshold: 1,
        layout: 'simple'
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

export function injectConfig(context, defaultConfig, newConfig) {
    Object.assign(context, defaultConfig, newConfig);
}

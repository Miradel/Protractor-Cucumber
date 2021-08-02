protractor = require('./conf.js');
let config = protractor.config;

config.capabilities = {
    'browserName':'chrome',
    'directConnect':true,
    chromeOptions: {
        'useAutomationExtension': false,
        'args': [
            'show-fps-counter=true',
            'allow-file-access-from-files'
        ],
        'binary': ''
    },
    metadata: {
        browser: {
            name: 'chrome',
            version: '92.0.4545.107'
        },
        device: 'MacBook Pro',
        platform: {
            name: 'osx',
            version: '11.5.1'
        }
    }
}

exports.config = config;
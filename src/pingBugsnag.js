const Bugsnag = require('@bugsnag/js')

Bugsnag.start({ apiKey: 'c4148797254e9c008b6b458fb078c0c6', appVersion: '1.10.0' });

Bugsnag.notify(new Error('Test error'));

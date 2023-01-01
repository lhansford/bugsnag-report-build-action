const Bugsnag = require('@bugsnag/js')

Bugsnag.start({ apiKey: process.env.BUGSNAG_API_KEY, appVersion: '1.10.0' });

Bugsnag.notify(new Error('Test error'));

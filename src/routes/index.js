const site = require('./site.route');
const auth = require('./apis/auth.route');
const routes = (app) => {
    app.use('/', site);
    app.use('/api/v1/auth', auth);
}

module.exports = routes;
const site = require('./site.route');
const auth = require('./apis/auth.route');
const user = require('./apis/user.route');
const routes = (app) => {
    app.use('/', site);
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/users', user);
}

module.exports = routes;
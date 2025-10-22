const getEnforcer = require( "../casbin_rule/casbin_rule");

module.exports = async function middleware(req, res, next) {
    const enforcer = await getEnforcer();
    const user = req.headers['x-role'] || 'guest';
    const path = req.path;
    const method = req.method;

    const ok = await enforcer.enforce(user, path, method);
    console.log(ok);
    if (ok) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
}
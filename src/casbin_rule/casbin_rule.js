const path = require('path');
const { newEnforcer } = require('casbin');

async function getEnforcer(){
    const modelPath = path.join(__dirname, 'model.conf');
    const policyPath = path.join(__dirname, 'policy.csv');
    const enforcer = await newEnforcer(modelPath, policyPath);
    return enforcer;
}

module.exports = getEnforcer;
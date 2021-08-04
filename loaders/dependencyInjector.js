const { Container } = require('typedi');
const formData = require('form-data');
const LoggerInstance = require('./logger');
module.exports = ({models,services}) => {
    try {
        Container.set('logger',LoggerInstance);
        models.forEach(m=>{
            Container.set(m.name,m.model);
        })
        services.forEach(s=>{
            Container.set(s.name, s.service)
        })
    } catch (e) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
}




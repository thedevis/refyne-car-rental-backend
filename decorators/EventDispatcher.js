const eventDispatch = require('event-dispatch');
const { Container } = require('typedi');
function EventDispatcher (){
    return (object, propertyName, index)=>{
        const eventDispatcher = new eventDispatch.EventDispatcher();
        Container.registerHandler({object, propertyName,index,value:()=>eventDispatch})
    }
}
module.exports={
    EventDispatcher,
    EventDispatcherInterface:eventDispatch.EventDispatcher
}
trigger CaseTrigger on Case (after update) {

    Message_Event__e ev = new Message_Event__e();
    ev.Description__c='Message from Platform Event';
    EventBus.publish(ev); 

	Message_Event__e ev1 = new Message_Event__e();
    ev1.Description__c='Message from Platform Event1';
    EventBus.publish(ev1); 
}
trigger AccountTrigger on Account (after insert) {
    
    //Delete related action plans
    if ( trigger.isafter && trigger.isinsert){
        ContactTriggerHandler.afterinserttriggerhandler(trigger.newMap);
    }
}
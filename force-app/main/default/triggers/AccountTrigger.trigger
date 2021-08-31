trigger AccountTrigger on Account (after insert) {
    
    //Delete related action plans
    if ( trigger.isafter && trigger.isinsert){
        ContactTriggerHandler.afterinserttriggerhandler(trigger.newMap);
    }

    if ( (trigger.isbefore && trigger.isinsert) ||(trigger.isbefore && trigger.isinsert)){

        for(account acc:trigger.new){
            if(acc.Match_Billing_Address__c){
                acc.ShippingPostalCode=acc.BillingPostalCode;
            }
        }

    }
}
trigger AccountAddressTrigger on Account (before insert,before update) {
    
    if ( (trigger.isbefore && trigger.isinsert) ||(trigger.isbefore && trigger.isinsert)){

        for(account acc:trigger.new){
            if(acc.Match_Billing_Address__c){
                acc.ShippingPostalCode=acc.BillingPostalCode;
            }
        }

    }
}
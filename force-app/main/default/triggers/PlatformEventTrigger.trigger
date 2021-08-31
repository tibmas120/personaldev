trigger PlatformEventTrigger on Message_Event__e (after insert) {

    for(Message_Event__e Ev:Trigger.new){

        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setToAddresses(new list<string>{'bubusambit@gmail.com'});
        email.setSubject('Sample Platform Event Mail');
        email.setHtmlBody(Ev.Description__c);
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
    }

}
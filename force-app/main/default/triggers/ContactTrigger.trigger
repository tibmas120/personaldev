trigger ContactTrigger on Contact (after insert,after update) {

    List<id> accoundIDSet=new List<id>();
    for(contact c:trigger.new)
        accoundIDSet.add(c.accountid);
    /*Map<id,account> accountMap=new Map<id,account>([Select id,Contactid__c from account where id IN:accoundIDSet]);
    
    for(contact c:trigger.new){
        if(accountMap.containskey(c.accountid)){
            accountMap.get(c.accountid).Contactid__c=c.id;
        }
        
    }
    update accountMap.values();*/
    AccountProcessor.countContacts(accoundIDSet);

}
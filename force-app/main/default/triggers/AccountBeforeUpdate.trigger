trigger AccountBeforeUpdate on Account (before update) {

     if(trigger.isbefore && trigger.isupdate){
         map<id,account> mapnew = trigger.newmap;
         map<id,account> mapold = trigger.oldmap;
         list<Account> newAccList=new list<Account>();
         set<id> accId=new set<id>();
         list<SOC__c> socList=new list<SOC__c>();
         for(Account acc:trigger.new){
             if(mapold.get(acc.id).Account_Type__c=='Non-Subordiate' && mapnew.get(acc.id).Account_Type__c=='Subordinate' && mapnew.get(acc.id).Parent==null)
             {
                 newAccList.add(acc);
                 accId.add(acc.id);
             }
             }
             
         socList=[Select id from SOC__c where Account__c=: accid ];
         
         if(socList.size()>0){
             for(Account acc:newAccList)
                 acc.adderror('Error Msg');
         
         }
     }

}
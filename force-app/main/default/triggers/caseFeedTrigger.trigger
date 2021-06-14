trigger caseFeedTrigger on FeedItem (after insert) {
    set<id> caseID=new set<id>();
    List<Case> updateCase= new List<Case>();
    for (FeedItem fi : Trigger.new) {
        if (fi.ParentId.getSObjectType() == Case.SObjectType) {
           caseID.add(fi.ParentId);
        }
    }
    for(case c:[Select id,Last_Activity_Date__c from case where id IN:caseID]){
        c.Last_Activity_Date__c =date.today();
        updateCase.add(c);
    }
    update updateCase;
}